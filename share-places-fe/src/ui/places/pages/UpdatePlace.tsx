import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './PlaceForm.css';

import { Place } from '@app/type/place';
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

export default function UpdatePlace(): JSX.Element {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { placeId } = useParams();
  const [place, setPlace] = useState<Place>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/places/${placeId}`
        );

        setPlace(responseData.place);

        setFormData(
          {
            title: { value: responseData.place.title, isValid: true },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlace();
  }, [sendRequest, setFormData, placeId]);

  useEffect(() => {
    if (isSaved) {
      navigate(`/${auth.userId}/places`);
    }
  }, [isSaved, auth, navigate]);

  const placeSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        }
      );

      setIsSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading && !error) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && place && (
        <form className='place-form' onSubmit={placeSubmitHandler}>
          <Input
            element='input'
            id='title'
            type='text'
            label='Title'
            errorText='Please enter a valid title.'
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={place.title}
            initialValid={true}
            onInput={inputHandler}
          />

          <Input
            element='textarea'
            id='description'
            label='Description'
            errorText='Please enter a valid description (at least 5 characters).'
            validators={[VALIDATOR_MINLENGTH(5)]}
            initialValue={place.description}
            initialValid={true}
            onInput={inputHandler}
          />

          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}
