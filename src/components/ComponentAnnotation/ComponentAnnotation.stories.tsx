import type { Meta, StoryObj } from '@storybook/preact-vite';
import { ComponentAnnotation } from './ComponentAnnotation';
import { componentAnnotationExamples } from './ComponentAnnotation.examples';

const meta: Meta<typeof ComponentAnnotation> = {
  title: 'Components/ComponentAnnotation',
  component: ComponentAnnotation,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'radio', options: ['Left', 'Right', 'Up', 'Down'] },
    label: { control: 'text' },
  },
  args: {
    ...componentAnnotationExamples.Left,
  },
};

export default meta;
type Story = StoryObj<typeof ComponentAnnotation>;

export const Left: Story = { args: componentAnnotationExamples.Left };
export const Right: Story = { args: componentAnnotationExamples.Right };
export const Down: Story = { args: componentAnnotationExamples.Down };
export const Up: Story = { args: componentAnnotationExamples.Up };



