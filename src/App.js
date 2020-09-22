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
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import Todos from './Todos';
import CreateTodo from './CreateTodo';
import { PlusCircleFilled } from '@ant-design/icons';

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
    return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/todos">Todos</Link>
      <Link to="/add">
        <PlusCircleFilled />
      </Link>

    {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/todos">
          <Todos />
        </Route>
        <Route path="/add">
          <CreateTodo />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>);
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