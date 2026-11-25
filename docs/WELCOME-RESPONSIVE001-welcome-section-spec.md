# Responsive Welcome Section Specification

**SLUG:** `WELCOME-RESPONSIVE001`  
**Status:** Draft  
**Page:** Bayanihang QC landing page  
**Target section:** “Bayanihan starts with you” (`.welcome`)

## Goal

Refactor the welcome section so its copy, calls to action, decorative glows, and volunteer photo carousel fit fluidly from 320px mobile screens through 2560px ultrawide screens. Preserve the current visual hierarchy, warm gradient, photo carousel, and its interactions.

The requested “Bayanihan starts with you” section is the `<section class="welcome">` immediately after the page banner. It is distinct from the `<header class="hero">` banner carousel; this change targets `.welcome` only.

## Current Responsive Risks

- `.welcome` uses `min-height: 600px`, which can create excess empty space when content is short and does not adapt to content height.
- `.welcome__content` has a fixed `55px` gap at its base layout.
- At `min-width: 1344px`, `.welcome__content` switches to a `.32fr / 1.70fr` grid with a fixed `340px` gap. The combined tracks, gap, and page gutters can exceed the available content width.
- The same wide-screen rule fixes `.welcome__copy` at `460px`, independently of its grid track.
- The wide-screen `.welcome__gallery` translates horizontally using a viewport-based calculation, so its visual position can leave its grid track or be clipped by `.welcome { overflow: hidden; }`.
- The heading and description already use partly fluid sizing, but description text and several controls use fixed pixel sizes. The mobile heading clamp can reach `54px` at narrow widths and should be recalibrated against the available copy width and its forced line break.
- `.welcome__gallery` uses fixed `min-height` values of `420px`, `340px`, and `300px`, producing inconsistent space allocation across breakpoints.
- Decorative glow images are absolutely positioned and sized partly from viewport width. They are intentional background decoration, but should be bounded and remain behind content at every width.
- Global `.page-width` gutters are fixed at 64px, 48px, or 36px depending on breakpoint, rather than scaling continuously.

## Scope

- Refactor `.welcome`, `.welcome__content`, `.welcome__copy`, heading and description typography, `.button-row`, `.button`, `.welcome__gallery`, carousel sizing, and decorative glow sizing.
- Use a mobile-first layout with a single-column content flow at narrow widths and a two-column layout only when both columns have adequate room.
- Use `minmax(0, ...)`, `min-width: 0`, fluid `clamp()` values, relative units, and a centered max-width container to keep grid children within the viewport.
- Keep decorative glow layers non-interactive and behind readable content. Clip decoration locally without clipping focus outlines, carousel controls, or meaningful content.
- Keep existing carousel markup, image assets, drag and keyboard behavior, controls, and reduced-motion behavior.
- Keep the heading wording, paragraph, CTA labels and links, and carousel captions unchanged.

## Responsive Layout Requirements

- At 320px, 375px, 480px, and 768px, use a single-column flow. Copy and CTAs appear before the gallery. CTA buttons wrap or stack without horizontal overflow and keep comfortable touch targets.
- At 1024px, choose a one- or two-column layout based on available content width; neither column may shrink below its content-safe minimum.
- At 1280px and 1440px, use a balanced two-column layout with fluid gap and no translated gallery or fixed-width copy track.
- At 1920px and 2560px, center content inside a max-width container. Do not expand text measure or scale assets indefinitely with viewport width.
- Keep all text and controls within the section’s content box. Allow the section to grow vertically with content rather than imposing a fixed height.
- Preserve carousel aspect ratios and image `object-fit: cover`; ensure slide widths derive from the carousel viewport and never increase the document’s scroll width.
- Decorative glows may extend beyond the section’s inner content, but must remain bounded by the section and must never obscure the heading, description, or buttons.

## Typography and Spacing

- Set the heading size with a `clamp()` range suitable for narrow phones through desktop. Preserve the uppercase treatment, color, weight, and tight line-height.
- Set description and button text with fluid `clamp()` sizing and readable line-height. Keep a sensible maximum line length.
- Use `clamp()` for section block padding, grid gap, copy-to-gallery spacing, and CTA gap.
- Avoid fixed pixel widths and heights in the welcome layout. Small borders, icon details, and accessible minimum control targets may remain fixed where appropriate.
- Ensure the explicit `<br>` in the heading does not force an awkward overflow; revise its responsive behavior only if the resulting layout requires it.

## HTML

No markup change is currently required. Retain the current section structure and semantic heading. Change the heading line break only if CSS alone cannot preserve a balanced wrap at the specified viewport widths. Do not alter carousel accessibility attributes or interaction hooks as part of this layout refactor.

## Accessibility and Interaction

- Preserve visible keyboard focus indicators for carousel and CTA controls.
- Maintain usable touch targets and clear separation between adjacent CTA buttons.
- Keep existing carousel keyboard, drag, previous/next, status announcement, and reduced-motion behavior.
- Ensure background glow assets remain hidden from assistive technology (they already use empty alt text).
- Do not use overflow clipping in a way that cuts off focus indicators or carousel controls.

## Acceptance Criteria

- At 320px, 375px, 480px, 768px, 1024px, 1280px, 1440px, 1920px, and 2560px viewport widths, the document has no horizontal scrolling caused by the welcome section.
- Heading, paragraph, CTAs, and carousel remain within the content area, readable, and visually aligned.
- Copy and CTA buttons appear before the photo carousel on narrow screens; desktop columns remain balanced and do not collide.
- The section height follows its content, with no large blank region caused by a fixed minimum height.
- Decorative assets remain behind content, bounded by the section, and do not cover text or controls.
- The photo carousel retains its current assets, aspect ratios, controls, keyboard and drag interactions, and reduced-motion support.
- No arbitrary breakpoint patches are introduced where fluid sizing or intrinsic layout can solve the issue.

## Implementation Note

The exact two-column activation threshold should be selected from intrinsic content needs during implementation rather than assumed from a legacy breakpoint. Responsive behavior should be checked at the listed viewport widths, including intermediate widths around the layout transition.
