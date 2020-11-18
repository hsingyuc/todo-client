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
		this.renderLeftArrow = this.renderLeftArrow.bind(this);
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
			return <>No todos found.</> 
		}

		return filteredTodos.map( todo => { 
			return <div key={todo.id}>{todo.task}</div> 
		})
	}

	renderLeftArrow() {
		const { setView } = this.props;

		return(
			<div className='btn-container'>
				<button className='btn btn-arrow-left' onClick={ () => setView('todos') }>
					<ArrowLeft size="25" />
				</button>
				<span className='btn-text'>Todo</span>
			</div>
		); 
	}

	render() {
		const { selectedDate, getTodosForDate, view } = this.props;
		const todayTodos = selectedDate ? getTodosForDate(selectedDate) : [];
		const { input } = this.state;

		switch(view) {
			case 'todo-form':
				return <>
					{this.renderLeftArrow()}
					<TodoForm />
				</>;
			case 'search':
				return <>
					{this.renderLeftArrow()}
					<input className='home-search-input' type="text" id="myInput" onKeyUp={ (event) => this.setInput(event) } title="Type in a todo"></input>
					{ input.length 
						? this.renderFilteredTodos()
						: <div>Search your todos.</div>
					}
				</>;
			default:
				return <div className='home-todos'><Todos todos={ todayTodos } /></div>;
		}
	}
}

const mapStateToProps = state => ({
	todos: state.todos,
});

export default connect(mapStateToProps, null)(HomeAction);