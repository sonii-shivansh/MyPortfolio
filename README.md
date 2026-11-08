# Shivansh Soni — Personal Portfolio

A responsive portfolio grounded in the supplied résumé. Built with React, Vinext, TypeScript, Framer Motion, and an interactive Three.js dimensional sculpture.

## Develop

The Sites workspace uses the checked-in pnpm lockfile. Install with the project’s dependency helper or `pnpm install --frozen-lockfile`, then run `pnpm dev`. Use Node 22.13 or later.

## Verify and build

- `pnpm exec tsc --noEmit`
- `pnpm build`

Sites builds and packages through its checked-in integration. Site identity is in `.openai/hosting.json`; preserve it when editing this project.

## Content

- `app/page.tsx`: résumé content, work studies, career timeline, skills, navigation, and contact interactions.
- `app/globals.css`: visual system and responsive layout.
- `app/fonts.css`: self-hosted font declarations.
- `app/layout.tsx`: metadata and social preview.
- `public/shivansh-soni-resume.pdf`: original downloadable résumé.
- `public/references/`: the two user-provided reference screenshots, shown in the optional “Behind the build” section.

Professional claims and dates come from the supplied résumé. Work illustrations are conceptual, explicitly labeled, and do not display production data. The résumé download retains the original contact details.

## Interaction and accessibility

The Three.js sculpture supports a reflective knot, orbital rings, and a rotating 4D tesseract projected into 3D, with pointer movement, drag rotation, and pause. It draws at a capped frame rate, pauses when offscreen or the document is hidden, and respects reduced-motion preferences. WebGL content is decorative and hidden from assistive technology.

Navigation, work tabs, skill tabs, expandable contribution notes, and career accordions use semantic controls. Tabs support arrow-key navigation, links have visible focus, and a skip link reaches the main content. MotionConfig and CSS respect system reduced-motion settings. Contact uses an email link and a clipboard action with success/failure feedback; no form submission backend is implied.

## References and licensing

Original composition and custom implementation. Design research included Motion, Dots UI, Watermelon UI, Manus, UI/UX Pro Max, Impeccable, and the supplied video/transcript. No paid component code was copied. Space Grotesk and DM Sans are self-hosted; their OFL licenses are under `public/fonts/licenses`.

## Spatial edition

The latest design adds `app/SpatialScene.tsx` and `app/spatial.css`. Three.js is dynamically loaded in the browser. Geometry, lighting, and reflection environments are generated locally. No HDRI server or third-party model downloads are required. WebGL failure displays a CSS fallback. The 4D study rotates the tesseract in XW and YZ planes, projects with `2.8 / (3.6 - w)`, and connects vertex pairs that differ in exactly one coordinate.

Validation: TypeScript and the production build are required. Browser visual QA for this edition was blocked by the available browser environment and must be reviewed on the published URL.

## Vercel deployment

Production: https://shivansh-soni.vercel.app

`vercel.json` selects the native Next.js build (`pnpm exec next build`) on Vercel. The existing `build` script remains available for the Sites/Vinext deployment. Install with the committed pnpm lockfile; the Vercel project uses Node 22. GitHub login access must be configured in Vercel to deploy repository commits.
