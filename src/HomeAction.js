import React from 'react';
import { ArrowLeft } from '@styled-icons/bootstrap'
import TodoForm from './TodoForm';
import Todos from './Todos';

export default class HomeAction extends React.PureComponent {
	render() {
		const { selectedDate, getTodosForDate, setView, view } = this.props;
		const todayTodos = selectedDate ? getTodosForDate(selectedDate) : [];

		switch(view) {
			case 'todo-form':
				return <div className='home-todo-form'><TodoForm closeTodoForm={ () => setView('todos') } /></div>;
			case 'search':
				return <> 
					<button onClick={ () => setView('todos') }>
						<ArrowLeft size="25"  />
					</button>
					Todo
					<input className='home-search-input' type="text" id="myInput" onkeyup="myFunction()" title="Type in a todo"></input>
				</>;
			default:
				return <div className='home-todos'><Todos todos={ todayTodos } /></div>;
		}
	}
}



