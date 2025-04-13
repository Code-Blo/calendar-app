import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: String,
  category: String,
  start: Date,
  end: Date,
  color: String
});

export default mongoose.model('Event', eventSchema);
