import React, { useRef } from 'react'
import Form, { IFormRef } from './form'
import Item from './formItem'
// import Input from '../Input'
// import Button from '../Button'
import type { Meta, StoryObj } from '@storybook/react';
import Input from '../Input/input';
import Button from '../Button/button';
import { CustomRule } from './useStore';

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
  render: (args) => {
    return (
      <Form initialValues={{ username: 'test', agreement: true }} {...args} >
        <Item label='username' name='username' rules={[{ type: 'email', required: true }]}>
          <Input />
        </Item>
        <Item label='password' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
          <Input type='password' />
        </Item>
        <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <Item
            name='agreement'
            valuePropName='checked'
            getValueFromEvent={(e) => e.target.checked}
            rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
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
const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      // 用户可以调用 getFieldValue(field) 来获取表单的其他 field 值
      /* console.log('the value', getFieldValue('password'))
      console.log(value) */
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })

    }
  })
]
export const ConfirmPasswordForm: Story = {
  render: (args) => {
    return (
      <Form initialValues={{ username: 'test', agreement: true }} {...args}>
        <Item label='username' name='username' rules={[{ type: 'email', required: true }]}>
          <Input />
        </Item>
        <Item label='password' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
          <Input type='password' />
        </Item>
        <Item label='confirm password' name='confirmPassword' rules={confirmRules}>
          <Input type='password' />
        </Item>
        <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <Item
            name='agreement'
            valuePropName='checked'
            getValueFromEvent={(e) => e.target.checked}
            rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
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

export const CustomUIForm: Story = {
  render: (args) => {
    return (
      <Form initialValues={{ username: 'test', agreement: true }} {...args}>
        {({ isSubmitting, isValid }) => (
          <>
            <Item label='username' name='username' rules={[{ type: 'email', required: true }]}>
              <Input />
            </Item>
            <Item label='password' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
              <Input type='password' />
            </Item>
            <Item label='confirm password' name='confirmPassword' rules={confirmRules}>
              <Input type='password' />
            </Item>
            <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
              <Item
                name='agreement'
                valuePropName='checked'
                getValueFromEvent={(e) => e.target.checked}
                rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
              >
                <input type="checkbox" />
              </Item>
              <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
            </div>
            <div className='form-submit-area'>
              <Button type="submit" btnType='primary'>登陆 {isSubmitting ? '验证中' : '验证完毕'} {isValid ? '通过😄' : '没通过😢'} </Button>
            </div>
          </>
        )}
      </Form>
    )
  }
}

export const ResetForm = (args) => {
  const ref = useRef<IFormRef>(null)
  const resetAll = () => {
    console.log('form ref', ref.current)
    console.log('get value', ref.current?.getFieldValue('username'))
    ref.current?.resetFields();
  }
  return (
    <Form initialValues={{ username: 'test', agreement: true, password: '' }} {...args} ref={ref}>
      <Item label='username' name='username' rules={[{ type: 'email', required: true }]}>
        <Input />
      </Item>
      <Item label='password' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
        <Input type='password' />
      </Item>
      <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
        <Item
          name='agreement'
          valuePropName='checked'
          getValueFromEvent={(e) => e.target.checked}
          rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
        >
          <input type="checkbox" />
        </Item>
        <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
      </div>
      <div className='form-submit-area'>
        <Button type="submit" btnType='primary'>submit</Button>
        <Button type="button" onClick={resetAll}>重置</Button>
      </div>
    </Form>
  )
}