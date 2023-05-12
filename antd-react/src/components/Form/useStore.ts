import { useReducer, useState } from 'react';

interface FieldDetail {
  name: string;
  value: string;
  rules: string[];
  isValid: boolean;
}
interface FieldsState {
  [key: string]: FieldDetail;
}
interface FormState {
  isValid: boolean;
}
interface FieldsAction {
  type: 'addFiled' | 'updateValue';
  name: string;
  value: any;
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addFiled':
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    default:
      return state;
  }
}
function useStore() {
  // form State
  const [form, setForm] = useState<FormState>({ isValid: true });
  const [fields, dispatch] = useReducer(fieldsReducer, {});

  return {
    fields,
    dispatch,
    form,
  };
}

export default useStore;
