import React from 'react';

import './NewPlace.css';

import Input from '@app/ui/shared/components/form-elements/Input';

interface NewPlaceProps {}

export default function NewPlace(props: NewPlaceProps): JSX.Element {
  return (
    <form className='place-form'>
      <Input
        element='input'
        id='title'
        type='text'
        label='Title'
        errorText='Please enter a valid title'
      />
    </form>
  );
}
