import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { AppError } from '../models/error';
import { Place, PlaceModel } from '../models/place';
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

export async function getPlaceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const placeId = req.params.placeId;

  let place;
  try {
    place = await PlaceModel.findById(placeId);
  } catch (error) {
    console.log(error);
    return next(
      new AppError(500, 'Something went wrong, could not find a place')
    );
  }

  if (!place) {
    return next(new AppError(404, `Place with id ${placeId}, Not found!`));
  }

  res.send({ place: place.toObject({ getters: true }) });
}

export async function getPacesByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;

  let places;
  try {
    places = await PlaceModel.find({ creator: userId });
  } catch (error) {
    console.log(error);
    return next(
      new AppError(500, 'Fetching places failed, please try again later')
    );
  }

  res.send({ places: places.map((x) => x.toObject({ getters: true })) });
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

  const newPlace = new PlaceModel({
    creator,
    title,
    imageUrl,
    description,
    address,
    location,
  });

  try {
    await newPlace.save();
  } catch (error) {
    console.log(error);
    return next(new AppError(500, 'Creating place failed, please try again.'));
  }

  res.status(201).send({ place: newPlace });
}

export async function updatePlace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new AppError(422, 'Invalid inputs!'));
  }

  const placeId = req.params.placeId;

  const {
    title,
    description,
  }: {
    title: string;
    description: string;
  } = req.body;

  let place;
  try {
    place = await PlaceModel.findById(placeId);

    if (!place) {
      return next(new AppError(404, `Place with id ${placeId}, Not found!`));
    }

    place.title = title;
    place.description = description;

    await place.save();
  } catch (error) {
    console.log(error);
    return next(new AppError(500, 'Updating place failed, please try again.'));
  }

  res.status(200).send({ place: place.toObject({ getters: true }) });
}

export async function deletePlace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const placeId = req.params.placeId;

  let place;
  try {
    place = await PlaceModel.findById(placeId);

    if (!place) {
      return next(new AppError(404, `Place with id ${placeId}, Not found!`));
    }

    await place.remove();
  } catch (error) {
    console.log(error);
    return next(new AppError(500, 'Deleting place failed, please try again.'));
  }

  res.status(200).send({ place: place.toObject({ getters: true }) });
}
