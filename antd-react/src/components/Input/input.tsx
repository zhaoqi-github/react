import React, { InputHTMLAttributes, ReactElement, FC, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm'
/* export interface BaseInputProps {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prefix?: string | ReactElement;
  append?: string | ReactElement
}
type InputProps = BaseInputProps & InputHTMLAttributes<HTMLElement> */

// Omit 忽略 InputHTMLAttributes 中的 ’size‘
export interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<BaseInputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props

  // 根据属性计算不用的 className
  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  if('value' in props){
    delete restProps.defaultValue
  }

  return (
    // 根据属性判断是否要添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
        className="input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

export default Input