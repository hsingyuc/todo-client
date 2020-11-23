import React from 'react';
import { Input, Space, Button, Form } from 'antd';
import Attachment from './Attachment';
import { addTodo as addTodoAction } from './app/store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Menu } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';

class TodoForm extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			priority: props.priority || '',
			task: props.task || '',
			endTime: props.endTime || null,
			startTime: props.startTime || null,
			attachment: null,
			isLoading: false,
			time: ! props.startTime
				? null
				: [
					moment.unix(props.startTime.toString()),
					moment.unix(props.endTime.toString())
				]
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
		const { isLoading, priority } = this.state;
		const { RangePicker } = DatePicker;

		return(
			<div className='todo-form'>
				<h1 className='todo-form-header'>{ this.props.id ?  'Edit' : 'Add' }</h1>
				<Form method='post' name='forminfo' onFinish={this.handleSubmit} initialValues={ this.state }>
					<Space direction="vertical">
						<Form.Item name="priority">
							<Menu selectedKeys={[ priority ]} mode="horizontal">
								<Menu.Item key="primary" onClick={ () => this.setState( { priority: 'primary' } ) }>
									Primary
								</Menu.Item>
								<Menu.Item key="secondary" onClick={ () => this.setState( { priority: 'secondary' } ) }>
									Secondary
								</Menu.Item>
								<Menu.Item key="tertiary" onClick={ () => this.setState( { priority: 'tertiary' } ) }>
									Tertiary
								</Menu.Item>
							</Menu>
						</Form.Item>
						<Form.Item name="task" rules={[{ required: true, message: 'Please input todo content.' }]}>
							<Input.TextArea 
								onKeyUp={ event => this.setState({ task: event.target.value }) } 
								placeholder='Up coming event...'
							/>
						</Form.Item>
						<Form.Item name="time" rules={[{ required: true, message: 'Please input the date and time.' }]}>
							<RangePicker
								onChange={ datesAndTime => {
									this.setState({
									startTime: datesAndTime[0] ? datesAndTime[0].unix() : null,
									endTime:  datesAndTime[1] ? datesAndTime[1].unix() : null
								}) }}
								showTime={{ format: 'HH:mm' }}
							/>
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