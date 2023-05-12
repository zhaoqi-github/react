import classNames from "classnames";
import React, { FC, ReactNode, useContext, useEffect } from "react";
import { FormContext } from "./form";
import { RuleItem } from 'async-validator';
// Required<Pick<T, K>> : 从 T 里面 取出某些 K, 设置成必选
// Omit<T, K> : T 中除了 K 之外的
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
// type TestType = SomeRequired<FormItemProps, 'getValueFromEvent'>
export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode,
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (event: any) => any;
  rules?: RuleItem[];
  validateTrigger?: string
}

export const FormItem: FC<FormItemProps> = (props) => {
  const {
    label,
    name,
    children,
    valuePropName,
    trigger,
    getValueFromEvent,
    rules,
    validateTrigger
  } = props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext)
  const rowClass = classNames('row', {
    'row-no-label': !label
  })

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || ''
    dispatch({
      type: 'addFiled',
      name,
      value: { label, name, value, rules, isValid: true }
    })
  }, [])

  // 受控组件
  // 获取 store 对应的 value 
  const filedState = fields[name]
  const value = filedState && filedState.value
  const errors = filedState && filedState.errors
  const isRequired = rules?.some(rule => rule.required)
  const hasError = errors && errors.length > 0
  const labelClass = classNames({
    'form-item-required': isRequired
  })
  const itemClass = classNames(' form-item-control', {
    'form-item-has-error': hasError
  })
  // value 和 onChange 放到 FormItem 包裹的表单组件上
  // 1. 手动创建属性列表，包含 value 和 onChange 属性
  const onValueChange = (e: any) => {
    const value = getValueFromEvent(e);
    console.log('onValueChange', value);
    dispatch({ type: 'updateValue', name, value })
  }
  const onValueValidate = async () => {
    await validateField(name)
  }
  const controlProps: Record<string, any> = {}
  // valuePropName!: 非空断言, 断言值不为空或未定义
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueChange
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }
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
  if (!React.isValidElement(childList[0])) {
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
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      }
      <div className="form-item">
        <div className={itemClass}>
          {returnChildNode}
        </div>
        { hasError && 
          <div className='form-item-explain'>
            <span>{errors[0].message}</span>
          </div>
        }
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  getValueFromEvent: (e) => e.target.value,
  validateTrigger: 'onBlur'
}
export default FormItem