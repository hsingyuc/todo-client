import React from 'react';
import { DatePicker } from 'antd';

export default class StartAndEndDatePicker extends React.Component {
	constructor( props) {
		super( props );
		this.state = {
			dates: []
		}
	}

	handleDateClick( dates) {
		this.setState( { dates } );
	}

	render() {
		const { RangePicker } = DatePicker;

		return(
			<RangePicker onChange={ dates => this.handleDateClick( dates ) } />
		);
	}
}
