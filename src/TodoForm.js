import React from 'react';
import { Input, Space, Button, Form } from 'antd';
import Priority from './Priority';
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
			priority: props.priority || '',
			task: props.task || '',
			endTime: null,
			startTime: null,
			attachment: null,
			isLoading: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		const { addTodo, setView } = this.props;
		const { priority, task, startTime, endTime, attachment } = this.state;
		const newTodo = {
			priority,
			task,
			startTime,
			endTime,
			attachment
		};
		
		// @Todo check if id ? todos/id : /todos
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
				setView();
			} )
	}

	render() {
		const { isLoading, task } = this.state;
		
		return(
			<div className='todo-form'>
				<h1 className='todo-form-header'>{ this.props.id ?  'Edit' : 'Add' }</h1>
				<Form method='post' name='forminfo' onFinish={this.handleSubmit} initialValues={ this.state }>
					<Space direction="vertical">
						<Form.Item>
							<Priority onChange={priority=>this.setState({priority})}/>
						</Form.Item>
						<Form.Item name="task" rules={[{ required: true, message: 'Please input todo content.' }]}>
							<Input.TextArea 
								onKeyUp={ event => this.setState({ task: event.target.value }) } 
								placeholder='Up coming event...'
							/>
						</Form.Item>
						<Form.Item name="date-and-time" rules={[{ required: true, message: 'Please input the date and time.' }]}>
							<DateAndTimePicker onChange={(startTime, endTime)=>this.setState({startTime, endTime})}/>
						</Form.Item>
						<Form.Item>
							<Attachment onUpload={attachment=>this.setState({attachment})}/>
						</Form.Item>
						<Form.Item>
							<Button type="submit" htmlType="submit" loading={isLoading}>
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