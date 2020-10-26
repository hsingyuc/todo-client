import React from 'react';
import * as moment from 'moment';

export default class Todos extends React.PureComponent {
	renderTimeline(todos) {
	//@Todo1 Create todosMap
		// eg. todosMap = {
				// 	0: todo1,
				// 	1: [
					// 		todo1.1,
					// 		todo1.2
					// 	],
				// 	2: todo3
				// };  
		// @Todo1.1 Create todoStartHour property.
		// @Todo1.2 Assign todo.task to todosMap.todoStartHour
		
		const todosMap = {};

		todos.map( todo => {
			const todoStartHour = moment.unix(todo.startTime).format('H');
			
			if( !todosMap[ todoStartHour ] ) {
				todosMap[ todoStartHour ] = [];
			}
			todosMap[ todoStartHour ].push( todo );
		} );

		// @Todo2 loop over timeLine
			// <Timeline mode={'left'}>
			// 	<Timeline.Item label='timeLine'>
			// 		<Link to={`/todos/${todo.id}`}>
			// 			{todo.task}
			// 		</Link>
			// 	</Timeline.Item>
			// </Timeline>
		
		console.log(todosMap);
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
