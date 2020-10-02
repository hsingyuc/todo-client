import React from 'react';
import { DatePicker } from 'antd';

export default class DateAndTimePicker extends React.Component {
	handleDateClick( datesAndTime) {
		const { onChange } = this.props;
		const startTime = datesAndTime[0] ? datesAndTime[0].unix() : null;
		const endTime = datesAndTime[1] ? datesAndTime[1].unix() : null;
		onChange(startTime, endTime);
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
