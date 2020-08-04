/** @jsx jsx */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  jsx,
  Label,
  Spinner,
} from 'theme-ui';
import React, { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Layout from '../components/layout';
import { ADD_TODO, UPDATE_TODO, GET_TODOS } from '../graphql-queries';

const styles = {
  table: {
    width: '100%',
    borderSpacing: 0,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  th: {
    borderBottomStyle: 'solid',
    borderBottomColor: 'gray',
  },
  td: {
    borderBottomStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
  },
};

export default () => {
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  const inputRef = useRef();

  const handleCheckboxClick = async (todo) => {
    await updateTodo({
      variables: {
        id: todo.id,
        done: !todo.done,
        text: todo.text,
      },
    });
    await refetch();
  };

  return (
    <Layout pageTitle="Todo Application">
      <Flex
        as="form"
        my={4}
        mx="auto"
        sx={{
          flexDirection: 'column',
          maxWidth: 540,
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          await addTodo({ variables: { text: inputRef.current.value } });
          inputRef.current.value = '';
          await refetch();
        }}
      >
        <Heading mb={2} sx={{ textAlign: 'center' }}>
          Add a Todo
        </Heading>
        <Label sx={{ display: 'flex', flexDirection: 'column' }}>
          <Input sx={{ mt: 1 }} ref={inputRef}></Input>
        </Label>
        <Button sx={{ mt: 2 }}>Submit</Button>
        <Label></Label>
      </Flex>

      <Flex sx={{ flexDirection: 'column', maxWidth: 540, mx: 'auto', my: 4 }}>
        <Heading mb={2} sx={{ textAlign: 'center' }}>
          Current Todos
        </Heading>
        {loading ? <Spinner mx="auto" /> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <table sx={styles.table}>
            <thead>
              <tr>
                <th sx={styles.th}>Status</th>
                <th sx={styles.th}>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.todos.map((todo) => (
                <tr key={todo.id}>
                  <td sx={styles.td}>
                    <Label sx={{ justifyContent: 'center' }}>
                      <Checkbox
                        sx={{ cursor: 'pointer' }}
                        defaultChecked={todo.done}
                        onChange={() => handleCheckboxClick(todo)}
                      />
                    </Label>
                  </td>
                  <td sx={styles.td}>{todo.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Flex>
    </Layout>
  );
};
