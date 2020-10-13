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
			<div>
				<Link to="/">
					<button type="button">
						Home
					</button>
				</Link>

				<div>
					<h1>{todo.task}</h1>
					<p>Category: {todo.category}</p>
					<p>Priority: {todo.priority}</p>
					<p>Start time: {todo.startTime}</p>
					<p>End time: {todo.endTime}</p>
					<div>Attachment: {todo.attachment}</div>
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