import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'focus', 'filled', 'disabled', 'error', 'success'] },
    type: { control: 'radio', options: ['text', 'email', 'password', 'search'] },
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
    onInput: fn(),
    variant: 'default',
    required: true,
    requiredText: 'required',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { variant: 'default', label: 'Default', placeholder: 'Type…', value: '' } };
export const Focus: Story = { args: { variant: 'focus', label: 'Focus', placeholder: 'Type…', value: '' } };
export const Filled: Story = { args: { variant: 'filled', label: 'Filled', value: 'hello@biglight.com' } };
export const Disabled: Story = { args: { variant: 'disabled', label: 'Disabled', placeholder: 'Type…', value: '' } };
export const Error: Story = {
  args: { variant: 'error', label: 'Error', value: 'hello@' },
};
export const Success: Story = {
  args: { variant: 'success', label: 'Success', value: 'hello@biglight.com' },
};


