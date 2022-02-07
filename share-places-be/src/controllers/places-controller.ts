import { Request, Response } from 'express';

import { AppError } from '../models/error';
import { Place } from '../models/place';

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

export function getPlaceById(req: Request, res: Response) {
  const placeIdStr = req.params.placeId;
  const placeId =
    placeIdStr && !isNaN(+placeIdStr) ? parseInt(placeIdStr, 10) : 0;

  const place = fakePlaces.find((x) => x.id === placeId);

  if (!place) {
    throw new AppError(404, `Place with id ${placeId}, Not found!`);
  }

  res.send(place);
}

export function getPacesByUserId(req: Request, res: Response) {
  const userIdStr = req.params.userId;
  const userId = userIdStr && !isNaN(+userIdStr) ? parseInt(userIdStr, 10) : 0;

  const places = fakePlaces.filter((x) => x.id === userId);

  res.send(places);
}

export function createPlace(req: Request, res: Response) {}
