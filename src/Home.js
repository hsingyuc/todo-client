import React from 'react';
import { Calendar, Badge } from 'antd';
import { connect } from 'react-redux';

class Home extends React.Component {
	constructor( props ) {
		super( props );
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
		const listData = this.getTodosForDate(date);
		return (
		  <div>
			{listData.map(item => (
			  <span key={item.id}>
				<Badge status={this.getBadgeStatus(item.priority)}/>
			  </span>
			))}
		  </div>
		);
	}

	render() {
		return(
			<div>
				<Calendar dateCellRender={this.dateCellRender} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todos
})

export default connect(mapStateToProps, null)(Home);
