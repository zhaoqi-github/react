import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import Input from './input'

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
}
export default meta

type Story = StoryObj<typeof Input>;

const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} onChange={(e) => { setValue(e.target.value) }} />
}
export const defaultInput: Story = {
  render: () => {
    return (
      <>
        <Input placeholder='placeholder' onChange={action('changed')} />
        <ControlledInput />
      </>
    )
  },
  name: '默认Form'
}

export const disabledInput: Story = {
  render: () => {
    return (
      <>
        <Input placeholder='disabled input' disabled />
      </>
    )
  },
  name: '禁止Form'
}