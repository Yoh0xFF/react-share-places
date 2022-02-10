import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PlaceForm.css';

import Button from '@app/ui/shared/components/form-elements/Button';
import Input from '@app/ui/shared/components/form-elements/Input';
import ErrorModal from '@app/ui/shared/components/ui-elements/ErrorModal';
import LoadingSpinner from '@app/ui/shared/components/ui-elements/LoadingSpinner';
import { AuthContext } from '@app/ui/shared/context/auth-context';
import { useForm } from '@app/ui/shared/hooks/form-hook';
import { useHttpClient } from '@app/ui/shared/hooks/http-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '@app/ui/shared/util/validators';

export default function NewPlace(): JSX.Element {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      imageUrl: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );

  useEffect(() => {
    if (isSaved) {
      navigate('/');
    }
  }, [isSaved, auth, navigate]);

  const placeSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await sendRequest(
        'http://localhost:8080/api/places',
        'POST',
        JSON.stringify({
          creator: auth.userId,
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          imageUrl: formState.inputs.imageUrl.value,
          address: formState.inputs.address.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      setIsSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
          id='imageUrl'
          type='text'
          label='ImageURL'
          errorText='Please enter a valid image url.'
          validators={[VALIDATOR_REQUIRE()]}
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
    </>
  );
}
