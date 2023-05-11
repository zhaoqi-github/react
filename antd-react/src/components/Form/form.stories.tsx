import React, { useRef } from 'react'
import Form from './form'
import Item from './formItem'
// import Input from '../Input'
// import Button from '../Button'
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Form> = {
  title: 'Form',
  id: 'Form',
  component: Form,
  decorators: [
    (Story) => (
      <div style={{ width: '550px' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
}
export default meta;

type Story = StoryObj<typeof Form>
/* export const BasicForm: Story = {
  render: () => {
    return (
      <Form>
        <Item label='username'>
          <Input />
        </Item>
        <Item label='password'>
          <Input type='password' />
        </Item>
        <Item>
          <Input />
        </Item>
        <div className='form-submit-area'>
          <Button type="submit" btnType='primary'></Button>
        </div>
      </Form>
    )
  }
} */