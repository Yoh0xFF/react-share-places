import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, login, signup } from '../controllers/users-controller';
import { fileUpload } from '../middlewares/file-upload';

const router = Router();

router.get('/', getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 5 }),
  ],
  signup
);

router.post(
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 5 }),
  ],
  login
);

export default router;
