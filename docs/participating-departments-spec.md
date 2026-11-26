# Participating City Departments Logo Showcase Specification

**SLUG:** `DEPTLOGOS006`  
**Status:** Implemented  
**Reference:** [Autoplay Logo from CMS (Webflow)](https://autoplay-logo-from-cms.webflow.io/)  
**Target Files:** `index.html`, `styles.css`, `app.js`

## Goal

Transform the **Participating City Departments** section (`.departments`) into a polished, stationary, responsive logo showcase where **6 department logo slots** are always visible simultaneously, and **all 7 department logos** rotate through those slots **one slot at a time**—replacing the current horizontal scroll-snap carousel and arrow buttons.

---

## Reference Behavior

Inspired by `autoplay-logo-from-cms.webflow.io`:
- The grid/row of **6 visible slots** remains completely stationary (not a scrolling marquee or sliding carousel).
- Rather than changing all logos simultaneously as a whole, **one slot transitions at a time** in sequence, swapping its outgoing logo for the next queued logo from the **7-logo pool** (`6 visible + 1 in reserve`).
- Transitions use a calm fade/scale/grayscale effect so focus moves smoothly from slot to slot while keeping the layout clean and unobtrusive.

---

## Scope & Changes Overview

1. **HTML (`index.html`, `.departments` section):**
   - Keep `<section class="departments section-pad">`, `.departments__background` (`assets/2bddd.svg`), and `<h2>Participating City Departments</h2>` unchanged.
   - Remove the `.department-arrow` previous/next `<button>` elements.
   - Replace the six placeholder `assets/0dbd5.png` images inside `.department-logos` with 6 stationary `.department-slot` containers (each holding a current/incoming `<img>` pair or single `.department-logo` element for clean cross-fade/swap transitions) and descriptive `alt` text.

2. **CSS (`styles.css`):**
   - Replace horizontal scroll-snap styles (`.department-arrow`, `.department-logos` `overflow-x: auto` / `scroll-snap-type`) with a stationary, responsive CSS Grid layout.
   - Style `.department-logo` for subtle fade, scale, and grayscale transitions, desktop-only hover (`scale(1.08)`), and `@media (prefers-reduced-motion: reduce)`.

3. **JavaScript (`app.js`):**
   - Remove the `.department-arrow` click-to-scroll event listener block (currently lines 239–247).
   - Add a lightweight queue/rotation controller that holds the **7 department logo entries** (`src` + descriptive `alt`), renders 6 initially, keeps 1 (`SSDD.png`) in reserve, and steps **one slot at a time** through the staggered sequence (`0s`, `1.2s`, `2.4s`, `3.6s`, `4.8s`, `6s` within an `8s` cycle) to swap the outgoing logo with the queued logo.
   - Skip rotation when `window.matchMedia("(prefers-reduced-motion: reduce)").matches` is `true`.

---

## Logo Assets & Accessibility (7 Logos → 6 Visible Slots)

All 7 local PNGs under `assets/` are included in the rotation pool:

| Pool Index | Asset Path | Descriptive `alt` Text |
| :--- | :--- | :--- |
| 1 | `assets/Quezon City Public Library.png` | `Quezon City Public Library` |
| 2 | `assets/Barangay and Community Relations Department.png` | `Barangay and Community Relations Department` |
| 3 | `assets/Department of Sanitation and Cleanup Works of Quezon City.png` | `Department of Sanitation and Cleanup Works of Quezon City` |
| 4 | `assets/Quezon City Fire District.png` | `Quezon City Fire District` |
| 5 | `assets/Quezon City Sports Development Office.png` | `Quezon City Sports Development Office` |
| 6 | `assets/Quezon City Tourism Department.png` | `Quezon City Tourism Department` |
| 7 (Reserve) | `assets/SSDD.png` | `Social Services Development Department` |

- At page load, slots 1–6 display logos 1–6, and logo 7 (`SSDD.png`) sits in the 1-item reserve queue.
- When Slot 1 transitions, `SSDD.png` enters Slot 1 and Slot 1's outgoing logo moves to the reserve queue; next, Slot 2 swaps with the reserve queue, and so on, ensuring **no duplicate logos** appear simultaneously and every logo cycles through.
- Every visible `<img>` always carries the matching department's descriptive `alt` text (e.g., `alt="Quezon City Public Library"`).

---

## Visual Styling

- **Original colors preserved:** No permanent color overlays or tinting.
- **No cropping & aspect ratio preserved:** Use `object-fit: contain`, `width: auto; height: auto;` constrained by `max-width: 100%` and responsive `max-height` so every logo renders completely without clipping or distortion.
- **Transparent backgrounds:** No background fills on logos or slots.
- **No cards, shadows, borders, or glow effects:** Focus remains strictly on the department identities against the existing `.departments` section background (`#e5f7ea` + `assets/2bddd.svg`).

---

## Timing & Transition Behavior

### Cadence & Staggered Delays

- **Cycle duration:** `8s` (`ease-in-out`, `infinite`).
- **Staggered slot offsets:**
  - Slot 1: `0s`
  - Slot 2: `1.2s`
  - Slot 3: `2.4s`
  - Slot 4: `3.6s`
  - Slot 5: `4.8s`
  - Slot 6: `6s`
- Only one slot transitions at any given moment in the 8s cycle, so the showcase never changes as a whole.

### Per-Slot Transition (Fade / Scale / Grayscale)

When a slot's turn arrives:
1. The outgoing `.department-logo` subtly fades out, slightly scales down/neutralizes, and shifts toward grayscale (`opacity: 0; filter: grayscale(100%); transform: scale(0.96);`).
2. The incoming logo from the reserve queue replaces it and eases in to full clarity (`opacity: 1; filter: grayscale(0%); transform: scale(1);`) using `ease-in-out`.
3. Between transitions, idle logos remain clearly visible with original colors preserved (or subtle resting emphasis).

---

## Hover Interaction (Desktop Only)

Scoped to hover-capable pointer devices (`@media (hover: hover) and (pointer: fine)`):

```css
@media (hover: hover) and (pointer: fine) {
  .department-logo {
    transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
  }

  .department-logo:hover {
    transform: scale(1.08);
  }
}
```

- Hovering one logo scales only that logo within its own grid slot (`transform: scale(1.08); transition: 0.3s ease;`).
- Neighboring slots and logos do not shift, resize, or reflow.
- Touch devices do not get stuck in a hovered state.

---

## Responsive Layout Requirements

Use a stationary CSS Grid (`.department-logos`) centered within `.departments__inner` so all six slots remain balanced from **320px** mobile viewports up to large desktop monitors:

- **Mobile (`320px` – `639px`):** 2 columns × 3 rows (`grid-template-columns: repeat(2, minmax(0, 1fr))`), `gap: 24px 20px`, `max-height: 68px`.
- **Tablet (`640px` – `1023px`):** 3 columns × 2 rows (`grid-template-columns: repeat(3, minmax(0, 1fr))`), `gap: 28px 32px`, `max-height: 76px`.
- **Laptop & Large Desktop (`1024px+`):** 6 columns × 1 row (`grid-template-columns: repeat(6, minmax(0, 1fr))`), `gap: 28px`, `max-height: 84px`.

Safeguards:
- `justify-items: center; align-items: center;` so every logo sits centered in its track with uniform spacing.
- `min-width: 0` on grid tracks and `max-width: 100%` on `.department-logo` to prevent horizontal overflow or clipping at `320px`.
- Fixed slot height (`min-height` matching the breakpoint `max-height` + hover headroom) so logo swaps and hover scaling never cause layout shifts.

---

## Reduced Motion Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .department-logo {
    animation: none;
    transition: none;
  }
}
```

When `prefers-reduced-motion: reduce` is enabled:
- CSS animations and transitions on `.department-logo` are disabled.
- JavaScript rotation is skipped, leaving the initial 6 logos static, clearly visible, and in full original color.

---

## Acceptance Criteria

- [ ] All 6 visible slots are stationary and simultaneously visible across `320px`, tablet, laptop, and large desktop viewports.
- [ ] All 7 department logos (including `SSDD.png`) cycle through the 6 slots one by one without duplicates or the whole row changing at once.
- [ ] No horizontal scrollbar, arrow buttons, overflow, logo clipping, or layout shifts occur at any breakpoint.
- [ ] Logos retain their original colors, aspect ratios, and transparent backgrounds with no cards, borders, shadows, or glow effects.
- [ ] Staggered `0s`, `1.2s`, `2.4s`, `3.6s`, `4.8s`, `6s` sequence within an `8s` `ease-in-out` cycle drives calm one-by-one transitions.
- [ ] Desktop hover applies `transform: scale(1.08)` with `0.3s ease` transition without affecting neighboring logos.
- [ ] Each `<img>` has descriptive `alt` text.
- [ ] `@media (prefers-reduced-motion: reduce)` disables `.department-logo` animation and keeps the showcase static.
