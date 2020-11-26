import React from 'react';
import * as moment from 'moment';

export default class Todo extends React.PureComponent {
	render() {
		const { startTime, endTime, task, priority, attachment } = this.props;
		const formatStartTime = moment.unix(startTime).format('MMM-DD-YYYY H:mm');
		const formatEndTime = moment.unix(endTime).format('MMM-DD-YYYY H:mm');

		return <div className='todo-info'>
			<h1 className='todo-head'>{task}</h1>
			<div className='todo-body'>
				<div className='todo-text'>
					<p>Priority : {priority}</p>
					<p>Start time : {formatStartTime}</p>
					<p>End time : {formatEndTime}</p>
				</div>
				{
					attachment
						? <div className='todo-file'>
							<p>Attachment</p>
							<img src={`http://localhost:3000/uploads/${attachment}`} alt='attachment' />
						</div>
						: ''
				}
			</div>
		</div>
	}
}
