import mongoose from 'mongoose';
import userModel from '../models/user';

const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');


const usersResolver = {
  Query: {
    users: (root, id, {user}) => {
      if(!user) throw new Error('Unauthorized');
      return userModel.find({});
    },
    user: (root, {id}) => {
      return users.find(user => id === user.id);
    }
  },
  Mutation: {
    addUser: (root, {name, email, password}, context) => {
      const user = new userModel({name: name, email, password: password});
      return user.save();
    },
    deleteUser: (root, {id}) => {
      return userModel.findByIdAndRemove({id: id});
    },
    updateUser: (root, {id, name, age, books}) => {
      return userModel.findOneAndUpdate({id: id}, {name: name, email, password: password});
    }
  }
};

export default usersResolver;