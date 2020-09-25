import React from 'react';
import { Space } from 'antd';
import Category from './Category';
import Priority from './Priority';
import Task from './Task';
import DateAndTimePicker from './DateAndTimePicker';
import Attachments from './Attachments';

export default class CreateTodo extends React.PureComponent {
	render() {
		return(
			<Space direction="vertical">
				<Category />
				<Priority />
				<Task />
				<DateAndTimePicker />
				<Attachments />
			</Space>
		);
	}
}
