# Windows 98 CSS Style Guide

A reusable design system extracted from the Gradient Generator project. Copy-paste these patterns into any project to get an authentic Windows 98 look.

---

## Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&display=swap');

/* Primary system font — pixel-perfect Win98 feel */
@font-face {
  font-family: 'W95FA';
  src: url('https://fonts.cdnfonts.com/css/w95fa') format('woff2');
}
```

Also link in `<head>`:
```html
<link href="https://fonts.cdnfonts.com/css/w95fa" rel="stylesheet" />
```

---

## CSS Custom Properties (Design Tokens)

```css
:root {
  /* Surface colors */
  --bg-system: #c0c0c0;          /* Classic silver — used on windows, buttons, toolbars */

  /* Title bar gradient */
  --win-blue-dark: #000080;       /* Navy — left side of title bar */
  --win-blue-light: #1084d0;      /* Bright blue — right side of title bar */

  /* Borders (the key to the entire 3D illusion) */
  --border-light: #ffffff;        /* Top/left highlight edge */
  --border-dark: #000000;         /* Bottom/right shadow edge */
  --border-gray: #808080;         /* Intermediate shadow for inset elements */

  /* Text */
  --text-main: #000000;
  --text-white: #ffffff;

  /* Fonts */
  --font-win: 'W95FA', 'Microsoft Sans Serif', 'Arial', sans-serif;
  --font-secondary: 'Sawarabi Gothic', sans-serif;
}
```

---

## Desktop Background

The classic teal desktop:

```css
body {
  background-color: #008080;
  color: var(--text-main);
  font-family: var(--font-win);
}
```

---

## Core 3D Border Patterns

The entire Win98 aesthetic relies on two border patterns that create the illusion of depth.

### Raised (Outset) — used on windows, buttons

Light on top-left, dark on bottom-right. The element appears to "pop out" of the screen.

```css
.raised {
  border-top: 2px solid var(--border-light);
  border-left: 2px solid var(--border-light);
  border-right: 2px solid var(--border-dark);
  border-bottom: 2px solid var(--border-dark);
  box-shadow: 2px 2px 0 var(--border-gray);
}
```

### Sunken (Inset) — used on text fields, preview areas, code blocks

Dark on top-left, light on bottom-right. The element appears to be "carved into" the surface.

```css
.sunken {
  border-top: 1px solid var(--border-gray);
  border-left: 1px solid var(--border-gray);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  box-shadow: inset 1px 1px 0 var(--border-dark);
}
```

---

## Window

The main container. A raised panel with internal padding.

```css
.win98-window {
  background-color: var(--bg-system);
  border-top: 2px solid var(--border-light);
  border-left: 2px solid var(--border-light);
  border-right: 2px solid var(--border-dark);
  border-bottom: 2px solid var(--border-dark);
  padding: 3px;
  box-shadow: 2px 2px 0 var(--border-gray);
  display: flex;
  flex-direction: column;
}
```

```html
<div class="win98-window">
  <!-- title bar, menu bar, content go here -->
</div>
```

---

## Title Bar

The signature navy-to-blue gradient bar with white bold text and min/max/close buttons.

```css
.win98-title-bar {
  background: linear-gradient(to right, var(--win-blue-dark), var(--win-blue-light));
  padding: 3px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-white);
  font-weight: bold;
}

.win98-title-text {
  font-size: 14px;
}
```

### Title Bar Buttons (Minimize, Maximize, Close)

Small raised squares that invert borders on `:active` to simulate being pressed.

```css
.win98-title-btn {
  width: 16px;
  height: 14px;
  background-color: var(--bg-system);
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
  border-right: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: black;
  cursor: default;
  font-family: Arial, sans-serif;
}

.win98-title-btn:active {
  border-top: 1px solid var(--border-dark);
  border-left: 1px solid var(--border-dark);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  padding: 1px 0 0 1px;
}
```

```html
<header class="win98-title-bar">
  <div class="win98-title-text">My Application</div>
  <div style="display: flex; gap: 2px;">
    <div class="win98-title-btn">_</div>
    <div class="win98-title-btn">□</div>
    <div class="win98-title-btn">×</div>
  </div>
