/** @jsx jsx */

import { Checkbox, IconButton, Label, Spinner, jsx } from 'theme-ui';

import React from 'react';

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

export default ({
  data,
  loading,
  error,
  updateTodo,
  deleteTodo,
  refetch,
  ...props
}) => {
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

  const handleDeleteClick = async (id) => {
    await deleteTodo({
      variables: { id: id },
    });
    await refetch();
  };

  if (loading) {
    return <Spinner mx="auto"></Spinner>;
  }

  if (error) {
    return <div>error.message</div>;
  }

  if (data && data.todos.length === 0) {
    return <div sx={{ textAlign: 'center' }}>Add a todo to get started!</div>;
  }

  return (
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
  );
};
