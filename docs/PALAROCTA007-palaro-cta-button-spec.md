# Palarong Pambansa 2027 CTA Button Specification

**SLUG:** `PALAROCTA007`  
**Status:** Implemented  
**Page:** Bayanihang QC landing page  
**Target section:** Hero carousel — slide 1 (`assets/palaro-banner.png`)  
**Target files:** `index.html`, `styles.css`, `app.js`

---

## Goal

Add a "Volunteer for Palarong Pambansa 2027 Now!" call-to-action button that appears exclusively on the first hero carousel slide (the palaro banner), positioned in the bottom-left of the banner. The button links to an external registration URL that is not yet live; a placeholder "coming soon" page will be used until the real URL is ready. The button must remain visible and usable across all viewport widths including below 480px.

---

## Link Destination

- **Placeholder URL:** A local or hosted `/coming-soon` page (e.g., `href="/coming-soon"` or a minimal hosted URL) with a **"Coming Soon"** message, until the real Palarong Pambansa 2027 volunteer registration form is published.
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
    href="/coming-soon"
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
| Border-radius | `6px` | Slightly rounded, matches site button language |
| Box-shadow | None | Consistent with site's flat UI |

### Typography & Sizing

- **Font size:** `clamp(12px, 1.4vw, 15px)` — stays readable at all widths without wrapping aggressively
- **Font weight:** `700` (bold)
- **Letter spacing:** `0.02em`
- **Text transform:** `none` — keep sentence case as written

### Padding & Position

```css
.palaro-cta {
  position: absolute;
  bottom: clamp(24px, 5%, 56px);
  left: clamp(16px, 6%, 80px);
  z-index: 3;
  display: inline-block;
  padding: clamp(10px, 1.4vw, 14px) clamp(18px, 2.8vw, 32px);
  background: #C8102E;
  color: #ffffff;
  font-size: clamp(12px, 1.4vw, 15px);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 6px;
  white-space: nowrap;
  transition: filter 0.25s ease, transform 0.25s ease;
}
```

- `white-space: nowrap` prevents the label from wrapping mid-phrase on medium widths.
- `bottom` and `left` use `clamp()` so the button scales proportionally from 320px to 2560px without getting clipped or drifting over the banner text.

### Hover (desktop pointer devices only)

```css
@media (hover: hover) and (pointer: fine) {
  .palaro-cta:hover {
    filter: brightness(1.12);
    transform: scale(1.03);
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

| Breakpoint | `bottom` | `left` | Approx button size |
| :--- | :--- | :--- | :--- |
| `320px` | `~24px` | `~16px` | `~12px font, ~10px/18px padding` |
| `480px` | `~24px` | `~29px` | `~13px font, ~11px/22px padding` |
| `768px` | `~38px` | `~46px` | `~14px font, ~11px/22px padding` |
| `1024px+` | `~50px` | `~64px` | `~15px font, ~14px/32px padding` |

All values are driven by `clamp()` — no additional media query overrides required unless visual inspection reveals edge-case misalignment.

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
