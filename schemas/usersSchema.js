import { makeExecutableSchema } from 'graphql-tools';
import usersResolver from '../resolvers/userResolver';

const typeDefs = `

  type User {
    id: String,
    name: String,
    email: String,
    password: String
  }
  type Query {
    users: [User],
    user(id: Int): User
  },
  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    deleteUser(id: String!): User
    updateUser(id: String!, name: String!, email: String, password: String): User
  }
`;

const userSchema = makeExecutableSchema({ typeDefs, resolvers: usersResolver });

export default userSchema;

