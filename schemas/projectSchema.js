import { makeExecutableSchema } from 'graphql-tools';
import projectResolver from '../resolvers/projectResolver';

const typeDefs = `

  type Task {
    id: String!,
    description: String,
    creation_date: String,
    finish_date: String
  }

  type Project {
    id: String,
    name: String,
    userId: String,
    creation_date: String,
    finish_date: String,
    tasks: [Task]
  }
  type Query {
    projects: [Project],
    project(id: String!): Project,
    userProjects(userId: String!): [Project],
  },
  type Mutation {
    addProject(name: String!, userId: String!, creation_date: String!): Project
    deleteProject(userId: String!, projectId: String!): Project
    addTask(userId:String!, projectId:String!, description: String, creation_date: String!): String
    completeTask(userId: String!, projectId:String!, finish_date: String!, id: String!): String
    deleteTask(userId: String!, projectId: String!, taskId: String!): String
  }
`;

const projectSchema = makeExecutableSchema({ typeDefs, resolvers: projectResolver });

export default projectSchema;

