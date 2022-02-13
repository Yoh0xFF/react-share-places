import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { unlink } from 'fs';
import { Types, startSession } from 'mongoose';
import { homedir } from 'os';
import path from 'path';

import { AppError } from '../models/error';
import { PlaceDocument, PlaceModel } from '../models/place-model';
import { UserDocument, UserModel } from '../models/user-model';
import { getCoordinatesForAddress } from '../utils/location';

export async function getPlaceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const placeId = req.params.placeId;

  let place: PlaceDocument;
  try {
    place = await PlaceModel.findById(placeId);
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
    return next(
      new AppError(500, 'Something went wrong, could not find a place')
    );
  }

  if (!place) {
    return next(new AppError(404, `Place with id ${placeId}, Not found!`));
  }

  res.send({ place });
}

export async function getPacesByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;

  let user: UserDocument;
  let places: Array<PlaceDocument>;
  try {
    user = await UserModel.findById(userId).populate('places');

    if (!user) {
      return next(new AppError(404, `User with id ${userId} not found`));
    }

    places = user.places as Array<PlaceDocument>;
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
    return next(
      new AppError(500, 'Fetching places failed, please try again later')
    );
  }

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
    title,
    description,
    address,
  }: {
    title: string;
    description: string;
    address: string;
  } = req.body;

  let location;
  try {
    location = await getCoordinatesForAddress(address);
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
    return next(error);
  }

  let newPlace;
  try {
    newPlace = new PlaceModel({
      creator: req.userData.userId,
      title,
      image: req.file.path.substring(req.file.path.indexOf('/uploads') + 1),
      description,
      address,
      location,
    });

    const user = await UserModel.findById(req.userData.userId);
    if (!user) {
      return next(
        new AppError(404, `User with id: ${req.userData.userId} not found`)
      );
    }

    const session = await startSession();
    await session.startTransaction();

    await newPlace.save({ session });
    user.places.push(newPlace);
    await user.save({ session });

    await session.commitTransaction();
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
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

  let place: PlaceDocument;
  try {
    place = await PlaceModel.findById(placeId);

    if (!place) {
      return next(new AppError(404, `Place with id ${placeId}, Not found!`));
    }

    const creatorId = (place.creator as Types.ObjectId).toString();
    if (creatorId !== req.userData.userId) {
      return next(new AppError(403, 'You are not allowed to edit this place!'));
    }

    place.title = title;
    place.description = description;

    await place.save();
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
    return next(new AppError(500, 'Updating place failed, please try again.'));
  }

  res.status(200).send({ place });
}

export async function deletePlace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const placeId = req.params.placeId;

  let place: PlaceDocument;
  let imagePath: string;
  try {
    place = await PlaceModel.findById(placeId).populate('creator');
    imagePath = place.image;

    if (!place) {
      return next(new AppError(404, `Place with id ${placeId}, Not found!`));
    }

    const creatorId = (place.creator as UserDocument).id.toString();
    if (creatorId !== req.userData.userId) {
      return next(new AppError(403, 'You are not allowed to edit this place!'));
    }

    const session = await startSession();
    await session.startTransaction();

    await place.remove({ session });
    const creator = place.creator as UserDocument;
    creator.places.pull(place);
    await creator.save({ session });

    await session.commitTransaction();
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
    return next(new AppError(500, 'Deleting place failed, please try again.'));
  }

  unlink(path.join(homedir(), imagePath), (error) => {
    error && console.log(error);
  });

  res.status(200).send({ place });
}
