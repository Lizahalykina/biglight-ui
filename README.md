# biglight-ui

Component library + gallery built with **Preact**, **Vite**, **Tailwind CSS**, and **Storybook**. Supports **multiple brand themes** driven by Figma-exported **design tokens**.

## Setup & installation

- **Prerequisites**: Node.js (LTS recommended) + npm

Install dependencies:

```bash
npm install
```

Run the local dev app:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Run Storybook locally

**Note**: Storybook is deployed at [https://liza-biglight-storybook.netlify.app/](https://liza-biglight-storybook.netlify.app/)

Start Storybook:

```bash
npm run storybook
```

Build static Storybook:

```bash
npm run build-storybook
```

## How to switch between themes

This project supports **Brand A** and **Brand B** themes.

- **In the dev app**:
  - Use the **moon/sun toggle** (bottom-right) to switch the **global app theme** (outer `ThemeProvider`).
  - Use the **“Component theme” dropdown** to switch the theme used inside the component preview area (an inner `ThemeProvider`), so you can compare themes without changing the entire page.

- **In Storybook**:
  - Use the **Theme** toolbar control to switch `brandA` / `brandB` globally for all stories.

### Where themes live (code pointers)

- **Theme provider**: `src/theme/ThemeProvider.tsx`
- **Theme definitions** (Brand A/B): `src/theme/themes.ts`
- **Token source**: `src/tokens/figma-tokens.json`
- **Token → CSS var utilities**: `src/tokens/tokenMap.ts`

## Approach / design-to-code notes

See **`APPROACH.md`** for the design-to-code workflow and how tokens/themes are managed in this repo (including what happens when tokens change and how automated/maintainable the approach is).



