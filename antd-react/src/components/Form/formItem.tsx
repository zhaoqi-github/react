import classNames from "classnames";
import { FC, ReactNode, useContext, useEffect } from "react";
import { FormContext } from "./form";

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { label, name, children } = props
  const { dispatch } = useContext(FormContext)
  const rowClass = classNames('row', {
    'row-no-label': !label
  })

  useEffect(() => {
    dispatch({
      type: 'addFiled',
      name,
      value: {label, name}
    })
  }, [])
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