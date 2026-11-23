# Partner Logo Rotator Specification

**Status:** Implemented  
**Reference:** [GSAP Logo Rotator](https://gsap-logo-rotator.webflow.io/)

## Goal

Update the “Trusted by our Partners” section to use a continuously animated partner-logo table inspired by the reference, while preserving the current section layout and content.

## Layout

- Keep the partner logos on the left and the existing heading and description on the right on desktop.
- Use a fixed, bordered **3-column × 2-row** logo table with six visible cells.
- Give each cell a consistent size and keep the outer border and internal dividers stationary during animation.
- On narrow screens, retain the 3×2 table and scale the cell contents to fit; keep the existing stacked section layout.
- Do not change the heading or description copy.

## Logo Assets

Use the nine local SVGs already added under `assets/`, preserving their original colors:

- `National-Volunteer.svg`
- `PartnerShip.svg`
- `Vps-Partner-1 .svg`
- `Vps-Partner-2 .svg`
- `Vps-Partner-DSWD.svg`
- `Vps-Partner-association.svg`
- `Vps-Partner-gaming.svg`
- `Vps-Partner-global.svg`
- `Vps-Partner3 .svg`

Do not fetch logo images from the reference site or another remote source.

Use `BQC-Element 1.svg` as a decorative watermark on the right side, behind the section copy. Set its opacity to `0.40` on desktop and narrow screens, keep it out of the logo cells, and ensure text remains readable.

## Animation

- Keep the table fixed while each of the six cells rotates its own logo independently.
- Animate every logo upward: the outgoing logo exits upward while its replacement enters from below.
- Start the six transitions in a coordinated cascade with a 0.12-second stagger between cells. Transitions overlap; if the next unique logo is not yet available, continue the cascade as soon as the previous transition releases one.
- Use a 0.75-second `power2.inOut` transition, pause 2.4 seconds after the full cascade, then repeat.
- Keep the table borders stationary; animate only the logos within their cells.
- Do not move an entire row or column as one track.
- Use the GSAP already loaded by the page; do not add another animation dependency.
- The rotation is automatic and does not add controls or require user interaction.
- On the section’s first scroll into view, fade and lift the title, then its description; reveal the entire logo table as one unit afterward. Do not stagger the six cells for this entrance effect.
- Keep the entrance reveal separate from the logo rotation and skip it for reduced-motion preferences.

## Logo Ordering

Randomize the nine logos once per page load. Show six distinct logos initially and keep the other three in a shared queue. When a cell rotates, it receives the next queued logo and returns its outgoing logo to the end of the queue. This cycles all nine through the six independent cells without duplicates in the visible table.

## Accessibility and Motion Preferences

- Provide descriptive alternative text for partner logos where their organization is identifiable.
- Respect `prefers-reduced-motion`: do not animate the cells, and show a static set of six logos.
- Keep the section readable and usable without animation.

## Acceptance Criteria

- The desktop section retains its current left-logos/right-copy layout.
- The logo area has six visible cells arranged as a bordered 3×2 table.
- All nine local SVGs are used, retain their colors, and cycle through the visible cells.
- Each cell rotates independently; changing one logo does not move the other cells.
- All logo motion is upward, with the six cell transitions following one another in a short coordinated cascade.
- The table and its dividers remain stationary during the animation.
- The animation loops without a visible jump and does not show the same logo twice at once.
- On narrow screens, the 3×2 layout remains legible and does not overflow horizontally.
- Reduced-motion preferences result in a static logo table.

