import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  todos:[],
};

export const editTodo = todo => ({
  type: 'EDIT_TODO',
  payload: todo
});

export const addTodo = todo => ({
  type: 'ADD_TODO',
  payload: {
    priority: todo.priority,
    task: todo.task,
    startTime: todo.startTime,
    endTime: todo.endTime,
    attachment: todo.attachment,
    id: todo.id
  }
});

export const removeTodo = id => ({
  type: 'REMOVE_TODO',
  payload: id
});

export const setTodos = todos => ({
  type: 'SET_TODOS',
  payload: todos
});

const reducer = ( state = initialState, action ) => {
  switch(action.type) {
    case 'EDIT_TODO':
      const todos = [...state.todos];
      const editedindex = todos.findIndex(todo=>todo.id===action.payload.id);
      if (editedindex !== -1) {
        todos[editedindex] = action.payload;
      }
      return {
        ...state,
        todos
      };
    case 'ADD_TODO':
      return {
        ...state,
      todos: [ ...state.todos, action.payload ]
    };
    case 'REMOVE_TODO':
      const newTodos = [...state.todos];
      const index = newTodos.findIndex( t => t.id === action.payload );
      newTodos.splice( index, 1 );
      return {
        ...state,
        todos: newTodos
      };
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
};

export default configureStore({ reducer });
