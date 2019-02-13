const { gql } = require('apollo-server-express');

/**
 *  @TODO: Boomtown Schema
 *
 * Define the types in your GraphQL schema here.
 * For each type, remove the `_: Boolean` placeholder and add the
 * fields as directed. Be sure to finish writing resolvers for all types
 * and any relational fields, where required.
 *
 * We will create the custom Date scalar together.
 */
module.exports = gql`
  # scalar Upload

  # scalar Date

  type Item {
    id: ID!
    title: String!
    imageURL: String
    description: String!
    owner: User
    borrower: User
    tags: [Tag!]# Should have ! but removed it to test until the data in the tables allows for this 

  }

  type User {
    id: ID!
    username: String!
    email: String
    bio: String
    items: [Item]
    borrowed: [Item]
    password: String!
  }

  type Tag {
    id: ID!
    title: String!
  }

  input NewItemInput {
    title: String!
    imageURL: String
    description: String!
    ownerID: ID!
    borrowerID: ID
    tagIDs: [ID!]
  }

  input NewUserInput{
    username: String!
    email: String
    bio: String
    password: String!
  }

  input LoginInput{
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID!): [Item]
    tags: [Tag]
    tagsForItem(id:ID!): [Tag]
  }

  type LoginResponse {
    csrfToken: String!
    user: User!
  }

  type Mutation {
    addItem(input: NewItemInput!): Item!
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
  }
`;
