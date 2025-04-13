import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  name: String,
  color: String,
});

const goalSchema = mongoose.Schema({
  name: String,
  color: String,
  tasks: [taskSchema]
});

export default mongoose.model('Goal', goalSchema);
