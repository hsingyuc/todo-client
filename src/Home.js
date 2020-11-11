import React from 'react';
import { Calendar, Badge } from 'antd';
import { connect } from 'react-redux';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import * as moment from 'moment';
import HomeAction from './HomeAction';

class Home extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			selectedDate: moment(),
			view: 'todos',
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

	render() {
		const { selectedDate, view } = this.state;

		return(
			<div className='home-container'>
				<div className='home-calendar'>
					<div className="home-calendar_month">{ selectedDate.format('MMMM') }</div>
					<Calendar 
						dateCellRender={ this.dateCellRender } 
						onSelect={ date => this.handleSelectedDate(date) }
					/>
					<button className='btn-add-todo' onClick={ () => this.setState( { view: 'todo-form' } ) }>
						<PlusOutlined />
					</button>
					<button className='btn-search' onClick={ () => this.setState( { view: 'search' } ) }>
						<SearchOutlined />
					</button>
				</div>
				
				<div className='home-action'>
					<HomeAction 
						selectedDate = { selectedDate }
						getTodosForDate = { date => this.getTodosForDate(date) }
						view = { view }
						setView = { (v) => this.setState( { view: v } ) }
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todos
})

export default connect(mapStateToProps, null)(Home);
