import React from 'react';
import { ArrowLeft } from '@styled-icons/bootstrap'
import TodoForm from './TodoForm';
import Todos from './Todos';
import { connect } from 'react-redux';

class HomeAction extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			input: ''
		}
		this.setInput = this.setInput.bind(this);
	}

	setInput(event) {
		const input = event.target.value;
		this.setState( { input } );
	}

	getFilteredTodos( input ) {
		const { todos } = this.props;
		if ( ! input.length ) {
			return [];
		}
		return todos.filter( ( todo ) => todo.task.indexOf(input) >= 0 );
	}

	renderFilteredTodos() {
		const { input } = this.state;
		const filteredTodos = this.getFilteredTodos( input );

		if( !filteredTodos.length ) {
			return <div>No todos found.</div> 
		}

		return filteredTodos.map( todo => { 
			return <div key={todo.id}>{todo.task}</div> 
		})
	}

	render() {
		const { selectedDate, getTodosForDate, setView, view } = this.props;
		const todayTodos = selectedDate ? getTodosForDate(selectedDate) : [];
		const { input } = this.state;
		
		switch(view) {
			case 'todo-form':
				return <div className='home-todo-form'><TodoForm closeTodoForm={ () => setView('todos') } /></div>;
			case 'search':
				return <div> 
					<button onClick={ () => setView('todos') }>
						<ArrowLeft size="25"  />
					</button>
					Todo
					<input className='home-search-input' type="text" id="myInput" onKeyUp={ (event) => this.setInput(event) } title="Type in a todo"></input>
					{ input.length 
						? this.renderFilteredTodos()
						: <div>Search your todos.</div>
					}
				</div>;
			default:
				return <div className='home-todos'><Todos todos={ todayTodos } /></div>;
		}
	}
}

const mapStateToProps = state => ({
	todos: state.todos,
});

export default connect(mapStateToProps, null)(HomeAction);