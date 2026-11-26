# Palarong Pambansa 2027 CTA Button Specification

**SLUG:** `PALAROCTA007`  
**Status:** Implemented  
**Page:** Bayanihang QC landing page  
**Target section:** Hero carousel — slide 1 (`assets/palaro-banner.png`)  
**Target files:** `index.html`, `styles.css`, `coming-soon.html`

---

## Goal

Add a "Volunteer for Palarong Pambansa 2027 Now!" call-to-action button that appears exclusively on the first hero carousel slide (the palaro banner), positioned in the bottom-left of the banner. The button links to an external registration URL that is not yet live; a placeholder "coming soon" page will be used until the real URL is ready. The button must remain visible and usable across all viewport widths including below 480px.

---

## Link Destination

- **Placeholder URL:** A local `coming-soon.html` page (`href="coming-soon.html"`, relative path so it works both locally and under GitHub Pages subpaths like `/volunteers-program-landing-page/`) with a **"Coming Soon"** message and a **"← Back to Bayanihang QC"** button (`href="./"`), until the real Palarong Pambansa 2027 volunteer registration form is published.
- **Final URL:** To be updated when the external registration URL is confirmed.
- **Target:** Opens in a new tab (`target="_blank" rel="noopener noreferrer"`) since it is an external resource.

---

## Button Label

```
Volunteer for Palarong Pambansa 2027 Now!
```

---

## Placement & DOM Structure

- The button lives **inside slide 1's markup** (`hero-carousel__slide`, index `0`) as an `<a>` element styled as a button.
- Because inactive slides already receive `opacity: 0; visibility: hidden; inert` via the existing carousel CSS and JS (`updateHeroSlide`), the button disappears automatically when the carousel advances to slides 2 or 3 — no additional JS toggle is needed.
- The button is **absolutely positioned** within the slide container, bottom-left, sitting above the `.hero__shade` layer (`z-index` must be higher than the shade's layer but lower than the navigation overlay).

### HTML addition (inside slide 1 only)

```html
<div class="hero-carousel__slide is-active" role="group" aria-roledescription="slide" aria-label="1 of 3" aria-hidden="false">
  <img class="hero__image" src="assets/palaro-banner.png" alt="" fetchpriority="high">
  <a
    class="palaro-cta"
    href="coming-soon.html"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Volunteer for Palarong Pambansa 2027 — opens registration page"
  >
    Volunteer for Palarong Pambansa 2027 Now!
  </a>
</div>
```

> [!NOTE]
> The `<a>` element uses `role` implied by its `href` — no additional `role="button"` needed. It inherits the slide's `inert` attribute when inactive, which removes it from tab order and interaction automatically.

---

## Visual Styling

### Color Palette (matching palaro banner)

| Property | Value | Rationale |
| :--- | :--- | :--- |
| Background | `#C8102E` (Palaro red) | Dominant accent from the banner text |
| Text | `#ffffff` | High contrast on red |
| Border | None | Clean, solid CTA |
| Border-radius | `999px` | Pill shape matching site button language |
| Box-shadow | None | Consistent with site's flat UI |

### Typography & Sizing

- **Font size:** `clamp(8px, 1.05vw, 16px)` — scales proportionally with the 16:9 hero banner from `320px` mobile up to `2560px` desktop without overflowing
- **Font weight:** `700` (bold)
- **Letter spacing:** `0.02em`
- **Text transform:** `none` — keep sentence case as written

### Padding & Position

```css
.palaro-cta {
  position: absolute;
  top: 75%;
  left: 11.5%;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  max-width: calc(100% - 23%);
  padding: clamp(5px, 0.9vw, 14px) clamp(10px, 2vw, 32px);
  background: #c8102e;
  color: #fff;
  font-size: clamp(8px, 1.05vw, 16px);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 999px;
  white-space: nowrap;
  transition: transform .18s ease, filter .18s ease;
}
```

- `white-space: nowrap` prevents the label from wrapping mid-phrase.
- Pure percentage `left: 11.5%` and `vw`-scaled `clamp()` padding/font-size ensure proportional scaling across `320px` to `2560px` without pushing the button rightward on mobile.

### Hover (desktop pointer devices only)

```css
@media (hover: hover) and (pointer: fine) {
  .palaro-cta:hover {
    transform: translateY(-2px);
    filter: brightness(1.12);
  }
}
```

### Focus

```css
.palaro-cta:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 3px;
}
```

---

## Visibility Behavior Per Slide

| Slide | Banner | Button visible? | Mechanism |
| :--- | :--- | :--- | :--- |
| 1 (active) | `palaro-banner.png` | ✅ Yes | Slide has `opacity: 1; visibility: visible` |
| 2 | `7eb43.png` | ❌ No | Slide has `opacity: 0; visibility: hidden; inert` |
| 3 | `7eb44.png` | ❌ No | Slide has `opacity: 0; visibility: hidden; inert` |

The existing carousel CSS and `updateHeroSlide()` in `app.js` already handle this — **no changes to `app.js` are required**.

---

## Responsiveness

The button must remain visible and usable at all breakpoints including below `480px`:

| Breakpoint | `top` | `left` | Approx button size |
| :--- | :--- | :--- | :--- |
| `<= 700px` (Mobile) | `58%` | `11.5%` | `8px font, ~5px/10px padding` |
| `701px – 900px` (Tablet) | `66%` | `11.5%` | `8px–9.5px font, ~7px/14px–18px padding` |
| `> 900px` (Desktop) | `75%` | `11.5%` | `9.5px–16px font, ~9px–14px / 18px–32px padding` |

Stepping `top` down from `75%` on desktop to `66%` on tablet (`<= 900px`) and `58%` on mobile (`<= 700px`) keeps the button clear of the bottom `.hero-carousel__controls` while keeping it below the headline.

> [!IMPORTANT]
> Do **not** add `display: none` or hide the button below any breakpoint. The button is a primary CTA and must remain visible even on the smallest viewports.

---

## Reduced Motion

The existing site-wide `@media (prefers-reduced-motion: reduce)` rule already zeroes transitions globally. The `.palaro-cta` hover `transition` will be suppressed automatically — no extra rule needed.

---

## Accessibility

- `aria-label` on the `<a>` provides a clear description including "opens registration page" to inform screen reader users it opens a new tab.
- When the slide is inactive (`inert`), the button is fully removed from keyboard tab order and assistive technology — no duplicate or phantom focusable elements.
- Focus ring (`outline: 3px solid #fff; outline-offset: 3px`) is high-contrast against both the red button and the banner background.

---

## Changes Summary

| File | Change |
| :--- | :--- |
| `index.html` | Add `.palaro-cta` `<a>` inside slide 1's `.hero-carousel__slide` |
| `styles.css` | Add `.palaro-cta` base styles, hover, and focus rules |
| `app.js` | **No changes required** |

---

## Acceptance Criteria

- [ ] Button appears only on slide 1 (palaro banner) and disappears automatically on slides 2 and 3.
- [ ] Button label reads exactly: **"Volunteer for Palarong Pambansa 2027 Now!"**
- [ ] Clicking opens `/coming-soon` (or the confirmed external URL) in a new tab.
- [ ] Button is visible and legible at viewport widths from 320px up to large desktop.
- [ ] Button does not overlap or obscure the "PALARONG PAMBANSA 2027" headline at any breakpoint.
- [ ] Hover applies `filter: brightness(1.12); transform: scale(1.03)` on desktop pointer devices only.
- [ ] Focus ring is visible and high-contrast.
- [ ] No layout shift, no overflow, no clipping at any tested width.
- [ ] `prefers-reduced-motion` suppresses transition — button remains functional.
