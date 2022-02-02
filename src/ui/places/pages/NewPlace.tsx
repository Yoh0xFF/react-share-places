import React, { useCallback } from 'react';

import './NewPlace.css';

import Input from '@app/ui/shared/components/form-elements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '@app/ui/shared/util/validators';

interface NewPlaceProps {}

export default function NewPlace(props: NewPlaceProps): JSX.Element {
  const titleInputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {},
    []
  );

  const descriptionInputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {},
    []
  );

  return (
    <form className='place-form'>
      <Input
        element='input'
        id='title'
        type='text'
        label='Title'
        errorText='Please enter a valid title'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={titleInputHandler}
      />

      <Input
        element='textarea'
        id='description'
        label='Description'
        errorText='Please enter a valid description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={descriptionInputHandler}
      />
    </form>
  );
}
