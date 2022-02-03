import React from 'react';

import './PlaceList.css';

import { Place } from '@app/type/place';
import PlaceItem from '@app/ui/places/components/PlaceItem';
import Card from '@app/ui/shared/components/ui-elements/Card';

interface PlaceListProps {
  items: Array<Place>;
}

export default function PlaceList(props: PlaceListProps): JSX.Element {
  if (!props.items.length) {
    return (
      <div className='center'>
        <Card>
          <div className='place-list-empty'>
            <h2>No places found. Maybe create one?</h2>
            <button>Share Place</button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {props.items.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  );
}
