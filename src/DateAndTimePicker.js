import React from 'react';
import { DatePicker } from 'antd';

export default class DateAndTimePicker extends React.Component {
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
			<RangePicker
				showTime={{ format: 'HH:mm' }}
				format="YYYY-MM-DD HH:mm"
				onChange={ dates => this.handleDateClick( dates ) }
			/>
		);
	}
}
