export const previewLayout = {
  /** Controls the overall app preview margins/width */
  containerClass: 'mx-auto w-full max-w-screen-2xl px-2 py-3 sm:px-3 sm:py-4 lg:px-4 lg:py-5',

  /** Spacing for the title + theme selector row */
  headerRowClass: 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',

  /** Main grid that lays out all components */
  mainGridClass: 'mt-5 grid grid-cols-1 gap-3',

  /** Buttons section (Figma card) density controls */
  buttons: {
    headerClass:
      'flex h-[var(--bl-scale-2100)] items-center bg-[color:var(--bl-surface-colour-secondary)] px-[var(--bl-scale-500)] py-[var(--bl-scale-500)]',
    contentClass: 'px-[var(--bl-scale-500)] pb-[var(--bl-spacing-xl)]',
    minWidthClass:
      'mt-5 min-w-[calc(var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000))]',
  },
} as const


