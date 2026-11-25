# HEROCAROUSEL001: Add Automatic Hero Image Carousel

## Summary

Replace the static Bayanihang QC hero image with an accessible, automatically advancing carousel using three local banner images.

## Changes

- Add the three hero slides using `assets/7eb43.png`, `assets/7eb44.png`, and `assets/palaro-banner.png`.
- Add looping autoplay with previous/next buttons and slide-position indicators.
- Center the carousel controls along the bottom of the hero.
- Pause autoplay while carousel controls have keyboard focus or when the page is hidden; restart after manual navigation or when the page becomes visible.
- Add a crossfade transition and reduced-motion styling.
- Keep the existing hero aspect ratio, shade, and navigation overlay.
- Add accessible slide labels, keyboard-operable controls, and polite announcements for manual slide changes.
- Add the `HEROCAROUSEL001` implementation specification.

## Validation

- No automated tests or browser checks were run.
- The reference site could not be inspected with the available browser reader; exact transition timing and control styling may need visual comparison against the reference.

## Reviewer Notes

- Confirm autoplay, looping, manual controls, focus pause, and hidden-page pause.
- Review the centered control placement at desktop and mobile widths.
- Check reduced-motion behavior and keyboard/screen-reader access.
- Compare the transition and controls with the Hanwha reference site when accessible.
