import React from 'react';
import { Space, Button, Form } from 'antd';
import Priority from './Priority';
import Task from './Task';
import DateAndTimePicker from './DateAndTimePicker';
import Attachment from './Attachment';
import { addTodo as addTodoAction } from './app/store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class TodoForm extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			priority: '',
			task: '',
			endTime: null,
			startTime: null,
			attachment: null,
			isLoading: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		const { addTodo } = this.props;
		const { priority, task, startTime, endTime, attachment } = this.state;
		const newTodo = {
			priority,
			task,
			startTime,
			endTime,
			attachment
		};
		
		this.setState( { isLoading: true } );
		fetch('http://localhost:3000/todos',{
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newTodo)
		})
			.then( response => {
				if( response.status === 200 ) {
					return response.json();
				}
			} )
			.then( todo => {
				addTodo( todo );
		 		this.setState( { isLoading: false } );
				// Change the route
				this.props.history.push('/');
			} )
	}

	render() {
		const { isLoading } = this.state;
		const { setView } = this.props;
		
		return(
			<div className='todo-form'>
				<h1 className='todo-form-header'>Add</h1>
				<Form method='post' name='forminfo' onFinish={this.handleSubmit}>
					<Space direction="vertical">
						<Form.Item>
							<Priority onChange={priority=>this.setState({priority})}/>
						</Form.Item>
						<Form.Item name="task" rules={[{ required: true, message: 'Please input todo content.' }]}>
							<Task onChange={task=>this.setState({task})}/>
						</Form.Item>
						<Form.Item name="date-and-time" rules={[{ required: true, message: 'Please input the date and time.' }]}>
							<DateAndTimePicker onChange={(startTime, endTime)=>this.setState({startTime, endTime})}/>
						</Form.Item>
						<Form.Item>
							<Attachment onUpload={attachment=>this.setState({attachment})}/>
						</Form.Item>
						<Form.Item>
							<Button type="submit" htmlType="submit" loading={isLoading} onClick={setView}>
								Save	
							</Button>
						</Form.Item>
					</Space>
				</Form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addTodo: todo => dispatch( addTodoAction(todo) )
});

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
  )(TodoForm);