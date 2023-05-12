import classNames from "classnames";
import React, { FC, ReactNode, useContext, useEffect } from "react";
import { FormContext } from "./form";

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { label, name, children } = props
  const { dispatch, fields } = useContext(FormContext)
  const rowClass = classNames('row', {
    'row-no-label': !label
  })

  useEffect(() => {
    dispatch({
      type: 'addFiled',
      name,
      value: { label, name, value: '' }
    })
  }, [])

  // 受控组件
  // 获取 store 对应的 value 
  const filedState = fields[name]
  const value = filedState && filedState.value
  // 1. 手动创建属性列表，包含 value 和 onChange 属性
  const onValueChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    dispatch({ type: 'updateValue', name, value })
  }
  const controlProps: Record<string, any> = {}
  controlProps.value = value
  controlProps.onChange = onValueChange
  // 2. 获取 children 数组的第一个元素
  const childList = React.Children.toArray(children)
  const child = childList[0] as React.ReactElement
  // 3. cloneElement 混合 child 以及 手动创建的属性列表
  const returnChildNode = React.cloneElement(child, {
    ...child.props, ...controlProps
  })
  return (
    <div className={rowClass}>
      {label &&
        <div className="form-item-label">
          <label title={label}>
            {label}
          </label>
        </div>
      }
      <div className="form-item">
        {returnChildNode}
      </div>
    </div>
  )
}

export default FormItem