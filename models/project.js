import mongoose, { Schema, mongo } from 'mongoose';
import uuid from 'node-uuid';
import taskSchema from './tasks';

const schema = mongoose.Schema;

const projectSchema = new schema({
  id: {type: String, default: uuid.v1},
  name: {type: String, required: true},
  userId: {type: String, required: true},
  creation_date: {type: Date, required: true},
  finish_date: {type: Date},
  tasks: Array
});

const projectModel = mongoose.model('project', projectSchema);

export default projectModel;