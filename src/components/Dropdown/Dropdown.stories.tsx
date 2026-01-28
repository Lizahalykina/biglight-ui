import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { Dropdown } from './Dropdown';
import { dropdownExamples } from './Dropdown.examples';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'focus', 'selected', 'disabled', 'opened'] },
  },
  args: {
    ...dropdownExamples.Default,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = { args: dropdownExamples.Default };
export const Active: Story = { args: dropdownExamples.Active };
export const Filled: Story = { args: dropdownExamples.Filled };
export const Disabled: Story = { args: dropdownExamples.Disabled };
export const Opened: Story = { args: dropdownExamples.Opened };


