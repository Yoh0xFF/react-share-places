import cors from 'cors';
import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import { unlink } from 'fs';
import { homedir } from 'os';
import path from 'path';

import { AppError } from './models/error';
import indexRouter from './routes';
import placesRouter from './routes/places-routes';
import usersRouter from './routes/users-routes';

const app = express();

// Configure express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(homedir(), 'uploads')));

app.use('/', indexRouter);
app.use('/api/places', placesRouter);
app.use('/api/users', usersRouter);

// Handle unknown route
app.use((req: Request, res: Response, next: NextFunction) => {
  throw new AppError(404, 'Could not find this route');
});

// error handler
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  // Delete uploaded file if there is an error
  if (req.file) {
    unlink(req.file.path, (error) => {
      error && console.log(error);
    });
  }

  // Skip if response is already sent
  if (res.headersSent) {
    return next(error);
  }

  // render the error page
  res.status(error.code || 500);
  res.json({ message: error.message || 'Internal server error.' });
});

export default app;
