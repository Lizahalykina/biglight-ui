import type { Meta, StoryObj } from '@storybook/preact-vite';
import { fn } from 'storybook/test';
import { LoginDrawer } from './LoginDrawer';
import { loginDrawerExamples } from './LoginDrawer.examples';

const meta: Meta<typeof LoginDrawer> = {
  title: 'Components/LoginDrawer',
  component: LoginDrawer,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['desktop', 'mobile'] },
  },
  args: {
    variant: 'desktop',
  },
};

export default meta;
type Story = StoryObj<typeof LoginDrawer>;

export const Desktop: Story = {
  args: loginDrawerExamples.Desktop,
  render: (args) => {
    return (
      <LoginDrawer {...args} open={true} mode="embedded" onClose={fn()} />
    );
  },
};

export const Mobile: Story = {
  args: loginDrawerExamples.Mobile,
  render: (args) => {
    return (
      <LoginDrawer {...args} open={true} mode="embedded" onClose={fn()} />
    );
  },
};

export const Business: Story = {
  args: loginDrawerExamples.Business,
  render: (args) => {
    return (
      <LoginDrawer {...args} open={true} mode="embedded" onClose={fn()} />
    );
  },
};


