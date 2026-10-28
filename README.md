# portfolio

This is my personal design portfolio, showcasing my work in UX/UI, web design and visual identity. It's built with Next.js and TypeScript.

## Editing the site

You can change almost everything without touching code:

| What | Where |
| --- | --- |
| Sidebar bio, social links, footer note | `content/site.md` |
| About page text, photos, Focus and Toolkit lists | `content/about.md` |
| Each case study | `content/projects/<project>.md` |
| Images | `public/images/<project>/` (About photos go in `public/images/about/`) |
| Colors, fonts, spacing | the tokens at the top of `app/globals.css` |

### Add a social link or resume
Open `content/site.md` and paste the URL between the quotes, for example `url: "https://www.linkedin.com/in/you"`. For the resume, put the PDF in `public/` (for example `public/resume.pdf`) and use `url: "/resume.pdf"`. A link without a URL shows as plain text.

### Add a new project
1. Copy `content/projects/_template.md` to a new file such as `content/projects/new-project.md` and fill it in.
2. Put its images in `public/images/new-project/`.
3. Set `order` to choose its place on the Work grid. Set `featured: false` to hide a project without deleting it.

Any image path that doesn't exist yet shows as a labeled placeholder, so you can write first and add images later.

### Layout notes inside a case study
Small HTML comments control a few layouts. They don't show on the site:

- `<!-- layout: stacked -->` right under a `##` or `###` heading puts the heading above the text instead of beside it.
- `<!-- layout: side-image -->` under a `##` heading puts that chapter's image to the right of the text.
- `<!-- layout: full -->` makes the text after it run the full width.
- `<!-- widget: logo-toggle -->` places the ClanAway light/dark logo switch.

Two images on back-to-back lines share one caption (the title of the last one).

## Running it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Pages update as you save files.

## Publishing

The site deploys on [Vercel](https://vercel.com). Every push to `main` publishes the live site, and every pull request gets its own preview link.
