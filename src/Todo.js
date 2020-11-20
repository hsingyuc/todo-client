import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from '@reduxjs/toolkit';
import ButtonLeft from './ButtonLeft';
import * as moment from 'moment';

class Todo extends React.Component {
	render() {
		const { todos, match } = this.props;
		const todo = todos.find( t => t.id === parseInt(match.params.id));

		if( !todo ) {
			return 'Loading...';
		}
		
		const formatStartTime = moment.unix(todo.startTime).format('MMM-DD-YYYY H:mm');
		const formatEndTime = moment.unix(todo.endTime).format('MMM-DD-YYYY H:mm');
		
		return(
			<div className='todo-container'>
				<ButtonLeft onClick={ () => this.props.history.push('/') } />
				<div className='todo-info'>
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
			</div>
		);
	}
}

const mapStateToProp = state => ({
	todos: state.todos,
	editingId: state.editingId
});

export default compose(
	withRouter,
	connect(mapStateToProp)
)(Todo);