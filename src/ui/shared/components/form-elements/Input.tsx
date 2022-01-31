import React, { ChangeEvent, useReducer } from 'react';

import './Input.css';

interface InputState {
  value: string;
  isValid: boolean;
}

interface InputAction {
  type: 'CHANGE';
  value?: string;
}

function inputReducer(state: InputState, action: InputAction): InputState {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value ? action.value : '',
        isValid: true,
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

  type?: string;
  rows?: number;
}

export default function Input(props: InputProps): JSX.Element {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  });

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: 'CHANGE', value: event.target.value });
  };
  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
}
