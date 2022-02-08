import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';

import { AppError } from '../models/error';
import { User } from '../models/user';

export const fakeUsers: Array<User> = [
  {
    id: '8ca36ac7-7eeb-4c74-b7f7-56de5e683664',
    name: 'Dennis Ritchie',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dennis_Ritchie_2011.jpg/440px-Dennis_Ritchie_2011.jpg',
    places: 0,
    email: 'dennis.ritchie@nix.io',
    password: '123',
  },
];

export function getUsers(req: Request, res: Response) {
  res.send({ users: fakeUsers });
}

export function signup(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new AppError(422, 'Invalid inputs!');
  }

  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  const existingUser = fakeUsers.find((x) => x.email === email);
  if (existingUser) {
    throw new AppError(422, 'Could not create user, email already exists.');
  }

  const newUser: User = {
    id: uuid(),
    name,
    image: '',
    places: 0,
    email,
    password,
  };

  fakeUsers.push(newUser);

  res.status(201).send({ user: newUser });
}

export function login(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new AppError(422, 'Invalid inputs!');
  }

  const { email, password }: { email: string; password: string } = req.body;

  const user = fakeUsers.find((x) => x.email === email);
  if (!user) {
    throw new AppError(401, 'Invalid credentials, email not found!');
  }
  if (user.password !== password) {
    throw new AppError(401, "Invalid credentials, password doesn't match!");
  }

  res.send({ message: 'Logged in successfully!' });
}
