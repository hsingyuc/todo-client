import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from '@reduxjs/toolkit';

class Todo extends React.Component {
	render() {
		const { todos, match } = this.props;
		const todo = todos.find( t => t.id === parseInt(match.params.id));

		if( !todo ) {
			return 'Loading...';
		}
		return(
			<div className='todo-container'>
				<Link to="/">
					<button className='btn btn-arrow-left' type="button">
						Home
					</button>
				</Link>

				<div>
					<h1>{todo.task}</h1>
					<p>Priority: {todo.priority}</p>
					<p>Start time: {todo.startTime}</p>
					<p>End time: {todo.endTime}</p>
					<p>Attachment:</p> 
					<img src={`http://localhost:3000/uploads/${todo.attachment}`} alt='attachment' />
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