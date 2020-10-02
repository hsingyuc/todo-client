import React from 'react';
import { Space, Button, Form } from 'antd';
import Category from './Category';
import Priority from './Priority';
import Task from './Task';
import DateAndTimePicker from './DateAndTimePicker';
import Attachment from './Attachment';
import { addTodo as addTodoAction } from './app/store';
import { connect } from 'react-redux';

class TodoForm extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			category: '',
			priority: '',
			task: '',
			endTime: null,
			startTime: null,
			attachment: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		const { addTodo } = this.props;
		const { category, priority, task, startTime, endTime, attachment } = this.state;
		
		const newTodo = {
			category,
			priority,
			task,
			startTime,
			endTime,
			attachment
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
							<DateAndTimePicker onChange={(startTime, endTime)=>this.setState({startTime, endTime})}/>
						</Form.Item>
						<Form.Item>
							<Attachment onUpload={attachment=>this.setState({attachment})}/>
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