# Design direction

A spatial editorial portfolio: charcoal, warm white, vermilion, reflective chrome, generous space, precise rules, and self-hosted Space Grotesk / DM Sans. The hero is a real-time Three.js sculpture, with a knot, orbital rings, and a projected 4D tesseract. A warm light biography section and vermilion contact section vary the visual rhythm.

The visitor journey is identity → work contributions → personal approach → experience → technical skills → credentials → contact. All employment claims use the supplied résumé. Avoid fabricated client names, performance improvements, endorsements, availability claims, and production dashboards.

The motion hierarchy is deliberate: one continuous WebGL sculpture, small animated diagrams within selected work, calm reading sections, and short transitions for controls. System reduced-motion preference removes continuous motion and parallax. There is no scroll interception.

References:
- https://motion.dev/docs/react
- https://motion.dev/docs/react-use-reduced-motion
- https://dotsui.dev/
- https://ui.watermelon.sh/free/animated-react-components
- https://manus.im/
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- https://github.com/pbakaus/impeccable

UI/UX Pro Max’s generated style matches were not suitable as a complete direction for this portfolio, so their palettes/layouts were not applied wholesale. Its accessibility, responsive interaction, and React effect-cleanup guidance informed the implementation. Dots UI informed particle behavior; Watermelon UI informed tab indicators and copy feedback. Motion provides actual animation APIs. Manus and Impeccable informed hierarchy and restraint. The supplied reference screenshots appear in the optional colophon.

Spatial motion: pointer and drag rotation, scroll-linked camera composition, a horizontal typographic bridge, perspective work illustrations, blur-to-sharp heading choreography, and spring-based tabs. Rendering pauses offscreen and when hidden; system reduced motion removes automatic rotation and scroll motion. Pause control stops continuous scene and work-study motion.
