import React, { FormEvent, useContext, useState } from 'react';

import './Auth.css';

import Button from '@app/ui/shared/components/form-elements/Button';
import Input from '@app/ui/shared/components/form-elements/Input';
import Card from '@app/ui/shared/components/ui-elements/Card';
import ErrorModal from '@app/ui/shared/components/ui-elements/ErrorModal';
import LoadingSpinner from '@app/ui/shared/components/ui-elements/LoadingSpinner';
import { AuthContext } from '@app/ui/shared/context/auth-context';
import { useForm } from '@app/ui/shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '@app/ui/shared/util/validators';

export default function Auth(): JSX.Element {
  const auth = useContext(AuthContext);
  const [isLoginMode, setLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        setIsLoading(true);

        const response = await fetch('http://localhost:8080/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        auth.login();
      } catch (error: any) {
        setError(error.message || 'Something went wrong, please try again');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleModeHandler = () => {
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

  const errorHandler = () => {
    setError(undefined);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}

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

        <Button inverse onClick={toggleModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </>
  );
}
