---
# ── Basics ──────────────────────────────────────────────
title: ""                 # Project name as shown on the card and page
slug: ""                  # URL part, lowercase-with-dashes, e.g. "mealmind"
summary: ""               # One sentence for the project card and search results (aim for under 160 characters)
hook: ""                  # The opening line of the story: a tension, a question, or a moment. Shown big at the top of the page
order: 1                  # Position on the Work grid (1 = first)
featured: true            # Show on the Work grid (the landing page)? Set false to hide a project without deleting it
status: draft             # draft | published

# ── Context ─────────────────────────────────────────────
type: ""                  # e.g. Class project, Client work, Personal project, Internship
client: ""                # Organization or "Self-initiated"
year: 2026
duration: ""              # e.g. "10 weeks"
role: ""                  # Your title on the project, e.g. "UX/UI designer"
team: []                  # e.g. ["2 designers", "1 developer"]; leave empty if solo
disciplines: []           # e.g. ["UX research", "UI design", "Brand identity", "Web development"]
tools: []                 # e.g. ["Figma", "Illustrator", "HTML/CSS"]
methods: []               # Optional: research and testing methods, e.g. ["Card sorting", "A/B testing"]
deliverables: []          # Optional: what you handed over, e.g. ["Style guide", "Hi-fi designs"]
course: ""                # Optional: course name, for class projects

# ── Images (files go in /images/<slug>/) ────────────────
cover:
  src: ""                 # e.g. "/images/mealmind/cover.jpg"
  alt: ""                 # Describe what the image shows, for screen readers
thumbnail:
  src: ""                 # Card image on the Work grid (can match cover)
  alt: ""

# ── Links (optional) ────────────────────────────────────
links:
  live: ""                # Live site
  prototype: ""           # Figma prototype
  other: ""               # Repo, PDF, video, etc.

# ── SEO ────────────────────────────────────────────────
seo:
  title: ""               # Defaults to title if left empty
  description: ""         # Defaults to summary if left empty
---

<!--
HOW THIS READS: each case study is told as a story in six chapters.
Each chapter has a short eyebrow label (the fixed part before the colon, shown small in mono)
and a headline you write for this project (shown big in serif).
Headlines should say what happened, not name the section: "Nobody plans dinner on Sunday" beats "Research".
Keep each chapter short: 1–3 short paragraphs, plus an image or pull quote where it helps the story move.
-->

## 01 Setting the scene: <headline>
<!-- Who is this for and what is their world like? Where do we meet them? Introduce the project, the client or class, and your role in a sentence or two, so readers know who's telling the story. -->

## 02 The problem: <headline>
<!-- What's going wrong, and why does it matter? Make the reader feel the friction. A real quote, stat, or moment works well here. -->

> Optional pull quote from a user, client, or research finding.

## 03 Digging in: <headline>
<!-- How you learned more: research, interviews, audits, competitive review. End on the insight you found. -->

## 04 The turning point: <headline>
<!-- The key insight or reframe that changed the direction. One clear idea. This is the heart of the story. -->

## 05 Making it real: <headline>
<!-- How the idea became a design. Walk through 2–4 decisions as small beats: what you chose, what you tried instead, and why. Show the work with images (sketches → wireframes → final). -->

### <decision 1>
### <decision 2>

## 06 The ending: <headline>
<!-- What came out of it: the final design, results, feedback, what changed for the people involved. Then step back: what you learned and what you would do next. -->

<!-- Images in the body:
![Alt text describing the image](/images/<slug>/filename.jpg "Optional caption")
-->
