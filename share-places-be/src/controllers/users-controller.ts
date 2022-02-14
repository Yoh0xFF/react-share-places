import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

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

  res.send({ users });
}

function _generateJsonWebToken(user: UserDocument): string {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return token;
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
  let token;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return next(
        new AppError(422, 'Could not create user, email already exists')
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      image: req.file.path.substring(req.file.path.indexOf('/uploads') + 1),
      places: [],
    });

    await newUser.save();

    token = _generateJsonWebToken(newUser);
  } catch (error) {
    console.error('Internal server error: %s, %s', error.message, error.stack);
    return next(new AppError(500, 'Creating user failed, please try again'));
  }

  delete newUser.password;
  res.status(201).send({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new AppError(422, 'Invalid inputs'));
  }

  const { email, password }: { email: string; password: string } = req.body;

  let user: UserDocument;
  let token;
  try {
    user = await UserModel.findOne({ email: email });
    if (!user) {
      return next(new AppError(401, 'Invalid credentials, email not found'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(
        new AppError(401, "Invalid credentials, password doesn't match!")
      );
    }

    token = _generateJsonWebToken(user);
  } catch (error) {
    console.log(errors);
    return next(new AppError(500, 'logging in failed, please try again'));
  }

  res.send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
}
