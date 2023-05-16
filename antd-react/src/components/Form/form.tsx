import { FC, ReactNode, createContext } from 'react'
// import { ValidateError } from 'async-validator'
import useStore, { FormState } from './useStore';
import { ValidateError } from 'async-validator';
export type RenderProps = (form: FormState) => ReactNode
export interface FormProps {
  /**表单名称，会作为表单字段 id 前缀使用 */
  name?: string;
  /**表单默认值，只有初始化以及重置时生效 */
  initialValues?: Record<string, any>;
  children?: ReactNode | RenderProps;
  /**提交表单且数据验证成功后回调事件 */
  onFinish?: (values: Record<string, any>) => void;
  /**提交表单且数据验证失败后回调事件 */
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}

/* export type IFormContext = ReturnType<typeof useStore>
type IFormContext = {
  fields: FieldsState;
  dispatch: React.Dispatch<FieldsAction>;
  form: FormState;
} */
export type IFormContext =
  Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'>
  & Pick<FormProps, 'initialValues'>

export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = (props) => {
  const { name, initialValues, children, onFinish, onFinishFailed } = props
  const { form, fields, validateField, validateAllFields, dispatch } = useStore()
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField
  }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const { isValid, errors, values } = await validateAllFields()
    if (isValid && onFinish) {
      onFinish(values)
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors)
    }
  }
  let childrenNode: ReactNode
  if (typeof children === 'function') {
    childrenNode = children(form)
  } else {
    childrenNode = children
  }
  return (
    <>
      <form name={name} className='form' onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>
          {childrenNode}
        </FormContext.Provider>
      </form>
      <pre style={{ 'whiteSpace': 'pre-wrap' }}>{JSON.stringify(fields)}</pre>
      <pre style={{ 'whiteSpace': 'pre-wrap' }}>{JSON.stringify(form)}</pre>
    </>
  )
}

Form.defaultProps = {
  name: 'form'
}

export default Form