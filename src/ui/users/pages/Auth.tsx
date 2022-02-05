import React, { FormEvent, useState } from 'react';

import './Auth.css';

import Button from '@app/ui/shared/components/form-elements/Button';
import Input from '@app/ui/shared/components/form-elements/Input';
import Card from '@app/ui/shared/components/ui-elements/Card';
import { useForm } from '@app/ui/shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '@app/ui/shared/util/validators';

export default function Auth(): JSX.Element {
  const [isLoginMode, setLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const toggleMode = () => {
    if (!isLoginMode) {
      const { name, ...otherInputs } = formState.inputs;
      setFormData(
        {
          ...otherInputs,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: '', isValid: false },
        },
        false
      );
    }

    setLoginMode((prevState) => !prevState);
  };

  return (
    <Card className='authentication'>
      <h2>Login Required</h2>
      <hr />
      <form className='auth-form' onSubmit={formSubmitHandler}>
        {!isLoginMode && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Your Name'
            errorText='Please enter your name.'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        )}

        <Input
          element='input'
          id='email'
          type='email'
          label='E-Mail'
          errorText='Please enter a valid email.'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />

        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          errorText='Please enter a valid password (at least 5 characters).'
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />

        <Button type='submit' disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>

      <Button inverse onClick={toggleMode}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
}
