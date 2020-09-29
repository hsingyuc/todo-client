import React from 'react';
import { DatePicker } from 'antd';

export default class DateAndTimePicker extends React.Component {
	constructor( props) {
		super( props );
		this.state = {
			datesAndTime: []
		}
	}

	handleDateClick( datesAndTime) {
		const { onChange } = this.props;
		this.setState( { datesAndTime } );
		onChange(datesAndTime);
	}

	render() {
		const { RangePicker } = DatePicker;

		return(
			<RangePicker
				showTime={{ format: 'HH:mm' }}
				format="YYYY-MM-DD HH:mm"
				onChange={ datesAndTime => this.handleDateClick( datesAndTime ) }
			/>
		);
	}
}
