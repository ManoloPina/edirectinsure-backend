import mongoose, { Schema, mongo } from 'mongoose';
import uuid from 'node-uuid';

const schema = mongoose.Schema;

const userSchema = new schema({
  //name, age. books, id
  id: {type: String, default: uuid.v1},
  name: {type: String, required: true},
  email: {type:String, required: true, unique: true},
  password: {type: String, required: true}
});

const userModel = mongoose.model('user', userSchema);

export default userModel;