# Hero Banner Carousel Specification

**SLUG:** `HEROCAROUSEL001`  
**Status:** Draft  
**Page:** Bayanihang QC landing page

## Goal

Replace the single-image Bayanihang QC hero banner with an automatically advancing carousel of exactly three local images. Match the transition style, timing, and visible controls of the [Hanwha reference site](https://psm-hanwha-1.webflow.io/).

## Slides

Use these local assets as the complete slide set:

1. `assets/7eb43.png`
2. `assets/7eb44.png`
3. `assets/palaro-banner.png`

Keep the slide order above unless the reference or image review indicates a more appropriate initial order. Do not add remote images or duplicate slides.

## Carousel Behavior

- Automatically advance through all three slides and loop continuously.
- Match the reference site's transition type, duration, easing, and control presentation when the reference can be inspected during implementation.
- Provide the same previous/next and slide-position controls shown by the reference. Controls must navigate to the corresponding slide and stay synchronized with automatic advancement.
- Pause automatic advancement while one of the carousel controls has keyboard focus or while the page is hidden. Resume when focus leaves or the page becomes visible; pointer hover alone does not pause the rotation.
- Reset the autoplay delay after any manual navigation.
- Stop autoplay when the page is hidden and resume when it becomes visible.
- Respect `prefers-reduced-motion`: use an immediate change or reduced transition while retaining functional controls.

## Layout and Existing Hero Content

- Keep the hero full width and retain the existing 16:9 aspect ratio on desktop and mobile.
- Fit each image proportionally within the hero using the existing cover behavior and centered positioning; do not stretch the artwork.
- Retain the existing hero shade and navigation overlay above the slides.
- Keep the images decorative with empty alternative text; expose slide state through accessible carousel labels and control names.
- Prevent horizontal page overflow at narrow viewport widths.
- Do not change navigation content or destinations.

## Accessibility

- Expose the carousel as a named region or carousel, and identify each slide as one of three.
- Use keyboard-operable controls with visible focus states and accessible names.
- Announce manually selected slides politely without repeatedly announcing every autoplay transition.
- Ensure inactive slides do not create duplicate or confusing content for assistive technology.

## Out of Scope

- Changes to other landing-page sections, partner logos, or navigation behavior.
- External carousel, image, or animation dependencies.
- Editing or replacing the supplied image assets.

## Acceptance Criteria

- The hero contains exactly the three specified local images.
- Slides advance automatically, loop, and can be changed with the reference-matching controls.
- Transition and controls match the reference site's visual behavior.
- Autoplay pauses for keyboard focus and hidden-page state; manual navigation restarts the delay.
- The navigation and existing shade remain layered above the active slide.
- The hero remains proportional and usable on desktop and mobile without horizontal overflow.
- Reduced-motion settings are honored and carousel controls remain usable.
- Keyboard and assistive-technology users can identify the carousel and operate its controls.

## Reference Inspection Note

The reference URL was provided, but the available browser reader could not open it during drafting. Exact transition details, autoplay interval, and control appearance therefore need visual confirmation against the reference before implementation is considered complete.
