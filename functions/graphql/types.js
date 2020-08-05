const { gql } = require('apollo-server-lambda');
const types = gql`
  type Query {
    todos: [Todo]!
  }

  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }

  type Mutation {
    addTodo(text: String!): Todo
    updateTodo(id: ID!, done: Boolean!, text: String!): Todo
    deleteTodo(id: ID!): Todo
  }
`;
exports.types = types;
