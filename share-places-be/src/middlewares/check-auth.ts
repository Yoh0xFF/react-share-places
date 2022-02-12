import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '../models/error';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('Authorization failed!');
    }

    const decodedToken: any = jwt.verify(token, 'top_secret');
    req.userData = { userId: decodedToken.userId };
  } catch (error) {
    return next(new AppError(401, 'Authorization failed!'));
  }
}
