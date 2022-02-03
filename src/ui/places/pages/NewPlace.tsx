import React, { FormEvent, useCallback, useReducer } from 'react';

import './NewPlace.css';

import Button from '@app/ui/shared/components/form-elements/Button';
import Input from '@app/ui/shared/components/form-elements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '@app/ui/shared/util/validators';

interface InputState {
  value: string;
  isValid: boolean;
}

interface FormState {
  inputs: {
    [key: string]: InputState;
  };
  isValid: boolean;
}

interface FormAction {
  type: 'INPUT_CHANGE';
  inputId: string;
  value: string;
  isValid: boolean;
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      let inputId: keyof typeof state.inputs;
      for (inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
}

export default function NewPlace(): JSX.Element {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
    },
    isValid: true,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        inputId: id,
        value: value,
        isValid: isValid,
      });
    },
    []
  );

  const placeSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input
        element='input'
        id='title'
        type='text'
        label='Title'
        errorText='Please enter a valid title.'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />

      <Input
        element='textarea'
        id='description'
        label='Description'
        errorText='Please enter a valid description (at least 5 characters).'
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />

      <Input
        element='input'
        id='address'
        type='text'
        label='Address'
        errorText='Please enter a valid address.'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />

      <Button type='submit' disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
}
