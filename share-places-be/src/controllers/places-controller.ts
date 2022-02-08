import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';

import { AppError } from '../models/error';
import { Place } from '../models/place';
import { getCoordinatesForAddress } from '../utils/location';

let fakePlaces: Array<Place> = [
  {
    id: 'b2e0955d-1e4d-45e4-870d-414df6c4bb95',
    creator: '8ca36ac7-7eeb-4c74-b7f7-56de5e683664',
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
    id: 'c492646d-a0ff-4e8c-8bea-0e8c07ad85b2',
    creator: '8ca36ac7-7eeb-4c74-b7f7-56de5e683664',
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
  const placeId = req.params.placeId;

  const place = fakePlaces.find((x) => x.id === placeId);

  if (!place) {
    throw new AppError(404, `Place with id ${placeId}, Not found!`);
  }

  res.send({ place });
}

export function getPacesByUserId(req: Request, res: Response) {
  const userId = req.params.userId;

  const places = fakePlaces.filter((x) => x.id === userId);

  res.send({ places });
}

export async function createPlace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new AppError(422, 'Invalid inputs!'));
  }

  const {
    creator,
    title,
    imageUrl,
    description,
    address,
  }: {
    creator: string;
    title: string;
    imageUrl: string;
    description: string;
    address: string;
  } = req.body;

  let location;
  try {
    location = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const newPlace: Place = {
    id: uuid(),
    creator,
    title,
    imageUrl,
    description,
    address,
    location,
  };

  fakePlaces.push(newPlace);

  res.status(201).send({ place: newPlace });
}

export function updatePlace(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new AppError(422, 'Invalid inputs!');
  }

  const placeId = req.params.placeId;

  const {
    title,
    description,
  }: {
    title: string;
    description: string;
  } = req.body;

  const place = fakePlaces.find((x) => x.id === placeId);
  const placeIndex = fakePlaces.findIndex((x) => x.id === placeId);
  if (!place) {
    throw new AppError(404, `Place with id ${placeId}, Not found!`);
  }

  const updatedPlace = { ...place };
  updatedPlace.title = title;
  updatedPlace.description = description;
  fakePlaces[placeIndex] = updatedPlace;

  res.status(200).send({ place: updatedPlace });
}

export function deletePlace(req: Request, res: Response) {
  const placeId = req.params.placeId;

  const place = fakePlaces.find((x) => x.id === placeId);
  if (!place) {
    throw new AppError(404, `Place with id ${placeId}, Not found!`);
  }

  fakePlaces = fakePlaces.filter((x) => x.id != placeId);
  res.status(200).send({ place });
}
