import React from 'react';
import { Space, Button, Form } from 'antd';
import Category from './Category';
import Priority from './Priority';
import Task from './Task';
import DateAndTimePicker from './DateAndTimePicker';
import Attachments from './Attachments';
import { addTodo as addTodoAction } from './app/store';
import { connect } from 'react-redux';

class TodoForm extends React.Component {
	createTodo(todo) {
		const { addTodo } = this.props;
		addTodo(todo);
	}

	render() {
		return(
			<>
				<h1>Add</h1>
				<Form>
					<Space direction="vertical">
						<Form.Item>
							<Category />
						</Form.Item>
						<Form.Item>
							<Priority />
						</Form.Item>
						<Form.Item>
							<Task />
						</Form.Item>
						<Form.Item>
							<DateAndTimePicker />
						</Form.Item>
						<Form.Item>
							<Attachments />
						</Form.Item>
						<Form.Item>
							<Button type="link" htmlType="submit" onClick={todo=>this.createTodo(todo)}>
								Save
							</Button>
						</Form.Item>
					</Space>
				</Form>
			</>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addTodo: todo => dispatch( addTodoAction(todo) )
});

export default connect( null, mapDispatchToProps )(TodoForm);