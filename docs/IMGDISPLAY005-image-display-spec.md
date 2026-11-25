# Landing Page Image Display Specification

**SLUG:** `IMGDISPLAY005`  
**Status:** Implemented  
**Page:** Bayanihang QC landing page

## Goal

Update the volunteer imagery in the “Bayanihan starts with you” and “Why Volunteer?” sections to give both sections a clear, consistent carousel presentation and stronger image visibility.

## Welcome Section Carousel

- Replace the overlapping photo stack in the “Bayanihan starts with you” section with a three-card image carousel matching the visual pattern used by “Community in action.”
- Use the three existing local photos: `assets/a3e50.png`, `assets/af4fd.png`, and `assets/089d3.png`.
- Show a centered active image and neighboring images, with card framing, rounded corners, and restrained depth/opacity treatment consistent with the “Community in action” carousel.
- Provide previous and next controls, keyboard navigation when the carousel viewport is focused, and pointer dragging. The carousel loops through its three photos.
- Keep an accessible name for the carousel, meaningful alternative text for the three photos, and a polite live status announcement for the active photo.
- Preserve the welcome section copy and calls to action.
- At widths of 1344px and above, use the `.32fr / 1.70fr` column proportions, keep the welcome copy at 460px with a 1.45 line height, and retain three visible cards.
- Between 1001px and 1343px, use balanced `.85fr / 1.15fr` columns with fluid copy width, taller cards, and no carousel offset.
- At widths of 1000px and below, stack the copy and carousel, enlarge the cards, and show fewer cards as the viewport narrows.
- On wide screens, shift the carousel using a `90vw`-based offset that leaves room from the edge; reset the offset at 1343px and below.
- Allocate more of the welcome section's desktop width to the carousel so its cards are larger while the three-card presentation remains intact.
- Keep the carousel responsive: avoid horizontal page overflow, and use larger cards with fewer visible neighbors where the available width requires it.
- Respect `prefers-reduced-motion`; carousel controls remain usable and transitions become immediate.

## “Community in Action” Images

- Keep three cards visible at desktop widths and enlarge them by allocating more of the section’s available width to the visual column and increasing the image height within each card.
- At widths of 1344px and above, use the `.32fr / 1.70fr` grid split and a fixed 460px copy width so grid ratio changes do not alter the description wrapping.
- Between 1001px and 1343px, use a balanced two-column layout with a fluid copy width and no carousel offset.
- At widths of 1000px and below, stack the copy and carousel; show fewer, larger carousel cards as the viewport narrows.
- On wide desktop layouts, position the carousel using a rightward offset calculated from `90vw`, leaving room at the screen edge; reset the offset at 1343px and below.
- Keep the description line spacing and width consistent with the supplied reference.
- Preserve the existing slider behavior, card order, captions, controls, drag and keyboard support, and image assets.
- Preserve the responsive layout and prevent the wider visual column from crowding or clipping the section copy.

## Partner Section Styling

- Use a 105-degree section gradient from `#c4e6ed` to white, reaching white at 10%.
- Use default opacity `1` for the decorative partner watermark on tall desktop screens, then reduce it with viewport height: `.85` at 900px and below, `.70` at 760px and below, `.55` at 650px and below, and a minimum of `.40` at 550px and below.
- Hide the partner watermark in the mobile layout.
- Set the partner section heading color to `#0058cc`.

## Out of Scope

- Do not change section copy, photo assets, the number of photos, or the destination of existing calls to action.
- Do not add external image or animation dependencies.

## Acceptance Criteria

- The welcome photo stack is replaced by a three-card carousel using the existing three local photos.
- The welcome carousel visually follows the “Community in action” card carousel pattern and has working previous/next, keyboard, and drag interactions.
- The welcome carousel cards are larger than the replaced photo-stack presentation while retaining the three-card desktop layout.
- The active welcome photo is announced accessibly, while decorative duplicate slides are hidden from assistive technology.
- Reduced-motion preferences disable animated transitions without disabling carousel controls.
- “Community in action” continues to show three cards at desktop widths, with wider and taller cards than before.
- The partner section uses the specified background gradient and heading color; its watermark opacity responds to viewport height and never falls below `.40` on desktop, and the watermark is hidden on mobile.
- Both carousels remain usable on tablet and mobile widths without horizontal page overflow or content clipping.
- Existing copy, CTA links, captions, and photo assets are retained.
