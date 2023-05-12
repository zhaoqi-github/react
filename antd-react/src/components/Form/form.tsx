import { FC, ReactNode, createContext } from 'react'
import useStore from './useStore';
export interface FormProps {
  name?: string;
  initialValues?: Record<string, any>;
  children?: ReactNode
}

/* export type IFormContext = ReturnType<typeof useStore>
type IFormContext = {
  fields: FieldsState;
  dispatch: React.Dispatch<FieldsAction>;
  form: FormState;
} */
export type IFormContext =
  Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields'>
  & Pick<FormProps, 'initialValues'>

export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = (props) => {
  const { name, initialValues, children } = props
  const { form, fields, dispatch } = useStore()
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues
  }
  return (
    <>
      <form name={name} className='form'>
        <FormContext.Provider value={passedContext}>
          {children}
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