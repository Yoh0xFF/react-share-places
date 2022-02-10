import { Router } from 'express';
import { check } from 'express-validator';

import {
  createPlace,
  deletePlace,
  getPacesByUserId,
  getPlaceById,
  updatePlace,
} from '../controllers/places-controller';

const router = Router();

router.get('/:placeId', getPlaceById);

router.get('/user/:userId', getPacesByUserId);

router.post(
  '/',
  [
    check('creator').notEmpty(),
    check('title').notEmpty(),
    check('description').isLength({ min: 5 }),
    check('imageUrl').notEmpty(),
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
