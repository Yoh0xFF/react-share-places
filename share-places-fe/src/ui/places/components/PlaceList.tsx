import React from 'react';

import './PlaceList.css';

import { Place } from '@app/type/place';
import PlaceItem from '@app/ui/places/components/PlaceItem';
import Button from '@app/ui/shared/components/form-elements/Button';
import Card from '@app/ui/shared/components/ui-elements/Card';

export interface PlaceListProps {
  places: Array<Place>;
  onDelete: (placeId: string) => void;
}

export default function PlaceList(props: PlaceListProps): JSX.Element {
  if (!props.places.length) {
    return (
      <div className='center'>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {props.places.map((place) => (
        <PlaceItem key={place.id} place={place} onDelete={props.onDelete} />
      ))}
    </ul>
  );
}
