# LOGROT003: Add Partner Logo Rotator

## Summary

Refresh the “Trusted by our Partners” section with a GSAP-inspired logo rotator while preserving its 3×2 table layout and partner content.

## Changes

- Place the six-cell logo table on the left and the section title and description on the right.
- Rotate logos independently within each cell, moving upward in a coordinated cascade while keeping the table borders stationary.
- Cycle through the nine local partner SVGs without duplicate logos appearing in the visible cells.
- Add the `BQC-Element 1.svg` watermark behind the copy at `0.40` opacity on desktop and narrow screens.
- Reveal the title, description, and table as the section scrolls into view.
- Respect reduced-motion preferences by showing a static table.
- Document the rotator behavior and acceptance criteria in the partner logo rotator spec.

## Validation

- `npm run build`
- `node --check app.js`
- `git diff --check`
- Browser checks for the section layout, mobile sizing, scroll reveal, and reduced-motion behavior.

