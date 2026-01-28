export type ThemeName = 'brandA' | 'brandB';

export type ThemeDefinition = {
  name: ThemeName;
  label: string;
  cssVars: Record<`--${string}`, string>;
};

import figmaTokens from '../tokens/figma-tokens.json';
import { tokensToResolvedCssVars } from '../tokens/tokenMap';

function buildBrandTheme(opts: { name: 'brandA' | 'brandB'; label: string; mappedSetName: 'Mapped/BrandA' | 'Mapped/BrandB' }) {
  const tokenFile = figmaTokens as any;
  const mapped = tokenFile?.[opts.mappedSetName];
  const primitivesDefault = tokenFile?.['Primitives/Default'];
  const responsiveDesktop = tokenFile?.['Responsive/Desktop'];

  const aliasSetName = opts.mappedSetName === 'Mapped/BrandA' ? 'Alias colours/BrandA' : 'Alias colours/BrandB';
  const resolutionOrder = [opts.mappedSetName, aliasSetName, 'Primitives/Default', 'Responsive/Desktop', 'Responsive/Mobile'];

  const mappedVars = mapped
    ? tokensToResolvedCssVars(mapped, { prefix: 'bl', tokenFile, searchOrder: resolutionOrder })
    : {};
  const primitivesVars = primitivesDefault
    ? tokensToResolvedCssVars(primitivesDefault, { prefix: 'bl', tokenFile, searchOrder: resolutionOrder })
    : {};
  const desktopVars = responsiveDesktop
    ? tokensToResolvedCssVars(responsiveDesktop, { prefix: 'bl', tokenFile, searchOrder: resolutionOrder })
    : {};

  // Generic app-wide vars derived from Mapped/* tokens so JSON stays the source of truth.
  const derived: Record<`--${string}`, string> = {
    '--bl-bg': 'var(--bl-surface-colour-page)',
    '--bl-fg': 'var(--bl-text-colour-body)',
    '--bl-muted': 'var(--bl-text-colour-passive)',
    '--bl-surface': 'var(--bl-surface-colour-secondary)',
    '--bl-dropdown-surface': 'var(--bl-surface-colour-secondary)',
    '--bl-border': 'var(--bl-border-colour-passive)',
    '--bl-primary': 'var(--bl-text-colour-brand)',
    '--bl-primary-fg': 'var(--bl-text-colour-action-inverse)',
    '--bl-radius': 'var(--bl-border-radius-md)',
    '--bl-dropdown-option-hover-bg': 'var(--bl-surface-colour-page)',
  };

  return {
    name: opts.name,
    label: opts.label,
    cssVars: {
      ...(primitivesVars as any),
      ...(mappedVars as any),
      ...(desktopVars as any),
      ...derived,
    } as Record<`--${string}`, string>,
  } satisfies ThemeDefinition;
}

export const themes: Record<ThemeName, ThemeDefinition> = {
  brandA: (() => {
    const base = buildBrandTheme({ name: 'brandA', label: 'Brand A', mappedSetName: 'Mapped/BrandA' });
    const annotationLine = base.cssVars['--bl-border-colour-passive'] ?? 'var(--bl-border-colour-passive)';
    const annotationFg = base.cssVars['--bl-text-colour-body'] ?? base.cssVars['--bl-fg'] ?? 'var(--bl-text-colour-body)';
    const annotationRadius = base.cssVars['--bl-border-radius-md'] ?? 'var(--bl-border-radius-md)';

    return {
      ...base,
      cssVars: {
        ...base.cssVars,
        '--bl-component-annotation-line': annotationLine,
        '--bl-component-annotation-fg': annotationFg,
        '--bl-component-annotation-radius': annotationRadius,
      },
    } satisfies ThemeDefinition;
  })(),
  brandB: (() => {
    const baseA = buildBrandTheme({ name: 'brandA', label: 'Brand A', mappedSetName: 'Mapped/BrandA' });
    const annotationLine = baseA.cssVars['--bl-border-colour-passive'] ?? 'var(--bl-border-colour-passive)';
    const annotationFg = baseA.cssVars['--bl-text-colour-body'] ?? baseA.cssVars['--bl-fg'] ?? 'var(--bl-text-colour-body)';
    const annotationRadius = baseA.cssVars['--bl-border-radius-md'] ?? 'var(--bl-border-radius-md)';

    const baseB = buildBrandTheme({ name: 'brandB', label: 'Brand B', mappedSetName: 'Mapped/BrandB' });
    return {
      ...baseB,
      cssVars: {
        ...baseB.cssVars,
        '--bl-component-annotation-line': annotationLine,
        '--bl-component-annotation-fg': annotationFg,
        '--bl-component-annotation-radius': annotationRadius,
      },
    } satisfies ThemeDefinition;
  })(),
};


