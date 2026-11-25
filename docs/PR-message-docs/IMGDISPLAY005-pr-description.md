# IMGDISPLAY005: Add Responsive Volunteer Carousels

## Summary

Replace the “Bayanihan starts with you” photo stack with a responsive three-card carousel and enlarge the “Why Volunteer?” image cards. Refine the partner section styling and document the responsive behavior.

## Changes

- Replace the welcome photo stack with a carousel using the three existing local volunteer photos.
- Add looping previous/next controls, keyboard navigation, pointer dragging, and accessible slide announcements.
- Enlarge the carousel cards and adapt their proportions at wide desktop, intermediate, tablet, and mobile widths.
- Keep the welcome copy width fixed at 460px on wide screens and apply a `90vw`-based carousel offset.
- Enlarge the “Community in action” cards and adjust the “Why Volunteer?” layout to use a fixed wide-screen copy width and responsive breakpoints.
- Set the “Trusted by our Partners” background to a 105-degree gradient that reaches white at 10%, and set its heading color to `#0058cc`.
- Make the partner watermark opacity respond to viewport height (`1`, `.85`, `.70`, `.55`, down to `.40`) and hide it on mobile.
- Add the `IMGDISPLAY005` specification with layout, accessibility, motion, and responsive acceptance criteria.

## Validation

- No automated tests were run.
- `git diff --cached --check` and `git diff --check` were reviewed for whitespace errors.

## Reviewer Notes

- Review both volunteer carousels at wide desktop, intermediate, tablet, and mobile widths.
- Confirm keyboard, drag, arrow controls, live announcements, and reduced-motion behavior for the welcome carousel.
- Check the partner watermark opacity at short desktop viewport heights and confirm it is hidden on mobile.
