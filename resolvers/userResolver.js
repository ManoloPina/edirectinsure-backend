import mongoose from 'mongoose';
import userModel from '../models/user';

const usersResolver = {
  Query: {
    users: (root, id, {user}) => {
      if(!user) throw new Error('Unauthorized');
      return userModel.find({});
    },
    user: (root, {id}) => {
      console.log('user', user);
      return users.find(user => id === user.id);
    }
  },
  Mutation: {
    addUser: (root, {name, email, password}) => {
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