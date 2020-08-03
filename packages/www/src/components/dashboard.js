import { Button, Checkbox, Flex, Input, Label } from 'theme-ui';
import React, { useContext, useRef } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { IdentityContext } from '../../identity-context';
import Layout from '../components/layout';

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      id
      text
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

export default () => {
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  const inputRef = useRef();

  return (
    <Layout>
      <Flex
        as="form"
        sx={{
          flexDirection: 'column',
          maxWidth: 540,
          m: '0 auto',
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } });
          inputRef.current.value = '';
          await refetch();
        }}
      >
        <Label
          sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
        >
          Add Todo
          <Input sx={{ mt: 1 }} ref={inputRef}></Input>
        </Label>
        <Button sx={{ mt: 2 }}>Submit</Button>
      </Flex>
      <Flex sx={{ flexDirection: 'column', maxWidth: 540, m: '0 auto' }}>
        {loading ? <div>Loading...</div> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <ul sx={{ listStyleType: 'none' }}>
            {data.todos.map((todo) => (
              <Flex
                as="li"
                key={todo.id}
                onClick={async () => {
                  await updateTodoDone({ variables: { id: todo.id } });
                  await refetch();
                }}
              >
                <Checkbox checked={todo.done} readOnly />
                <span>{todo.text}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Layout>
  );
};
