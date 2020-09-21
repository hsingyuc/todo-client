import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Todos extends React.PureComponent {
	render() {
		const { todos } = this.props;
		
		if( !todos ) {
			return 'Loading...';
		}
		return(
			<div>
				{todos.map( todo => {
					return(
						<div key={todo.id}>
							<Link to={`/todos/${todo.id}`}>
								{todo.content}
							</Link>
							<p>{todo.filename}</p>
						</div>
					);
				}
				)}
			</div>
		);
	}
}

const mapStateToProp = state => ({
	todos: state.todos
});

export default connect(mapStateToProp)(Todos);