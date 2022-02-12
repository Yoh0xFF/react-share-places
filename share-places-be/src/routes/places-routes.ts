import { Router } from 'express';
import { check } from 'express-validator';

import {
  createPlace,
  deletePlace,
  getPacesByUserId,
  getPlaceById,
  updatePlace,
} from '../controllers/places-controller';
import { fileUpload } from '../middlewares/file-upload';

const router = Router();

router.get('/:placeId', getPlaceById);

router.get('/user/:userId', getPacesByUserId);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('creator').notEmpty(),
    check('title').notEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').notEmpty(),
  ],
  createPlace
);

router.patch(
  '/:placeId',
  [check('title').notEmpty(), check('description').isLength({ min: 5 })],
  updatePlace
);

router.delete('/:placeId', deletePlace);

export default router;
