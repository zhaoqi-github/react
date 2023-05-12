import React, { FC, ReactNode } from 'react'
import useStore from './useStore';
export interface FormProps {
  name?: string;
  children?: ReactNode
}

export const Form: FC<FormProps> = (props) => {
  const { name, children } = props
  const { form, fields, dispatch } = useStore()

  return (
    <>
      <form name={name} className='form'>
        {children}
      </form>
      <pre>{JSON.stringify(fields)}</pre>
      <pre>{JSON.stringify(form)}</pre>
    </>
  )
}

Form.defaultProps = {
  name: 'form'
}

export default Form