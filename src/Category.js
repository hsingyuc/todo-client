import React from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { addTodo as addTodoAction } from './app/store';

class Category extends React.Component {
	constructor( props) {
		super( props );
		this.state = {
			category: null
		}
	}

	handleCategoryClick(category) {
		this.setState( { category } );
	}

	render() {
		const { category } = this.state;

		return(
		<Menu onClick={this.handleClick} selectedKeys={[category]} mode="horizontal">
			<Menu.Item key="productive" onClick={ () => this.handleCategoryClick('productive')}>
				Productive
			</Menu.Item>
			<Menu.Item key="routine" onClick={ () => this.handleCategoryClick('routine')}>
				Routine
			</Menu.Item>
			<Menu.SubMenu key="others" title="Others">
				<Menu.Item key="meeting" onClick={ () => this.handleCategoryClick('meeting')}>Meeting</Menu.Item>
				<Menu.Item key="event" onClick={ () => this.handleCategoryClick('event')}>Event</Menu.Item>
				<Menu.Item key="climbing" onClick={ () => this.handleCategoryClick('climbing')}>Climbing</Menu.Item>
				<Menu.Item key="gym" onClick={ () => this.handleCategoryClick('gym')}>Gym</Menu.Item>
				<Menu.Item key="grocery" onClick={ () => this.handleCategoryClick('grocery')}>Grocery</Menu.Item>
			</Menu.SubMenu>
		</Menu>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addTodo: todo => dispatch(addTodoAction(todo)),
});

export default connect(null, mapDispatchToProps)(Category);