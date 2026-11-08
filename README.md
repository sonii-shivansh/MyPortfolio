# Shivansh Soni — Personal Portfolio

A responsive portfolio grounded in the supplied résumé. Built with React, Vinext, TypeScript, Framer Motion, and a custom Canvas particle sculpture.

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

The particle sculpture supports three forms, pointer movement, and pause. It draws at a capped frame rate, pauses when offscreen or the document is hidden, and respects reduced-motion preferences. Canvas content is decorative and hidden from assistive technology.

Navigation, work tabs, skill tabs, expandable contribution notes, and career accordions use semantic controls. Tabs support arrow-key navigation, links have visible focus, and a skip link reaches the main content. MotionConfig and CSS respect system reduced-motion settings. Contact uses an email link and a clipboard action with success/failure feedback; no form submission backend is implied.

## References and licensing

Original composition and custom implementation. Design research included Motion, Dots UI, Watermelon UI, Manus, UI/UX Pro Max, Impeccable, and the supplied video/transcript. No paid component code was copied. Space Grotesk and DM Sans are self-hosted; their OFL licenses are under `public/fonts/licenses`.
