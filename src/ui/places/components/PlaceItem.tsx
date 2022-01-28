import React from 'react';

import './PlaceItem.css';

import { Place } from '@app/type/place';
import Button from '@app/ui/shared/components/form-elements/Button';
import Card from '@app/ui/shared/components/ui-elements/Card';

interface PlaceItemProps {
  place: Place;
}

export default function PlaceItem(props: PlaceItemProps): JSX.Element {
  const { place } = props;

  return (
    <li className='place-item'>
      <Card className='place-item__content'>
        <div className='place-item__image'>
          <img src={place.imageUrl} alt={place.title} />
        </div>

        <div className='place-item__info'>
          <h2>{place.title}</h2>
          <h3>{place.address}</h3>
          <p>{place.description}</p>
        </div>

        <div className='place-item__actions'>
          <Button inverse>VIEW ON MAP</Button>
          <Button to={`/places/${place.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
}
