import React from 'react';
import { Calendar, Badge } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Todos from './Todos';
import * as moment from 'moment';
import TodoForm from './TodoForm';

class Home extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			selectedDate: moment(),
			isTodoForm: false
		};
		this.dateCellRender = this.dateCellRender.bind(this);

		moment.updateLocale( 'en', { weekdaysMin : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] } )
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

	closeTodoForm() {
		this.setState( { isTodoForm: false } );
	}

	render() {
		const { selectedDate, isTodoForm } = this.state;
		const todayTodos = selectedDate ? this.getTodosForDate(selectedDate) : [];

		return(
			<div className='home-container'>
				<div className='home-calendar'>
					<div className="home-calendar_month">{ selectedDate.format('MMMM') }</div>
					<Calendar 
						dateCellRender={this.dateCellRender} 
						onSelect={date=>this.handleSelectedDate(date)}
					/>
					<Link className='btn-add-todo' onClick={()=>this.setState({isTodoForm:true})}>
						<PlusOutlined />
					</Link>
					<div className='btn-search'>
						<SearchOutlined />
					</div>
				</div>
				
				<div className='home-action'>
					{ isTodoForm 
						? <div className='home-todo-form'><TodoForm closeTodoForm={ () => this.closeTodoForm() } /></div>
						: <div className='home-todos'><Todos todos={ todayTodos } /></div>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todos
})

export default connect(mapStateToProps, null)(Home);