</header>
```

---

## Menu Bar

Underlined hotkey letters, gray bottom border.

```css
.win98-menu-bar {
  display: flex;
  padding: 2px 0;
  gap: 15px;
  font-size: 13px;
  padding-left: 10px;
  border-bottom: 1px solid var(--border-gray);
}

.win98-menu-item {
  cursor: default;
}

.win98-menu-item span {
  text-decoration: underline;
}
```

```html
<nav class="win98-menu-bar">
  <div class="win98-menu-item"><span>F</span>ile</div>
  <div class="win98-menu-item"><span>E</span>dit</div>
  <div class="win98-menu-item"><span>V</span>iew</div>
  <div class="win98-menu-item"><span>H</span>elp</div>
</nav>
```

---

## Buttons

The most reused component. Raised by default, inverted borders on `:active` and `.active`. Dotted outline on `:focus`.

```css
.win98-btn {
  background-color: var(--bg-system);
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
  border-right: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
  padding: 4px 15px;
  font-family: var(--font-win);
  font-size: 13px;
  cursor: pointer;
  box-shadow: inset 1px 1px 0 #dfdfdf;
  outline: none;
}

/* Pressed / toggled-on state */
.win98-btn:active,
.win98-btn.active {
  border-top: 1px solid var(--border-dark);
  border-left: 1px solid var(--border-dark);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  padding: 5px 14px 3px 16px;
  box-shadow: none;
}

/* Focus ring */
.win98-btn:focus {
  outline: 1px dotted #000;
  outline-offset: -4px;
}
```

### Small Icon Button

For close/remove actions inside rows:

```css
.icon-btn {
  background: var(--bg-system);
  border: 1px solid var(--border-dark);
  font-size: 10px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
```

---

## Tabs

Tabs sit on top of a tab-content panel. The active tab loses its bottom border and appears connected to the content.

```css
.win98-tabs {
  display: flex;
  padding-left: 2px;
}

.win98-tab {
  padding: 4px 12px;
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
  border-right: 1px solid var(--border-dark);
  margin-right: 2px;
  background-color: var(--bg-system);
  font-size: 13px;
  cursor: pointer;
  position: relative;
  top: 1px;
  z-index: 1;
  font-family: var(--font-win);
}

.win98-tab.active {
  padding: 6px 14px 4px 14px;
  top: 0;
  border-bottom: none;
  font-weight: bold;
  z-index: 3;
}

.tab-content {
  flex: 1;
  border: 1px solid var(--border-light);
  border-right: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
  box-shadow:
    inset -1px -1px 0 var(--border-gray),
    inset 1px 1px 0 #fff;
  background-color: var(--bg-system);
  padding: 10px;
}

.tab-pane { display: none; }
.tab-pane.active { display: flex; flex-direction: column; }
```

```html
<div class="win98-tabs">
  <button class="win98-tab active" data-target="tab1">Tab 1</button>
  <button class="win98-tab" data-target="tab2">Tab 2</button>
</div>
<div class="tab-content">
  <div id="tab1" class="tab-pane active">...</div>
  <div id="tab2" class="tab-pane">...</div>
</div>
```

### Tab switching JS

```js
document.querySelectorAll('.win98-tab').forEach(btn => {
  btn.addEventListener('click', e => {
    document.querySelectorAll('.win98-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');
    document.getElementById(e.target.dataset.target).classList.add('active');
  });
});
```

---

## Fieldset (Group Box)

A labeled group with inverted inset borders (gray top-left, white bottom-right) and an absolutely-positioned legend.

```css
.win98-fieldset {
  border-top: 1px solid var(--border-gray);
  border-left: 1px solid var(--border-gray);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  padding: 15px 10px 10px 10px;
  position: relative;
}

.win98-fieldset legend {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: var(--bg-system);
  padding: 0 5px;
  font-size: 13px;
}
```

```html
<fieldset class="win98-fieldset">
  <legend>Settings</legend>
  <!-- content -->
</fieldset>
```

---

## Inset Container (Text Input Wrapper)

White background with sunken borders — used to wrap `<input>` fields.

```css
.win98-inset {
  background-color: #fff;
  border-top: 1px solid var(--border-gray);
  border-left: 1px solid var(--border-gray);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  box-shadow: inset 1px 1px 0 var(--border-dark);
  padding: 2px;
}
```

```html
<div class="win98-inset">
  <input type="text" style="border: none; outline: none; font-family: var(--font-win); font-size: 13px;" />
</div>
```

---

## Code Output Block

Monospace text in a sunken white container.

```css
.code-output-container {
  background: #fff;
  border-top: 1px solid var(--border-gray);
  border-left: 1px solid var(--border-gray);
  border-right: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  box-shadow: inset 1px 1px 0 var(--border-dark);
  padding: 5px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  min-height: 40px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
```

---

## Range Slider (Win98 Style)

Custom-styled slider track and thumb that match the system look.

```css
.pos-slider {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
}

.pos-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: var(--border-gray);
  border-bottom: 1px solid var(--border-light);
  border-right: 1px solid var(--border-light);
}

.pos-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 18px;
  width: 10px;
  background: var(--bg-system);
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
  border-right: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
  margin-top: -8px;
  box-shadow: 1px 1px 0 var(--border-gray);
}
```

---

## Tooltip

A small raised box with a thin connecting line (pseudo-element).

```css
.win98-tooltip {
  position: absolute;
  background: var(--bg-system);
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
  border-right: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
  padding: 2px 4px;
  font-size: 11px;
  white-space: nowrap;
  pointer-events: none;
}

