# Anupesh Verma: portfolio

Personal portfolio site. One page, fast, no tracking, no third-party requests.

**Stack:** React 19, TypeScript, Vite, plain CSS with design tokens. The only runtime
dependencies are `react` and `react-dom`. Fonts are self-hosted.

## Run it

Requires Node 20.19 or newer (Node 22 recommended).

```bash
npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # optional TypeScript check
```

## Before you publish

1. **Resume:** the resume buttons open a Google Drive link, set as `resumeUrl` in
   `src/content.ts`. Share the file as "Anyone with the link" (Viewer). To update the
   resume later without changing the link, use Manage versions in Drive and upload a new version.
2. **Photo:** replace `src/assets/images/avatar.png` with a square photo
   (400 x 400 px or larger). The current one was cropped from a screenshot and is soft.

## Update the content

Everything the site says lives in **`src/content.ts`**: headline, pipeline stages,
experience, projects, skills, education, contact details. Edit the values there and
the page updates. No component changes are needed for content edits.

- Add a job or role: add an entry to `experience`.
- Add a project: add an entry to `otherProjects` (image goes in `src/assets/images/`).
- Add a skill: add it to the right group in `skills`.
- Change a pipeline stage: edit `stages` (the diagram in the hero).
- Change the DineFlow data flow: edit `featuredProject.flow` (its stages, the Snowflake
  bracket, and the Airflow task bars).

## Change the look

- Colours, fonts, sizes, spacing: `src/styles/tokens.css` (light and dark values).
- Page-wide defaults and buttons: `src/styles/base.css`.
- Each section has its own stylesheet next to its component in `src/components/`.

## Create a new site from this repo

Option A, from Git (recommended):
1. Push this folder to a GitHub repository.
2. In Netlify, open your existing site, go to Site configuration, Build and deploy,
   and link the repository.
3. Build command `npm run build`, publish directory `dist`. `netlify.toml` already sets both.

Option B, manual: run `npm run build`, then drag the `dist` folder onto the Deploys
page of your existing Netlify site.

If your site URL ever changes, update it in `index.html` (canonical and `og:` tags),
`public/robots.txt` and `public/sitemap.xml`.

## Structure

```
index.html              page shell, SEO and link-preview tags, theme bootstrap
public/                 files copied as-is (favicon, og-image, robots, sitemap)
src/
  content.ts            all text and data
  App.tsx, main.tsx     app shell and entry point
  components/           one component + stylesheet per section;
                        FlowDiagram is shared by the hero and the DineFlow project
  hooks/                theme and active-section logic
  styles/               design tokens and base styles
  assets/               self-hosted fonts and images
```

## Credits

Poppins (SIL Open Font License) and DejaVu Sans Mono (Bitstream Vera licence),
both subset and self-hosted.
