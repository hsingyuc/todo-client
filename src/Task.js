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
		const { task } = this.state;
		const { onChange } = this.props;
		this.setState( { task: event.target.value } );
		onChange( task );
	}

	render() {
		const { task } = this.state;

		return(
			<Form>
				<Form.Item name='todo' label="Todo">
					<Input.TextArea onKeyUp={ event => this.handleTaskClick(event) } value={task} />
				</Form.Item>
			</Form>
		);
	}
}