.win98-tooltip::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 6px;
  background: var(--border-dark);
}
```

---

## Overlay Badge

A small label that floats over a preview area.

```css
.overlay-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--border-gray);
  padding: 2px 5px;
  font-size: 11px;
}
```

---

## Credits / Status Bar

A raised bar pinned to the bottom, styled like a Win98 status bar.

```css
.win98-status-bar {
  position: absolute;
  bottom: 5px;
  left: 10px;
  color: var(--text-main);
  background-color: var(--bg-system);
  border-top: 2px solid var(--border-light);
  border-left: 2px solid var(--border-light);
  border-right: 2px solid var(--border-dark);
  border-bottom: 2px solid var(--border-dark);
  padding: 3px;
}

.win98-status-bar a {
  color: var(--win-blue-dark);
  text-decoration: underline;
}
```

---

## Color Reference

| Token               | Hex       | Usage                                        |
|----------------------|-----------|----------------------------------------------|
| `--bg-system`        | `#c0c0c0` | Window background, buttons, toolbars         |
| `--win-blue-dark`    | `#000080` | Title bar gradient start, link color         |
| `--win-blue-light`   | `#1084d0` | Title bar gradient end                       |
| `--border-light`     | `#ffffff` | Raised top/left edge                         |
| `--border-dark`      | `#000000` | Raised bottom/right edge, sunken top/left    |
| `--border-gray`      | `#808080` | Intermediate shadow, sunken borders          |
| `--text-main`        | `#000000` | Body text                                    |
| `--text-white`       | `#ffffff` | Title bar text                               |
| Desktop teal         | `#008080` | Body background (the "desktop")              |
| Warning red          | `#800000` | Error/warning text                           |
| Inner highlight      | `#dfdfdf` | Button inner box-shadow for extra depth      |

---

## Design Rules Summary

1. **No border-radius anywhere.** Everything is sharp rectangles.
2. **No drop shadows.** Only hard `box-shadow` offsets (e.g., `2px 2px 0`).
3. **No gradients on surfaces** — only the title bar uses a gradient. Everything else is flat `#c0c0c0`.
4. **3D illusion = asymmetric borders.** Light top-left + dark bottom-right = raised. Reverse = sunken.
5. **Pressed state = inverted borders.** Buttons swap their light/dark edges on `:active`.
6. **Font size stays small.** 11-14px range. The system font `W95FA` does the heavy lifting.
7. **`cursor: default`** on non-interactive elements (title bar buttons, menu items) — Win98 didn't use pointer cursors everywhere.
8. **Focus ring is a 1px dotted black outline** inset from the edge (`outline-offset: -4px`).
9. **Spacing is tight.** 2-5px gaps, 3-6px padding. The UI is compact.
10. **Colors are muted.** The palette is silver, gray, black, white, navy, and teal. No bright accent colors.
