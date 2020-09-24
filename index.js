const { ApolloServer, ApolloError } = require("apollo-server");
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const ProjectAPI = require("./mocking/datasourcess/project");
const UserAPI = require("./mocking/datasourcess/user");
const faker = require('faker')
const mocks = {

  User: () => ({
    name: () => faker.random.arrayElement(UserAPI.getAllUsers()),
    profileImageUrl: () => faker.random.arrayElement(UserAPI.getAllUsers()),
    username: () => faker.name.firstName() + faker.random.number([0, 2])

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
