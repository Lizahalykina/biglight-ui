import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { Card } from './Card';
import { cardExamples } from './Card.examples';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    buttonSize: { control: 'radio', options: ['sm', 'md'] },
    buttonClass: { control: 'text' },
    variant: { control: 'radio', options: ['primary', 'secondary', 'tertiary'] },
    buttonDisabled: { control: 'boolean' },
    withButtonIcon: { control: 'boolean' },
  },
  args: {
    ...cardExamples.Medium,
    onButtonClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Small: Story = {
  args: {
    ...cardExamples.Small,
    onButtonClick: fn(),
  },
};

export const Medium: Story = {
  args: {
    ...cardExamples.Medium,
    onButtonClick: fn(),
  },
};


