import { useReducer, useState } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import { each, mapValues } from 'lodash-es';

export type CustomRuleFunc = ({ getFieldValue }) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;

interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: any[];
}
interface FieldsState {
  [key: string]: FieldDetail;
}
export interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}
export interface FormState {
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, ValidateError[]>;
}
interface FieldsAction {
  type: 'addFiled' | 'updateValue' | 'updateValidateResult';
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
    case 'updateValidateResult':
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      };
    default:
      return state;
  }
}
function useStore(initialValues?: Record<string, any>) {
  // form State
  const [form, setForm] = useState<FormState>({ isValid: true, isSubmitting: false, errors: {} });
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value;
  };
  const getFieldsValue = () => {
    return mapValues(fields, item => item.value)
  }
  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({ type: 'updateValue', name, value })
    }
  }
  const resetFields = () => {
    if (initialValues) {
      each(initialValues, (value, name) => {
        if (fields[name]) {
          dispatch({ type: 'updateValue', name, value})
        }
      })
    }
  }
  const transformRules = (rules: CustomRule[]) => {
    return rules.map(rule => {
      if (typeof rule === 'function') {
        const calledRule = rule({ getFieldValue });
        return calledRule;
      } else {
        return rule;
      }
    });
  };
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const afterRules = transformRules(rules);
    const descriptor = {
      [name]: afterRules,
    };
    const valueMap = {
      [name]: value,
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as any;
      console.log('e', e);
      errors = err.errors;
    } finally {
      console.log('errors', isValid);
      dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } });
    }
  };
  const validateAllFields = async () => {
    let isValid = true
    let errors: Record<string, ValidateError[]> = {}
    const valueMap = mapValues(fields, item => item.value)
    const descriptor = mapValues(fields, item => transformRules(item.rules))
    const validator = new Schema(descriptor)
    setForm({ ...form, isSubmitting: true })
    try {
      await validator.validate(valueMap)
    } catch(e) {
      isValid = false
      const err = e as ValidateErrorType
      errors = err.fields
      each(fields, (value, name) => {
        // errors 中有对应的 key
        if (errors[name]) {
          const itemErrors = errors[name]
          dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: itemErrors }})
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] }})
        }
        //  有对应的 rules，并且没有 errors
      })
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors })
      return {
        isValid,
        errors,
        values: valueMap
      }
    }
  }
  return {
    fields,
    dispatch,
    form,
    validateField,
    getFieldValue,
    validateAllFields,
    getFieldsValue,
    setFieldValue,
    resetFields
  };
}

export default useStore;
