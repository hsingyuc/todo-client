import React from 'react';
import { 
  setTodos as setTodosAction,
 } from './store';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import Todos from './Todos';
import TodoForm from './TodoForm';
import TodoPage from './TodoPage';

class App extends React.Component {
  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/todos`)
      .then( response => response.json() )
      .then( json => this.updateTodos(json) )
  }

  updateTodos( todos ) {
    const { setTodos } = this.props;
    const newTodos = [...todos];
    setTodos(newTodos);
  }

  render() {
    const { todos } = this.props;

    return (
      <Router>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/todos/:id">
            <TodoPage />
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
});

const mapDispatchToProps = dispatch => ({
	setTodos: todos => dispatch(setTodosAction(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);