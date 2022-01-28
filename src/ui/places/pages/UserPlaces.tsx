import React from 'react';
import { useParams } from 'react-router-dom';

import { Place } from '@app/type/place';
import PlaceList from '@app/ui/places/components/PlaceList';

const data: Array<Place> = [
  {
    id: 1,
    creator: 1,
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the wordl!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/500px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lgt: -73.9878531,
    },
  },
  {
    id: 2,
    creator: 2,
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the wordl!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/500px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lgt: -73.9878531,
    },
  },
];

export default function UserPlaces(): JSX.Element {
  const params = useParams();
  const userId = params.userId ? parseInt(params.userId, 10) : 0;

  const places: Array<Place> = data.filter((x) => x.creator == userId);

  return <PlaceList items={places} />;
}
