// Reads the Markdown files in /content and turns them into data the pages can render.
// You shouldn't need to edit this file to add or change a project: edit the .md files instead.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sizeOf from "image-size";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { toHtml } from "hast-util-to-html";
import type { Element, ElementContent, Root, RootContent } from "hast";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// ── Types ───────────────────────────────────────────────

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  exists: boolean; // false = file not added yet, so a placeholder is shown
};

export type Figure = { images: SiteImage[]; caption?: string };

export type Row =
  | { kind: "split"; chapterHead: boolean; headHtml?: string; bodyHtml: string }
  | { kind: "full"; chapterHead: boolean; headHtml?: string; bodyHtml: string }
  | { kind: "side"; bodyHtml: string; figure?: Figure }
  | { kind: "figure"; figure: Figure }
  | { kind: "widget"; name: string };

export type Chapter = {
  number: string; // "01"
  eyebrow: string; // "Setting the scene"
  title: string; // "Every night, the same question"
  rows: Row[];
};

export type ProjectLink = { label: string; url: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  hook: string;
  order: number;
  featured: boolean;
  card: string;
  label: string; // "PERSONAL PROJECT · 2026"
  facts: { label: string; value: string }[];
  cover: SiteImage;
  thumbnail: SiteImage;
  links: ProjectLink[];
  chapters: Chapter[];
  sourcesHtml?: string;
  logoLight?: SiteImage;
  logoDark?: SiteImage;
  seo: { title: string; description: string };
};

// ── Images ──────────────────────────────────────────────

export function getImage(src: string | undefined, alt = ""): SiteImage {
  const file = src ? path.join(PUBLIC_DIR, src) : "";
  if (src && fs.existsSync(file)) {
    const { width = 1044, height = 600 } = sizeOf(fs.readFileSync(file));
    return { src, alt, width, height, exists: true };
  }
  return { src: src ?? "", alt, width: 1044, height: 600, exists: false };
}

// ── Markdown → rows ─────────────────────────────────────

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype, { allowDangerousHtml: true });

function toHast(markdown: string): Root {
  return processor.runSync(processor.parse(markdown)) as Root;
}

const isWhitespace = (n: RootContent | ElementContent) => n.type === "text" && !n.value.trim();
const isElement = (n: RootContent | ElementContent, tag?: string): n is Element =>
  n.type === "element" && (!tag || n.tagName === tag);

function marker(n: RootContent, name: string): string | undefined {
  if (n.type !== "raw") return undefined;
  const m = n.value.match(new RegExp(`<!--\\s*${name}:\\s*([\\w-]+)\\s*-->`));
  return m?.[1];
}

// Removes HTML comments (notes and TODOs in the .md files) so they never show on the site.
function stripRaw<T extends Element | Root>(node: T): T {
  node.children = node.children.filter((c) => c.type !== "raw") as T["children"];
  node.children.forEach((c) => isElement(c) && stripRaw(c));
  return node;
}

// A paragraph that is only an image (or several) becomes a figure.
function asFigure(n: RootContent): Figure | undefined {
  if (!isElement(n, "p")) return undefined;
  const parts = n.children.filter((c) => !isWhitespace(c) && !isElement(c, "br"));
  if (!parts.length || !parts.every((c) => isElement(c, "img"))) return undefined;
  const imgs = parts as Element[];
  const caption = imgs.map((i) => i.properties.title as string | undefined).filter(Boolean).pop();
  return {
    images: imgs.map((i) => getImage(String(i.properties.src), String(i.properties.alt ?? ""))),
    caption,
  };
}

// A paragraph that is only bold text ("**What I learned**") becomes a small serif subheading.
function asSubhead(n: RootContent): Element | undefined {
  if (!isElement(n, "p")) return undefined;
  const parts = n.children.filter((c) => !isWhitespace(c));
  if (parts.length === 1 && isElement(parts[0], "strong")) {
    return { type: "element", tagName: "h4", properties: { className: ["subhead"] }, children: parts[0].children };
  }
  return undefined;
}

function html(nodes: RootContent[]): string {
  return toHtml(stripRaw({ type: "root", children: nodes }));
}

function buildRows(markdown: string, chapterLayout: string): Row[] {
  const nodes = toHast(markdown).children.filter((n) => !isWhitespace(n));
  const rows: Row[] = [];

  type Open = { kind: "split" | "full"; chapterHead: boolean; head?: Element; body: RootContent[] };
  let open: Open | null = null;
  let side: { body: RootContent[]; figure?: Figure } | null =
    chapterLayout === "side-image" ? { body: [] } : null;
  let lastMode: "split" | "full" = chapterLayout === "stacked" ? "full" : "split";

  if (!side) open = { kind: lastMode, chapterHead: true, body: [] };

  const flush = () => {
    if (side) {
      rows.push({ kind: "side", bodyHtml: html(side.body), figure: side.figure });
      side = null;
    }
    if (open && (open.chapterHead || open.head || open.body.length)) {
      rows.push({
        kind: open.kind,
        chapterHead: open.chapterHead,
        headHtml: open.head ? toHtml(stripRaw(open.head)) : undefined,
        bodyHtml: html(open.body),
      });
    }
    open = null;
  };

  for (const n of nodes) {
    const layout = marker(n, "layout");
    const widget = marker(n, "widget");
    const figure = asFigure(n);

    if (layout) {
      if (open && open.head && !open.body.length) {
        open.kind = layout === "stacked" ? "full" : "split"; // layout for this ### beat
      } else {
        flush();
        lastMode = layout === "full" || layout === "stacked" ? "full" : "split";
        open = { kind: lastMode, chapterHead: false, body: [] };
      }
      if (open) lastMode = open.kind;
    } else if (widget) {
      flush();
      rows.push({ kind: "widget", name: widget });
      open = { kind: lastMode, chapterHead: false, body: [] };
    } else if (isElement(n, "h3")) {
      flush();
      lastMode = "split";
      open = { kind: "split", chapterHead: false, head: n, body: [] };
    } else if (figure) {
      if (side && !side.figure) {
        side.figure = figure;
        continue;
      }
      flush();
      rows.push({ kind: "figure", figure });
      open = { kind: lastMode, chapterHead: false, body: [] };
    } else if (side) {
      side.body.push(n);
    } else {
      open ??= { kind: lastMode, chapterHead: false, body: [] };
      open.body.push(asSubhead(n) ?? n);
    }
  }
  flush();
  return rows;
}

