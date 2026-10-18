# Mahmoud Sharkawy · Portfolio

Personal portfolio: selected projects (with live sites and source), about, skills, experience and contact.

Built with React 19, TypeScript and Vite. Plain CSS, no UI libraries, no runtime dependencies beyond React.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Editing content

- `src/data.ts`: projects, skills, experience and contact details.
- `public/work/`: project screenshots (1440×900 captures of each live site).
- CV: all content lives in `cv/cv-data.json` (layout in `cv/build-cv.mjs`, single-column and ATS-friendly). `npm run cv` rebuilds `cv/Mahmoud-Sharkawy-CV.docx` and `public/Mahmoud-Sharkawy-CV.pdf` (uses local Chrome to print the PDF). `CV_URL` in `src/data.ts` controls the CV buttons.
