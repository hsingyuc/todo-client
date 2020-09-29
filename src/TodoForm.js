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
	constructor( props ) {
		super( props );
		this.state = {
			category: '',
			priority: '',
			task: '',
			datesAndTime: '',
			attachments: []
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		const { addTodo } = this.props;
		const { category, priority, task, datesAndTime, attachments } = this.state;
		const newTodo = {
			category,
			priority,
			task,
			datesAndTime,
			attachments
		};
 		addTodo( newTodo );
	}

	render() {
		return(
			<>
				<h1>Add</h1>
				<Form method='post' name='forminfo' onFinish={this.handleSubmit}>
					<Space direction="vertical">
						<Form.Item>
							<Category onChange={category=>this.setState({category})}/>
						</Form.Item>
						<Form.Item>
							<Priority onChange={priority=>this.setState({priority})}/>
						</Form.Item>
						<Form.Item>
							<Task onChange={task=>this.setState({task})}/>
						</Form.Item>
						<Form.Item>
							<DateAndTimePicker onChange={datesAndTime=>this.setState({datesAndTime})}/>
						</Form.Item>
						<Form.Item>
							<Attachments />
						</Form.Item>
						<Form.Item>
							<Button type="submit" htmlType="submit">
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