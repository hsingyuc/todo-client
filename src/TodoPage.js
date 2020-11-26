import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from '@reduxjs/toolkit';
import ButtonLeft from './ButtonLeft';
import TodoForm from './TodoForm';
import Todo from './Todo';

class TodoPage extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			isEditing: false
		}
	}

	render() {
		const { todos, match } = this.props;
		const { isEditing } = this.state;
		const todo = todos.find( t => t.id === parseInt(match.params.id));

		return(
			<div className='todo-container'>
				<ButtonLeft onClick={ () => this.props.history.push('/') } />
				<button 
					type='button' 
					className='btn-edit' 
					onClick={ () => this.setState( {isEditing: true} ) }
				>
					Edit
				</button>
				{ !isEditing
					? ( todo ? <Todo { ...todo} /> : 'Loading...' )
					: <TodoForm { ...todo} onFinish={ () => this.setState( {isEditing: false} ) } />
				}
			</div>
		);
	}
}

const mapStateToProp = state => ({
	todos: state.todos,
});

export default compose(
	withRouter,
	connect(mapStateToProp)
)(TodoPage);