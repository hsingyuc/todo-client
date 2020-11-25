import React from 'react';
import * as moment from 'moment';

export default class Todo extends React.PureComponent {
	render() {
		const { todo } = this.props;
		const formatStartTime = moment.unix(todo.startTime).format('MMM-DD-YYYY H:mm');
		const formatEndTime = moment.unix(todo.endTime).format('MMM-DD-YYYY H:mm');

		return <div className='todo-info'>
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
	}
}
