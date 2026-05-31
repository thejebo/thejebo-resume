# Project Guidelines

## Project Shape

- This repo is a small Vite-based personal site with two primary frontend surfaces: the resume and private cover-letter pages.
- Prefer the existing static TypeScript plus SCSS approach over introducing a frontend framework, client-side router, or extra runtime dependencies.
- Keep changes focused and minimal. Do not broaden architecture for a one-page or one-feature change.

## Code Style

- Follow the existing patterns in `src/main.ts`, `src/cover-letter.ts`, and `src/translations.ts`.
- Use TypeScript under `src/`; prefer explicit domain types from `src/types/` over `any` or `unknown`.
- Keep DOM code straightforward: small helpers, typed selectors, and template-string rendering are preferred in this project.
- Reuse existing environment variable names and data shapes before adding new ones.

## Frontend Conventions

- Preserve the current no-framework rendering model: render markup from TypeScript and keep behavior close to the page entrypoint that owns it.
- Treat Finnish and English as a paired feature. When changing user-facing copy, metadata, labels, or accessibility text, update both locales unless the task explicitly says otherwise.
- Keep the default locale as Finnish and preserve the `resume-language` localStorage behavior unless the task is specifically about language handling.
- Maintain accessibility details already present in the app, including `lang`, live-region announcements, skip links, button state, and descriptive text for external links.
- Keep company names, role labels like `Frontend` and `Backend`, and similar proper nouns stable across locales unless source content changes.

## Styling

- Keep styles in SCSS and follow the current split between shared partials and page bundles under `src/styles/`.
- Prefer extending existing variables and partials over adding one-off inline styles or duplicated rules.
- For print work, scope adjustments to print styles only. Avoid fixed print heights that can clip longer content.

## Content And Data

- Resume and cover-letter content is data-driven. Prefer updating translation objects or cover-letter JSON shapes instead of hardcoding text in rendering logic.
- Treat `letters.local/` as local content for drafts. Do not restructure or normalize those files unless the task is specifically about cover-letter tooling or content.

## Build And Validation

- Use `npm run lint` for validation after code changes.
- Use `npm run build` when a change affects rendering, asset output, or TypeScript integration across entrypoints.
- If a task only touches documentation or local draft content, skip broader validation unless the change can affect runtime behavior.