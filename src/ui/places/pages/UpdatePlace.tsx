import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PlaceForm.css';

import { fakePlaces } from '@app/fake-data/places-data';
import Button from '@app/ui/shared/components/form-elements/Button';
import Input from '@app/ui/shared/components/form-elements/Input';
import Card from '@app/ui/shared/components/ui-elements/Card';
import { useForm } from '@app/ui/shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '@app/ui/shared/util/validators';

export default function UpdatePlace(): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const params = useParams();
  const placeId = params.placeId ? parseInt(params.placeId, 10) : 0;

  const placeSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  const place = fakePlaces.find((x) => x.id === placeId);

  useEffect(() => {
    if (!place) {
      return;
    }

    setFormData(
      {
        title: { value: place.title, isValid: true },
        description: { value: place.description, isValid: true },
      },
      true
    );

    setLoading(false);
  }, [setFormData, place]);

  if (!place) {
    return (
      <div className='center'>
        <Card>
          <div className='content-padding'>
            <h2>Couldn't find the place!</h2>
          </div>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input
        element='input'
        id='title'
        type='text'
        label='Title'
        errorText='Please enter a valid title.'
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        onInput={inputHandler}
      />

      <Input
        element='textarea'
        id='description'
        label='Description'
        errorText='Please enter a valid description (at least 5 characters).'
        validators={[VALIDATOR_MINLENGTH(5)]}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
        onInput={inputHandler}
      />

      <Button type='submit' disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}
