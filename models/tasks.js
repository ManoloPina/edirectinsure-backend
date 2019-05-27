import mongoose, { Schema, mongo } from 'mongoose';
import uuid from 'node-uuid';

const schema = mongoose.Schema;

const taskSchema = new schema({
  id: {type: String, default: uuid.v1},
  description: {type: String, required: true},
  creation_date: {type: Date, required: true},
  finish_date: Date
});

//const taskModel = mongoose.model('task', taskSchema);

export default taskSchema;