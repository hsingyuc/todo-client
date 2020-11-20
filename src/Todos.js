import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

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
			Object.keys( todosByTime ).sort( (a,b) => a.split('-')[0].replace(':', '') - b.split('-')[0].replace(':', '') ).map( time => {
				const todos = todosByTime[ time ];

				return <div className='timeline'>
					<div className='timeline-time'>{time}</div>

					{ todos.map( todo => {
						return(<>
							<div className='timeline-todo' key={todo.id}>
								<Link to={`/todos/${todo.id}`}>
									{todo.task}
								</Link>
							</div>
							<DeleteButton />
						</>
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
			<div className='todos-container'>
				<div className='todos-container-header'>
					{this.hasPrimary(todos) ? `You have some important tasks to do today.` : `Today is a great day!`}
				</div>
				{this.renderTimeline(todos)}
			</div>
		);
	}
}