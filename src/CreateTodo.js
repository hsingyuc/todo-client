import React from 'react';
import Category from './Category';
import Priority from './Priority';
import Task from './Task';

export default class CreateTodo extends React.PureComponent {
	render() {
		return(
			<>
				<Category />
				<Priority />
				<Task />
			</>
		);
	}
}
