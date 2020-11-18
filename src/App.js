import React from 'react';
import { 
  setEditingId, 
  setTodos as setTodosAction,
  setUser as setUserAction
 } from './app/store';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import Todos from './Todos';
import TodoForm from './TodoForm';
import Todo from './Todo';

class App extends React.Component {
  componentDidMount() {
    this.getPosts();
    this.getUser();
  }

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

  getUser() {
    fetch('http://localhost:3000/users')
      .then( response => response.json() )
      .then( json => this.updateUser(json) )
  }

  updateUser( user ) {
    const { setUser } = this.props;
    const newUser = user;
    setUser(newUser);
  }

  render() {
    const { todos } = this.props;

    return (
      <Router>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/todos/:id">
            <Todo />
          </Route>
          <Route path="/todos">
            <Todos todos={ todos } />
          </Route>
          <Route path="/add">
            <TodoForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  editingId: state.editingId
});

const mapDispatchToProps = dispatch => ({
	editId: id => dispatch(setEditingId(id)),
	setTodos: todos => dispatch(setTodosAction(todos)),
	setUser: user => dispatch(setUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);