import React from 'react';
import Category from './Category';
import Priority from './Priority';
import Task from './Task';
import StartAndEndDatePicker from './StartAndEndDatePicker';

export default class CreateTodo extends React.PureComponent {
	render() {
		return(
			<>
				<Category />
				<Priority />
				<Task />
				<StartAndEndDatePicker />
			</>
		);
	}
}
