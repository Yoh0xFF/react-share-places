import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { AppError } from '../models/error';
import { UserDocument, UserModel } from '../models/user-model';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let users: Array<UserDocument>;
  try {
    users = await UserModel.find({}, '-password');
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
    return next(new AppError(500, 'Fetching users failed, please try again'));
  }

  res.send({ users: users.map((x) => x.toObject()) });
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new AppError(422, 'Invalid inputs'));
  }

  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  let newUser: UserDocument;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return next(
        new AppError(422, 'Could not create user, email already exists')
      );
    }

    newUser = new UserModel({
      name,
      email,
      password,
      image:
        'https://cdn.icon-icons.com/icons2/2596/PNG/512/check_one_icon_155665.png',
      places: [],
    });

    await newUser.save();
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
    return next(new AppError(500, 'Creating user failed, please try again'));
  }

  res.status(201).send({ user: newUser.toObject() });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new AppError(422, 'Invalid inputs'));
  }

  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user: UserDocument = await UserModel.findOne({ email: email });
    if (!user) {
      return next(new AppError(401, 'Invalid credentials, email not found'));
    }
    if (user.password !== password) {
      return next(
        new AppError(401, "Invalid credentials, password doesn't match!")
      );
    }
  } catch (error) {
    console.log(errors);
    return next(new AppError(500, 'logging in failed, please try again'));
  }

  res.send({ message: 'Logged in successfully' });
}
