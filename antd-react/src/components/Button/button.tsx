import React from 'react';
import classnames from 'classnames';

/* export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
} */
export type ButtonSize = 'lg' | 'sm'

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
// Partial将属性设置为可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, children, href, ...restPops } = props;

  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled
  })

  if (btnType === 'link') {
    return (
      <a className={classes} href={href} {...restPops}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled {...restPops}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button;