import { Button, Checkbox, Flex, Input, Label } from 'theme-ui';
import React, { useContext, useRef } from 'react';

import { IdentityContext } from '../../identity-context';
import Layout from '../components/layout';
import { useReducer } from 'react';
import { useState } from 'react';

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'addTodo':
      return [{ done: false, value: action.payload }, ...state];
    case 'toggleTodoDone':
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      return newState;
  }
};

export default () => {
  const { user } = useContext(IdentityContext);
  // const [todos, setTodos] = useState([]);
  const [todos, dispatch] = useReducer(todosReducer, []);
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
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'addTodo', payload: inputRef.current.value });
          inputRef.current.value = '';
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
        <ul sx={{ listStyleType: 'none' }}>
          {todos.map((todo, i) => (
            <Flex
              as="li"
              key={i}
              onClick={() => {
                dispatch({ type: 'toggleTodoDone', payload: i });
              }}
            >
              <Checkbox checked={todo.done} readOnly />
              <span>{todo.value}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Layout>
  );
};
