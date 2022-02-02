import React, { ChangeEvent, useEffect, useReducer } from 'react';

import './Input.css';

import { ValidatorType, validate } from '@app/ui/shared/util/validators';

interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

interface InputAction {
  type: 'CHANGE' | 'TOUCH';
  value?: string;
  validators?: Array<ValidatorType>;
}

function inputReducer(state: InputState, action: InputAction): InputState {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value ? action.value : '',
        isValid: validate(
          action.value ? action.value : '',
          action.validators ? action.validators : []
        ),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

interface InputProps {
  element: 'input' | 'textarea';

  id: string;
  label: string;
  placeholder?: string;
  errorText?: string;
  validators?: Array<ValidatorType>;

  type?: string;
  rows?: number;

  onInput?: (id: string, value: string, isValid: boolean) => void;
}

export default function Input(props: InputProps): JSX.Element {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput && onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: props.validators ? props.validators : [],
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
