import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  todos:[],
  editingId: null
};

export const setEditingId = id => ({
  type: 'SET_EDITING_ID',
  payload: id
});

export const addTodo = todo => ({
  type: 'ADD_TODO',
  payload: todo
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
    case 'SET_EDITING_ID':
      return {
        ...state,
        editingId: action.payload
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [ ...state.todos, action.payload ]
      };
    case 'REMOVE_TODO':
      const newTodos = [...state.todos];
      const index = newTodos.findIndex( t => t.id === action.id );
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
