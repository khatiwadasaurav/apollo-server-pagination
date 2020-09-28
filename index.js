import { ApolloServer, ApolloError } from "apollo-server"
import typeDefs from './schema'
import resolvers from './resolvers'
import ProjectAPI from './datasourcess/project'
import UserAPI from "./datasourcess/user";
import faker from 'faker'

const mocks = {

  User: () => ({
    name: () => faker.random.arrayElement(UserAPI.getAllUsers()),
    profileImageUrl: () => faker.random.arrayElement(UserAPI.getAllUsers()),
    username: () => faker.name.firstName() + faker.random.number([0, 2])
  }),
  ProjectEdge: () => ({
    role: () => faker.random.word()
  }),
  ID: () => faker.random.uuid(),
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
  dataSources: () => ({
    projectAPI: new ProjectAPI(),
    userAPI: new UserAPI()
  })
});

server.listen().then(({ url }) => console.log(`Server Running on port ${url}`));
