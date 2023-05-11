import classNames from "classnames";
import React, { FC, ReactNode } from "react";

export interface FormItemProps {
  label?: string;
  children?: ReactNode
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { label, children } = props
  const rowClass = classNames('row', {
    'row-no-label': !label
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
        {children}
      </div>
    </div>
  )
}

export default FormItem