import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

import { AppError } from './models/error';
import indexRouter from './routes';
import placesRouter from './routes/places-routes';

const app = express();

// Configure express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/routes/places', placesRouter);

// error handler
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  // Skip if response is already sent
  if (res.headersSent) {
    return next(error);
  }

  // render the error page
  res.status(error.code || 500);
  res.json({ message: error.message || 'Internal server error.' });
});

export default app;
