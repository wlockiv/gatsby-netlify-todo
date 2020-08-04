import { gql } from '@apollo/client';
export const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;
export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $done: Boolean!, $text: String!) {
    updateTodo(id: $id, done: $done, text: $text) {
      id
      text
      done
    }
  }
`;
export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;
