import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import Button from './button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
}
export default meta

type Story = StoryObj<typeof Button>;
export const ADefault: Story = {
  args: {
    children: 'Default Button',
  },
  name: '默认按钮样式'
}

/* const ListTemplate: Story = {
  render: (args) => {
    return (
      <Button {...args}> large button </Button>
    );
  },
};
export const Large = {
  ...ListTemplate,
  args: {
    size: 'lg',
    children: 'Large Button',
  }
}
export const Small = {
  ...ListTemplate,
  args: {
    size: 'sm',
    children: 'Small Button',
  }
} */

export const BButtonWithSize: Story = {
  render: () => (
    <>
      <Button size="lg"> large button </Button>
      <Button size="sm"> small button </Button>
    </>
  ),
  name: '不同尺寸的按钮'
}

export const CButtonWithType: Story = {
  render: () => (
    <>
      <Button btnType="primary"> primary button </Button>
      <Button btnType="danger"> danger button </Button>
      <Button btnType="link" href="https://google.com"> link button </Button>
    </>
  ),
  name: '不同类型的按钮'
}