import React, { FormEvent } from 'react';

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
  const [formState, inputHandler] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const authHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className='authentication'>
      <h2>Login Required</h2>
      <hr />
      <form className='auth-form' onSubmit={authHandler}>
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
          LOGIN
        </Button>
      </form>
    </Card>
  );
}
