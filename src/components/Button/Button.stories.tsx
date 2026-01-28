import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { buttonExamples } from './Button.examples';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'radio', options: ['sm', 'md'] },
    withChevrons: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    variant: 'secondary',
    size: 'md',
    withChevrons: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: buttonExamples.Primary };
export const Secondary: Story = { args: buttonExamples.Secondary };
export const Tertiary: Story = { args: buttonExamples.Tertiary };
export const Disabled: Story = { args: buttonExamples.Disabled };
export const Small: Story = { args: buttonExamples.Small };
export const Medium: Story = { args: buttonExamples.Medium };



