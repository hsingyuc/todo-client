import React from 'react';
import { removeTodo as removeTodoAction } from './store';
import { connect } from 'react-redux';

class DeleteButton extends React.PureComponent {
	render() {
		const { id, removeTodo } = this.props;

		return(
			<button 
				type="button" 
				className="btn-delete" 
				onClick={ () => {
					fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`, { method: 'delete' })
						.then( () => removeTodo(id) )
				}}
			>
			Remove
			</button>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	removeTodo: id => dispatch(removeTodoAction(id)),
});

export default connect(null, mapDispatchToProps)(DeleteButton);