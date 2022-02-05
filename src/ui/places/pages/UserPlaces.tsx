import React from 'react';
import { useParams } from 'react-router-dom';

import { fakePlaces } from '@app/fake-data/places-data';
import { Place } from '@app/type/place';
import PlaceList from '@app/ui/places/components/PlaceList';

export default function UserPlaces(): JSX.Element {
  const params = useParams();
  const userId = params.userId ? parseInt(params.userId, 10) : 0;

  const places: Array<Place> = fakePlaces.filter((x) => x.creator === userId);

  return <PlaceList items={places} />;
}
