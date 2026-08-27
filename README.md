# Mahmoud Sharkawy — Portfolio

A recruiter-focused React portfolio with a dark editorial visual system and mouse-reactive interactions.

## What changed

- Mouse-following spotlight that reacts across the entire page.
- Custom desktop cursor + trailing ring.
- Magnetic CTA interactions.
- 3D tilt cards that follow the pointer.
- Scroll progress indicator.
- Animated hero grid, orbital glow and ambient motion.
- Typewriter hero copy.
- IntersectionObserver reveal animations.
- Responsive mobile navigation.
- Recruiter-focused hierarchy: identity → stack → experience → education → contact.
- Accessible links/buttons and touch-device fallbacks.
- No new runtime dependencies.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

> The supplied archive contained an incomplete `node_modules` install, so `node_modules` is intentionally excluded from this edited source archive. Run `npm install` before building locally.

## Main files

- `src/App.tsx` — portfolio UI and interactions
- `src/index.css` — visual system, responsive layout and animations
