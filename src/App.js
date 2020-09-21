import React from 'react';
import { setEditingId, setTodos as setTodosAction } from './app/store';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import Todos from './Todos';

class App extends React.Component {
  componentDidMount() {
    this.getPosts();
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

  render() {
    return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/todos">Todos</Link>

    {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/todos">
          <Todos />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);