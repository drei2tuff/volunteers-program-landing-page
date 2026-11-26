# DEPTLOGOS006: Add Participating City Departments Logo Showcase

## Summary

Replace the horizontal scroll-snap carousel in the "Participating City Departments" section with a stationary, responsive logo showcase where all six department logo slots are always visible and all seven department logos rotate through them one slot at a time using a clean fade-out/fade-in transition.

## Changes

- Remove the `.department-row` carousel wrapper and `.department-arrow` prev/next buttons from `index.html`.
- Replace six placeholder images with six stationary `.department-slot` containers holding `.department-logo` images, each with descriptive `alt` text naming the department.
- Replace horizontal scroll-snap CSS with a responsive CSS Grid: 2×3 on mobile, 3×2 on tablet, and 6×1 on desktop.
- Add `opacity` fade-out (500ms) → `src`/`alt` swap → fade-in (500ms) transition per slot, matching the reference autoplay behavior at `autoplay-logo-from-cms.webflow.io`.
- Cycle all seven department logos (`Quezon City Public Library`, `Barangay and Community Relations Department`, `Department of Sanitation and Cleanup Works of Quezon City`, `Quezon City Fire District`, `Quezon City Sports Development Office`, `Quezon City Tourism Department`, `Social Services Development Department / SSDD`) through six visible slots one at a time with no duplicates.
- Apply a 1.2s stagger between slot swaps and a 2s pause after the sixth slot before cycling back.
- Scope the desktop hover effect (`transform: scale(1.08); transition: 0.3s ease`) to `@media (hover: hover) and (pointer: fine)` so neighboring logos are unaffected.
- Skip rotation and keep all six logos static when `prefers-reduced-motion: reduce` is active.
- Remove the `.department-arrow` click-to-scroll event listener from `app.js`.
- Add a lightweight JS queue controller that preloads all seven logo assets and drives the one-at-a-time fade swap.
- Update slot heights to `90px` / `100px` / `110px` across mobile, tablet, and desktop breakpoints.

## Validation

- `node --check app.js`
- `git diff --check`
- Browser checks for visible logo grid at 320px, tablet, laptop, and large desktop widths.
- Confirm logos retain original colors, aspect ratios, and transparent backgrounds with no cards, borders, or shadows.
- Confirm one-at-a-time fade swap cycles through all seven logos without duplicates.
- Confirm hover scales only the hovered logo with no neighboring layout shift.
- Confirm `prefers-reduced-motion: reduce` shows a fully static six-logo grid.
