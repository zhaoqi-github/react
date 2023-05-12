import React, { useRef } from 'react'
import Form from './form'
import Item from './formItem'
// import Input from '../Input'
// import Button from '../Button'
import type { Meta, StoryObj } from '@storybook/react';
import Input from '../Input/input';
import Button from '../Button/button';

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
export const BasicForm: Story = {
  render: () => {
    return (
      <Form>
        <Item label='username' name='username'>
          <Input />
        </Item>
        <Item label='password' name='password'>
          <Input type='password' />
        </Item>
        <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <Item
            name='agreement'
            valuePropName='checked'
            getValueFromEvent={(e)=>e.target.checked}
          >
            <input type="checkbox" />
          </Item>
          <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
        </div>
        <div className='form-submit-area'>
          <Button type="submit" btnType='primary'>submit</Button>
        </div>
      </Form>
    )
  }
}