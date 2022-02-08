import { Router } from 'express';

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

router.post('/', createPlace);

router.patch('/:placeId', updatePlace);

router.delete('/:placeId', deletePlace);

export default router;
