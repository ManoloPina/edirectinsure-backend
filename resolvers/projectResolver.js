import mongoose from 'mongoose';
import projectModel from '../models/project';

const projectResolvers = {
  Query: {
    projects: () => {
      return projectModel.find({});
    },
    project: (root, {id}) => {
      return projectModel
        .find(project => id === project.id);
    }
  },
  Mutation: {
    addProject: (root, {name, userId, creation_date, task}) => {
      const project = new projectModel({name: name, userId: userId, creation_date: creation_date});
      return project.save();
    },
    deleteUser: (root, {id}) => {
      return projectModel.findByIdAndRemove({id: id});
    },
    updateUser: (root, {id, name, age, books}) => {
      return projectModel.findOneAndUpdate({id: id}, {name: name, email, password: password});
    }
  }
};

export default projectResolvers;