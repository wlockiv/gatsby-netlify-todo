/** @jsx jsx */

import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from '../../graphql-queries';
import { Button, Flex, Heading, Input, Label, jsx } from 'theme-ui';
import React, { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import TodoTable from './todo-table';

export default () => {
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  const inputRef = useRef();

  return (
    <React.Fragment>
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
        <TodoTable
          data={data}
          loading={loading}
          error={error}
          refetch={refetch}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        ></TodoTable>
        {/* {loading ? <Spinner mx="auto" /> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <table sx={styles.table}>
            <thead>
              <tr>
                <th sx={styles.th}>Status</th>
                <th sx={styles.th}>Name</th>
                <th sx={styles.th}>Actions</th>
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
                  <td sx={{ ...styles.td, textAlign: 'center' }}>
                    <IconButton
                      onClick={() => handleDeleteClick(todo.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <span role="img" aria-label="delete">
                        🔥
                      </span>
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )} */}
      </Flex>
    </React.Fragment>
  );
};
