import React from 'react';
import { Link } from 'react-router-dom';

export default class Todos extends React.PureComponent {
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
				{todos.map( todo => {
					return(
						<div key={todo.id}>
							<h1>
								<Link to={`/todos/${todo.id}`}>
									{todo.task}
								</Link>
							</h1>
							{todo.startTime}
							{todo.endTime}
						</div>
					);
				}
				)}
			</div>
		);
	}
}
