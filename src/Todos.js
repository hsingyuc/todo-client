import React from 'react';
import * as moment from 'moment';
import { Timeline } from 'antd';
import { Link } from 'react-router-dom';

export default class Todos extends React.PureComponent {
	renderTimeline(todos) {
		const todosMap = {};

		todos.map( todo => {
			const todoStartHour = moment.unix(todo.startTime).format('H');
			
			if( !todosMap[ todoStartHour ] ) {
				todosMap[ todoStartHour ] = [];
			}
			return todosMap[ todoStartHour ].push( todo );
		} );

		const times = [];
		for( let time = 0; time < 24; time++ ) {
			const hourTodos = todosMap[time] ? todosMap[time] : [];
			
			times.push(
				<Timeline mode={'left'}>
					<Timeline.Item label={
						time === 0 ? time + '0:00' : time + ':00'
						}>
						{ hourTodos.map( todo => {
								return(
									<>
										<Link to={`/todos/${todo.id}`}>
											{todo.task}
										</Link>
									</>
								)
							}
						) }
					</Timeline.Item>
				</Timeline>
			)
		}

		return times;
	}

	render() {
		const { todos } = this.props;
	
		if( !todos.length ) {
			return (
				<div>
					<span>You are free today!</span>
				</div>
			);
		}
		return(
			<div>
				{this.renderTimeline(todos)}
			</div>
		);
	}
}
