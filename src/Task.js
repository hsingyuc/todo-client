import React from 'react';
import { Form, Input } from 'antd';

export default class Task extends React.Component {
	constructor( props) {
		super( props );
		this.state = {
			task: ""
		}
	}

	handleTaskClick( event ) {
		this.setState( { task: event.target.value } );
	}

	render() {
		const { task } = this.state;

		return(
			<Form>
				<Form.Item name='todo' label="Todo">
					<Input.TextArea onChange={ event => this.handleTaskClick(event) } value={task} />
				</Form.Item>
			</Form>
		);
	}
}
