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
		const input = event.target.value.toLowerCase();
		this.setState( { input } );
	}

	getFilteredTodos( input ) {
		const { todos } = this.props;
		if ( ! input.length ) {
			return [];
		}
		return todos.filter( ( todo ) => todo.task.toLowerCase().indexOf(input) >= 0 );
	}

	renderFilteredTodos() {
		const { input } = this.state;
		const filteredTodos = this.getFilteredTodos( input );

		if( !filteredTodos.length ) {
			return <>No todos found.</> 
		}

		return filteredTodos.map( todo => { 
			return <div className='filtered-todo' key={todo.id}>{todo.task}</div> 
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
		const { selectedDate, getTodosForDate, view, setView } = this.props;
		const todayTodos = selectedDate ? getTodosForDate(selectedDate) : [];
		const { input } = this.state;

		switch(view) {
			case 'todo-form':
				return <>
					{this.renderLeftArrow()}
					<TodoForm setView ={ () => setView('todos') } />
				</>;
			case 'search':
				return <>
					{this.renderLeftArrow()}
					<div className='search-container'>
						<input className='search-input' type="text" id="myInput" onKeyUp={ (event) => this.setInput(event) } title="Type in a todo"></input>
						<div className='filtered-todos-container'>
							{ input.length 
								? this.renderFilteredTodos()
								: <div>Search your todos.</div>
							}
						</div>
					</div>
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