import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

export default class Todos extends React.PureComponent {
	renderTimeline(todos) {
		return (
			todos.map( todo => {
				const todoStartHour = moment.unix(todo.startTime).format('H:mm'); //10:00
				const todoEndHour = moment.unix(todo.endTime).format('H:mm'); //12:00
				
				return(
					<div key={todo.id}>
						<div className='timeline-start_end-hour'>{todoStartHour} - {todoEndHour}</div>
						<div className='timeline-todo'>
							<Link to={`/todos/${todo.id}`}>
								{todo.task}
							</Link>
						</div>
					</div>
				)
			})
		);
	}

	hasPrimary(todos) {
		return todos.filter( todo => {
			return todo.priority === "primary"
		} ).length
	}

	render() {
		const { todos } = this.props;
		
		return(
			<div>
				{this.hasPrimary(todos) ? `You have some important tasks to do today.` : `Today is a great day!`}
				{this.renderTimeline(todos)}
			</div>
		);
	}
}
