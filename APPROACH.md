// Approach (Design-to-code workflow)

This document outlines how design tokens move from Figma into code, how themes are built per brand, and how token changes flow through the system.

// Token flow (Figma → JSON → CSS variables)

Source: src/tokens/figma-tokens.json

Tokens are flattened, converted into deterministic CSS custom properties (--bl-*), and any {A.B.C} references are resolved across token sets.

Each brand theme (Brand A / Brand B) pulls in its mapped token sets (Mapped/BrandA, Mapped/BrandB) and generates a CSS variables map.

A small derived layer (for example --bl-bg, --bl-primary) provides convenient aliases while keeping the JSON as the single source of truth.

// Component usage

Components consume tokens via CSS variables, often through Tailwind arbitrary values.

Theme switching is handled at runtime by swapping CSS variables, without rebuilding components.

// Implementation

Token utilities live in src/tokens/tokenMap.ts:
- flattenFigmaTokens  
- toCssVarName  
- resolveFigmaTokenValue  
- tokensToResolvedCssVars  

Themes are defined in src/theme/themes.ts:
- Builds brandA and brandB from mapped and supporting token sets  
- Adds a minimal derived layer for easier consumption  

ThemeProvider (src/theme/ThemeProvider.tsx) applies a theme’s cssVars to a wrapper element.

Storybook exposes theme switching through a global toolbar control.

// Token changes

Token updates are picked up on rebuild or hot reload.

Most changes are data-driven and don’t require code changes.

Common issues include:
- Token renames changing CSS variable names
- Broken references remaining unresolved to make debugging easier

// Limitations and trade-offs

Token resolution happens at runtime.

There is no generated tokens.css, schema validation, or automated detection of token rename impact.

As a result, updates currently rely on visual QA rather than enforced validation.

// Production direction

With more time, token processing would move to build time, generating versioned CSS or typed modules, validated in CI and backed by visual regression tests.

Adding dark mode and more end-to-end examples would further demonstrate theme flexibility.

// AI usage

ChatGPT was used for early planning and outlining.  
Cursor was used as an AI-assisted editor for code navigation and iterative development.

No external token tooling was added; existing TypeScript utilities handle token resolution and theming.
