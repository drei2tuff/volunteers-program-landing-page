# Hero Banner Specification

**SLUG:** `HEROPARTNERS004`
**Status:** Implemented
**Page:** Bayanihang QC landing page

## Goal

Display the updated Palarong Pambansa 2027 banner as the landing page hero, fitting the image to the hero area across desktop and mobile screen sizes.

## Banner Asset

- Use the local image `assets/palaro-banner.png` for the `.hero__image` element.
- The source image is 1920 × 1080 pixels (16:9).
- Keep the image decorative, with empty alternative text; the navigation remains the hero's interactive content.
- Do not stretch the image or introduce a remote image dependency.

## Layout and Scaling

- Keep the hero at a 16:9 aspect ratio so its bounds match the banner's proportions.
- Apply the same aspect ratio at the mobile breakpoint; do not impose a separate fixed mobile height that crops the banner.
- Fill the hero with the image using `object-fit: cover` and center it with `object-position: center`.
- Retain the existing hero shade and navigation overlay.

## Partner Logo Grid

- Keep the partner logos in the existing three-column, two-row grid.
- Show the logos without a surrounding border, rounded container, or tinted panel background.
- Do not draw vertical or horizontal divider lines between partner cells.
- Keep each logo centered within its cell and retain the existing grid sizing and overflow behavior.

## Acceptance Criteria

- The hero uses `assets/palaro-banner.png`.
- The hero follows a 16:9 ratio on desktop and mobile.
- The banner scales proportionally and its edges are not cropped by a conflicting fixed hero height.
- The navigation stays visible above the banner, and the existing shade remains in place.
- The layout does not cause horizontal overflow at narrow viewport widths.
- The partner logo grid has no outer border, panel background, rounded container, or internal divider lines.
- Partner logos remain centered and contained within their grid cells.
