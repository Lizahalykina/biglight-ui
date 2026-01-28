import type { ButtonProps } from './Button';

export const buttonExamples: Record<string, Partial<ButtonProps>> = {
  Primary: { variant: 'primary', size: 'md', withChevrons: false, children: 'Primary' },
  Secondary: { variant: 'secondary', size: 'md', withChevrons: false, children: 'Secondary' },
  Tertiary: { variant: 'tertiary', size: 'md', withChevrons: false, children: 'Tertiary' },
  Disabled: { variant: 'primary', size: 'md', disabled: true, withChevrons: false, children: 'Disabled' },
  Small: { variant: 'secondary', size: 'sm', withChevrons: true, children: 'Small' },
  Medium: { variant: 'secondary', size: 'md', withChevrons: true, children: 'Medium' },
};


