import express, { Router } from 'express';

import { Place } from '@app/type/place';

const router = Router();

const fakePlaces: Array<Place> = [
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
      lng: -73.9878531,
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
      lng: -73.9878531,
    },
  },
];

router.get('/:placeId', (req, res) => {
  const placeIdStr = req.params.placeId;
  const placeId = placeIdStr ? parseInt(placeIdStr, 10) : 0;

  const place = fakePlaces.find((x) => x.id === placeId);

  if (place) {
    res.send(place);
  } else {
    res.status(404).send({});
  }
});

export default router;
