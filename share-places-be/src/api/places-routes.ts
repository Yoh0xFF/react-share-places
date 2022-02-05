import express, { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send({ message: 'It works!' });
});

export default router;
