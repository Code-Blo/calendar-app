import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Create new event
router.post('/', async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.status(201).json(newEvent);
});

// Update an event
router.put('/:id', async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete an event
router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
