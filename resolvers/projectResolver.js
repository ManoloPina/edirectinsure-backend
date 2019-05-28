import projectModel from '../models/project';
import uuidv1 from 'uuid/v1';

const projectResolvers = {
  Query: {
    projects: () => {
      return projectModel.find({});
    },
    project: (root, {id}) => {
      return projectModel
        .find(project => id === project.id);
    },
    userProjects: (root, {userId}) => {
      return projectModel.find({userId: userId});
    }
  },
  Mutation: {
    addProject: (root, {name, userId, creation_date}) => {
      const project = new projectModel({name: name, userId: userId, creation_date: creation_date});
      return project.save();
    },
    addTask: (root, {userId, projectId, description, creation_date}) => {
      const task = {id: uuidv1(), description, creation_date, finish_date: ""}
      return projectModel.find({userId, id: projectId })
        .update({$push: {tasks: task}});

    },
    completeTask: (root, {userId, projectId, finish_date, id}) => {
      return projectModel
        .update({userId, id: projectId, "tasks.id": id}, { $set: { "tasks.$.finish_date": finish_date } });
    },
    deleteProject: (root, {userId, projectId, taskId}) => {
      return projectModel.findOneAndRemove({userId, id: projectId});
    },
    deleteTask: (root, {userId, projectId, taskId}) => {
      return projectModel.update({userId, id: projectId},  { $pull: { tasks : { id : taskId }}});
    }
  }
};

export default projectResolvers;