import React, { FormEvent } from 'react';

import './PlaceForm.css';

import Button from '@app/ui/shared/components/form-elements/Button';
import Input from '@app/ui/shared/components/form-elements/Input';
import { useForm } from '@app/ui/shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '@app/ui/shared/util/validators';

export default function NewPlace(): JSX.Element {
  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: true },
      description: { value: '', isValid: true },
      address: { value: '', isValid: true },
    },
    true
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
