import React from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';

export default class Priority extends React.Component {
	constructor( props) {
		super( props );
		this.state = {
			priority: null
		}
	}

	handlePriorityClick( priority ) {
		const { onChange } = this.props;
		this.setState( { priority } );
		onChange( priority );
	}

	render() {
		const { priority } = this.state;

		return(
		<Menu onClick={this.handleClick} selectedKeys={[ priority ]} mode="horizontal">
			<Menu.Item key="primary" onClick={ () => this.handlePriorityClick('primary') }>
				Primary
			</Menu.Item>
			<Menu.Item key="secondary" onClick={ () => this.handlePriorityClick('secondary') }>
				Secondary
			</Menu.Item>
			<Menu.Item key="tertiary" onClick={ () => this.handlePriorityClick('tertiary') }>
				Tertiary
			</Menu.Item>
		</Menu>
		);
	}
}
