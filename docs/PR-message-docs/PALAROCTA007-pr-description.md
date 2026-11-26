# PALAROCTA007: Add Palarong Pambansa 2027 CTA Button

## Summary

Add a responsive "Volunteer for Palarong Pambansa 2027 Now!" call-to-action button exclusively on the first hero carousel slide (`assets/palaro-banner.png`), linking to a branded placeholder `coming-soon.html` page using relative paths for both local and GitHub Pages subpath compatibility.

## Changes

- Add `.palaro-cta` anchor inside slide 1 of `.hero-carousel` in `index.html`, opening `coming-soon.html` in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Leverage the existing `.hero-carousel__slide` visibility and `inert` state so the CTA appears only on the Palarong Pambansa 2027 banner and hides automatically on slides 2 and 3.
- Style `.palaro-cta` in `styles.css` with Palaro red (`#c8102e`), white text, pill border-radius (`999px`), desktop-only hover lift/brightness (`@media (hover: hover) and (pointer: fine)`), and a high-contrast `focus-visible` outline.
- Use percentage-based positioning (`left: 11.5%`, `top: 75%` on desktop, `top: 66%` at `<= 900px`, `top: 58%` at `<= 700px`) and `vw`-scaled `clamp()` font-size and padding so the button scales proportionally from 320px mobile viewports through large desktop monitors without clipping or overlapping carousel controls.
- Create `coming-soon.html` with a branded "Registration Opening Soon" message for Palarong Pambansa 2027 Volunteers and a "← Back to Bayanihang QC" button linking back to `./` (compatible with GitHub Pages subpaths).
- Document the feature requirements and acceptance criteria in `docs/PALAROCTA007-palaro-cta-button-spec.md`.

## Validation

- `node --check app.js`
- `git diff --check`
- Verified `.palaro-cta` visibility on slide 1 and automatic hiding on slides 2 and 3.
- Verified responsive scaling and placement on mobile (`393px`), tablet, and desktop viewports without horizontal overflow or overlap with carousel controls.
- Verified relative `coming-soon.html` and `./` links work both locally and under GitHub Pages subpaths.
