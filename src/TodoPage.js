import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from '@reduxjs/toolkit';
import ButtonLeft from './ButtonLeft';
import * as moment from 'moment';
import TodoForm from './TodoForm';

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
		
		if( !todo ) {
			return 'Loading...';
		}
		
		const formatStartTime = moment.unix(todo.startTime).format('MMM-DD-YYYY H:mm');
		const formatEndTime = moment.unix(todo.endTime).format('MMM-DD-YYYY H:mm');
		
		return(
			<div className='todo-container'>
				<ButtonLeft onClick={ () => this.props.history.push('/') } />
				<button type='button' className='btn-edit' onClick={ () => this.setState( {isEditing: true} ) }>Edit</button>
				{ !isEditing
					? <div className='todo-info'>
						<h1 className='todo-head'>{todo.task}</h1>
						<div className='todo-body'>
							<div className='todo-text'>
								<p>Priority : {todo.priority}</p>
								<p>Start time : {formatStartTime}</p>
								<p>End time : {formatEndTime}</p>
							</div>
							{
								todo.attachment
								? <div className='todo-file'>
									<p>Attachment</p> 
									<img src={`http://localhost:3000/uploads/${todo.attachment}`} alt='attachment' />
								</div>
								: ''
							}
						</div>
					</div>
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