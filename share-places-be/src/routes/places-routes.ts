import { Router } from 'express';

import {
  createPlace,
  getPacesByUserId,
  getPlaceById,
} from '../controllers/places-controller';

const router = Router();

router.get('/:placeId', getPlaceById);

router.get('/user/:userId', getPacesByUserId);

router.post('/', createPlace);

export default router;
