import classNames from "classnames";
import React, { FC, ReactNode, useContext, useEffect } from "react";
import { FormContext } from "./form";

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode,
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (event: any) => any;
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { label, name, children, valuePropName, trigger, getValueFromEvent } = props
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
  // value 和 onChange 放到 FormItem 包裹的表单组件上
  // 1. 手动创建属性列表，包含 value 和 onChange 属性
  const onValueChange = (e: any) => {
    const value = getValueFromEvent && getValueFromEvent(e);
    console.log('onValueChange', value);
    dispatch({ type: 'updateValue', name, value })
  }
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName!] = value // '!': 非空断言, 断言值不为空或未定义
  controlProps[trigger!] = onValueChange
  // 2. 获取 children 数组的第一个元素
  const childList = React.Children.toArray(children)
  // 没有子组件
  if (childList.length === 0) {
    console.error('No child element found in Form.Item, please provide one form component')
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn('Only support one child element in Form.Item, others will be omitted')
  }
  // 不是 ReactElement 的子组件
  if(!React.isValidElement(childList[0])){
    console.error('Child component is not a valid React Element')
  }
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

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  getValueFromEvent: (e) => e.target.value
}
export default FormItem