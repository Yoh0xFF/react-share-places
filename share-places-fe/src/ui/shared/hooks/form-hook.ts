import { useCallback, useReducer } from 'react';

interface InputState {
  value: string;
  isValid: boolean;
}

interface InputsState {
  [key: string]: InputState;
}

interface FormState {
  inputs: InputsState;
  isValid: boolean;
}

type Action =
  | { type: 'INPUT_CHANGE'; inputId: string; value: string; isValid: boolean }
  | { type: 'SET_DATA'; inputs: InputsState; isValid: boolean };

function formReducer(state: FormState, action: Action): FormState {
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
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
}

type InputHandlerType = (id: string, value: string, isValid: boolean) => void;
type SetDataHandlerType = (inputs: InputsState, isValid: boolean) => void;

export function useForm(
  inputsState: InputsState,
  valid: boolean
): [FormState, InputHandlerType, SetDataHandlerType] {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: inputsState,
    isValid: valid,
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

  const setFormData = useCallback((inputs: InputsState, isValid: boolean) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputs,
      isValid: isValid,
    });
  }, []);

  return [formState, inputHandler, setFormData];
}
