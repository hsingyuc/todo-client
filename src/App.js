import React from 'react';

export default class App extends React.Component {
  getPosts() {
    fetch('http://localhost:3000/todos')
      .then( response => response.json() )
      .then( json => this.updateTodos(json) )
  }

  render() {
    return null;
  }
}
