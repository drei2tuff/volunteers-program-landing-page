# WELCOME-RESPONSIVE001: Refactor Welcome Section Responsively

## Summary

Refactor the “Bayanihan starts with you” welcome section so its copy, calls to action, decorative graphics, and photo carousel scale cleanly from narrow mobile screens to ultrawide desktops.

## Changes

- Replace the welcome section’s fixed minimum heights with content-driven sizing and fluid section padding.
- Use a centered max-width content container, a fluid two-column desktop grid, and a single-column layout on narrower screens.
- Remove the wide-screen fixed grid gap, fixed copy width, and translated gallery that could push content outside its grid area.
- Apply fluid typography and spacing to the heading, description, buttons, and carousel gap.
- Bound decorative glows within the section and keep them behind the interactive content.
- Match the welcome carousel cards’ responsive sizing to the Why Volunteer slider: one-third slides on wide screens, 44% slides up to 1000px, and 78% slides on mobile, with matching image aspect ratios across breakpoints.
- Keep the existing welcome content, images, carousel controls, accessibility attributes, and interactions.

## Validation

- `git diff --check` passes.
- No automated tests or browser viewport checks were run.

## Reviewer Notes

- Review the section at 320px, 375px, 480px, 768px, 1024px, 1280px, 1440px, 1920px, and 2560px widths.
- Confirm the copy and CTAs precede the gallery on narrow screens and that buttons wrap without horizontal overflow.
- Check the carousel card proportions and slide widths against the Why Volunteer section at mobile, tablet, desktop, and short-height desktop sizes.
- Verify decorative glows remain behind content and that carousel keyboard, drag, controls, focus indicators, and reduced-motion behavior remain usable.
