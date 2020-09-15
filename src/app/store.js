import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  todos:[],
  editingTodoId: null
};

const setEditingId = id => ({
  type: 'SET_EDITING_ID',
  payload: id
});

const addTodo = todo => ({
  type: 'ADD_TODO',
  payload: todo
});

const removeTodo = id => ({
  type: 'REMOVE_TODO',
  payload: id
});



export default configureStore;
