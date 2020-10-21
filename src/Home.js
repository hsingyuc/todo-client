import React from 'react';
import { Calendar, Badge } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { PlusCircleFilled } from '@ant-design/icons';
import Todos from './Todos';
import * as moment from 'moment';

class Home extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			selectedDate: moment()
		};
		this.dateCellRender = this.dateCellRender.bind(this);
	}

	getTodosForDate(date) {
		const startOfDay = date.startOf('day').unix();
		const endOfDay = date.endOf('day').unix();
		const { todos } = this.props;
		
		if ( !todos ) {
			alert('No todos!');
		}
		return todos.filter( todo => {
			return ( todo.startTime >= startOfDay && todo.startTime <= endOfDay ) ||
			( todo.endTime <= endOfDay && todo.endTime >= startOfDay ) ||
			( startOfDay >= todo.startTime && startOfDay <= todo.endTime );
		} );
	}
	
	getBadgeStatus( priority ) {
		if ( 'primary' === priority )  {
			return 'error';
		}
		if ( 'secondary' === priority )  {
			return 'warning';
		}
		if ( 'tertiary' === priority )  {
			return 'success';
		}
	}

	dateCellRender(date) {
		const filteredTodos = this.getTodosForDate(date);

		return (
		  <>
			{filteredTodos.map(item => (
			  <span key={item.id}>
				<Badge status={this.getBadgeStatus(item.priority)}/>
			  </span>
			))}
		  </>
		);
	}

	handleSelectedDate(date) {
		this.setState( { selectedDate: date } );
	}

	render() {
		const { selectedDate } = this.state;
		const todayTodos = selectedDate ? this.getTodosForDate(selectedDate) : [];

		return(
			<div className='home-container'>
				<div className='home-calendar'>
					<Calendar dateCellRender={this.dateCellRender} onSelect={date=>this.handleSelectedDate(date)}/>
					<Link to="/add" className='btn-add-todo'>
						<PlusCircleFilled />
					</Link>
				</div>
				<div className='home-todo'>
					<Todos todos={ todayTodos } />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todos
})

export default connect(mapStateToProps, null)(Home);
