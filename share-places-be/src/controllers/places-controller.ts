import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { startSession } from 'mongoose';

import { AppError } from '../models/error';
import { PlaceModel } from '../models/place-model';
import { User, UserModel } from '../models/user-model';
import { getCoordinatesForAddress } from '../utils/location';

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

  res.send({ place: place.toObject() });
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

  res.send({ places: places.map((x) => x.toObject()) });
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

  let newPlace;
  try {
    newPlace = new PlaceModel({
      creator,
      title,
      imageUrl,
      description,
      address,
      location,
    });

    const user = await UserModel.findById(creator);
    if (!user) {
      return next(new AppError(404, `User with id: ${creator} not found`));
    }

    const session = await startSession();
    await session.startTransaction();

    await newPlace.save({ session });
    user.places.push(newPlace);
    await user.save({ session });

    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(new AppError(500, 'Creating place failed, please try again.'));
  }

  res.status(201).send({ place: newPlace.toObject() });
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

  res.status(200).send({ place: place.toObject() });
}

export async function deletePlace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const placeId = req.params.placeId;

  let place;
  try {
    place = await PlaceModel.findById(placeId).populate('creator');

    if (!place) {
      return next(new AppError(404, `Place with id ${placeId}, Not found!`));
    }

    const session = await startSession();
    await session.startTransaction();

    await place.remove({ session });
    const creator = place.creator as User;
    creator.places.pull(place);
    await creator.save({ session });

    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(new AppError(500, 'Deleting place failed, please try again.'));
  }

  res.status(200).send({ place: place.toObject() });
}
