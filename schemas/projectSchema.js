import { makeExecutableSchema } from 'graphql-tools';
import projectResolver from '../resolvers/projectResolver';

const typeDefs = `

  type Task {
    id: String,
    description: String,
    creation_date: String,
    finish_date: String
  }

  input TaskInput {
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
    project(id: String!): Project
  },
  type Mutation {
    addProject(name: String!, userId: String!, creation_date: String!, task: TaskInput): Project
    deleteUser(id: String!): Project
    updateUser(id: String!, name: String!, email: String, password: TaskInput): Project
  }
`;

const projectSchema = makeExecutableSchema({ typeDefs, resolvers: projectResolver });

export default projectSchema;

