const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    projects( # replace the current launches query with this one.
    """
    The number of results to show. Must be >= 1. Default = 20
    """
    pageSize: Int
    """
    If you add a cursor here, it will only return results _after_ this cursor
    """
    after: String
  ): ProjectConnection!
    project(id: ID!): Project
    users: [User]
    allUsers(pageSize:Int,after:String):UserConnection!
    # Queries for the current user
    me: User
}
"""
Simple wrapper around our list of projects that contains a cursor to the
last item in the list. Pass this cursor to the projects query to fetch results
after these.
"""
type ProjectConnection{
    cursor:String!
    hasMore:Boolean!
    projects:[Project]!
}

type Project{ # add this below the Query type as an additional type.
    id:ID!
    name:String!
    code:String!
    color:String!
    address:String!
    cursor:String!
}

type User {
  id: ID!
  username: String!
  name: String!
  profileImageUrl: String!
  email: String!
  password: String!
  records: [Project]
  defaultOrganizationId:ID!
}

type UserConnection{
  cursor:String!,
  hasMore:Boolean!,
  users:[User]!
}

type UserOrganization{
    user:User!
    organization:Organization!
    positions:String!
  }

  type Organization{
    id:ID!
    name:String!
    users:[UserOrganization!]!
  }

  
  type ProjectMembership{
    user:UserOrganization!
    project:Project!
    roles:String!
  }

  # type Query{
  #   allUsers:[User!]!
  #   allProjects(limit: Int,cursor: String):[Project!]!
  #   project(id:ID!):Project
  # }

  #for later these mutations


type Mutation {
  # if false, saving record failed -- check errors
  saveRecord(recordId: ID!): RecordUpdateResponse!
  # if false, deleting record failed -- check errors
  deleteRecord(recordId: ID!): RecordUpdateResponse!
  login(email: String, password: String): String # login token
}

type RecordUpdateResponse {
  success: Boolean!
  message: String
  records: [Project]
}
`;

module.exports = typeDefs;