import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

export default class Todos extends React.PureComponent {
	renderTimeline(todos) {
		const todosByTime = {};
		todos.forEach( todo => {
			const time = moment.unix(todo.startTime).format('H:mm') + '-' + moment.unix(todo.endTime).format('H:mm');
			if ( ! todosByTime[ time ] ) {
				todosByTime[ time ] = [];
			}

			todosByTime[ time ].push( todo );
		} );
		
		return (
			Object.keys( todosByTime ).sort( (a,b) => parseInt( a.split('-')[0].replace(':', '') ) - parseInt( b.split('-')[0].replace(':', '') ) ).map( time => {
				const todos = todosByTime[ time ];
				const todoStartHour = time.split('-')[0];
				const todoEndHour = time.split('-')[1]
				return <div>
					<div className='timeline-start_end-hour'>{todoStartHour} - {todoEndHour}</div>

					{ todos.map( todo => {
						
						return(
							<div key={todo.id}>
								<div className='timeline-todo'>
									<Link to={`/todos/${todo.id}`}>
										{todo.task}
									</Link>
								</div>
							</div>
						)
					} ) }
				</div>
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