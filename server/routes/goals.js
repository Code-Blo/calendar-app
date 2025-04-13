import express from 'express';
import Goal from '../models/Goal.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});

export default router;
