import type { CardProps } from './Card';

export const cardExamples = {
  Small: {
    size: 'sm',
    title: 'Join the\nfamily.',
    buttonLabel: 'Join',
    variant: 'primary',
    withButtonIcon: true,
  },
  Medium: {
    size: 'md',
    title: 'Join the family.',
    buttonLabel: 'Join',
    variant: 'primary',
    withButtonIcon: true,
  },
} satisfies Record<string, CardProps>;


