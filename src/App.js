import React from 'react';
import { setEditingId, setTodos } from './app/store';
import { connect } from 'react-redux';

class App extends React.Component {
  getPosts() {
    fetch('http://localhost:3000/todos')
      .then( response => response.json() )
      .then( json => this.updateTodos(json) )
  }

  updateTodos( todos ) {
    const { setTodos } = this.props;
    const newTodos = [...todos];
    setTodos(newTodos);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  editingId: state.editingId
});

const mapDispatchToProps = dispatch => ({
	editId: id => dispatch(setEditingId(id)),
	setTodos: todos => dispatch(setTodos(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);