function parseChapters(body: string): { chapters: Chapter[]; sourcesHtml?: string } {
  let sourcesHtml: string | undefined;
  const sourcesMatch = body.match(/\n-{3,}\s*\n+###\s+Sources\s*\n([\s\S]*)$/);
  if (sourcesMatch) {
    sourcesHtml = html(toHast(sourcesMatch[1]).children);
    body = body.slice(0, sourcesMatch.index);
  }

  const chapters: Chapter[] = [];
  const parts = body.split(/^## /m).slice(1);
  for (const part of parts) {
    const newline = part.indexOf("\n");
    const heading = part.slice(0, newline).trim();
    let rest = part.slice(newline + 1);
    const m = heading.match(/^(\d+)\s+([^:]+):\s*(.+)$/);
    let layout = "split";
    const layoutMatch = rest.match(/^\s*<!--\s*layout:\s*([\w-]+)\s*-->/);
    if (layoutMatch) {
      layout = layoutMatch[1];
      rest = rest.slice(layoutMatch[0].length);
    }
    chapters.push({
      number: m ? m[1].padStart(2, "0") : "",
      eyebrow: m ? m[2].trim() : "",
      title: m ? m[3].trim() : heading,
      rows: buildRows(rest, layout),
    });
  }
  return { chapters, sourcesHtml };
}

// ── Projects ────────────────────────────────────────────

function linkLabel(key: string, url: string) {
  if (key === "live") return "View live";
  if (key === "prototype") return "Prototype";
  if (url.includes("github.com")) return "GitHub";
  return "More";
}

function readProject(file: string): Project {
  const { data, content } = matter(fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8"));
  const d = data as any;
  const team: string[] = d.team ?? [];
  const links: ProjectLink[] = Object.entries((d.links ?? {}) as Record<string, string>)
    .filter(([, url]) => url)
    .map(([key, url]) => ({ label: linkLabel(key, url), url }));
  const { chapters, sourcesHtml } = parseChapters(content);

  return {
    slug: d.slug,
    title: d.title,
    summary: d.summary ?? "",
    hook: d.hook ?? "",
    order: d.order ?? 99,
    featured: d.featured !== false,
    card: d.card ?? "",
    label: [d.type, d.course, d.year].filter(Boolean).join(" · "),
    facts: [
      { label: "My role", value: d.role ?? "" },
      { label: "Timeline", value: d.duration ?? "" },
      { label: "Team", value: team.length ? team.join(", ") : "Solo" },
      { label: "Tools", value: (d.tools ?? []).join(", ") },
    ],
    cover: getImage(d.cover?.src, d.cover?.alt),
    thumbnail: getImage(d.thumbnail?.src ?? d.cover?.src, d.thumbnail?.alt ?? d.cover?.alt),
    links,
    chapters,
    sourcesHtml,
    logoLight: d.logo_light ? getImage(d.logo_light.src, d.logo_light.alt) : undefined,
    logoDark: d.logo_dark ? getImage(d.logo_dark.src, d.logo_dark.alt) : undefined,
    seo: {
      title: d.seo?.title || d.title,
      description: d.seo?.description || d.summary || "",
    },
  };
}

let cache: Project[] | undefined;

/** Every project with featured: true, sorted by order. */
export function getProjects(): Project[] {
  cache ??= fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(readProject)
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
  return cache;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** The project after this one on the Work grid (the last one loops back to the first). */
export function getNextProject(slug: string): Project {
  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return all[(i + 1) % all.length];
}

// ── Site settings and About ─────────────────────────────

export type Site = {
  name: string;
  bioLead: string;
  bio: string;
  links: ProjectLink[];
  madeIn: string;
  year: number;
  location: string;
  siteTitle: string;
  siteDescription: string;
};

export function getSite(): Site {
  const d = matter(fs.readFileSync(path.join(CONTENT_DIR, "site.md"), "utf8")).data as any;
  return {
    name: d.name,
    bioLead: d.bio_lead,
    bio: d.bio,
    links: (d.links ?? []).map((l: any) => ({ label: l.label, url: l.url ?? "" })),
    madeIn: d.made_in,
    year: d.year,
    location: d.location,
    siteTitle: d.site_title,
    siteDescription: d.site_description,
  };
}

export type About = {
  label: string;
  statement: string;
  photos: SiteImage[];
  focus: string[];
  toolkit: string[];
  bodyHtml: string;
  seo: { title: string; description: string };
};

export function getAbout(): About {
  const { data, content } = matter(fs.readFileSync(path.join(CONTENT_DIR, "about.md"), "utf8"));
  const d = data as any;
  return {
    label: d.label,
    statement: d.statement,
    photos: (d.photos ?? []).map((p: any) => getImage(p.src || undefined, p.alt ?? "")),
    focus: d.focus ?? [],
    toolkit: d.toolkit ?? [],
    bodyHtml: html(toHast(content).children),
    seo: d.seo ?? { title: "About", description: "" },
  };
}
