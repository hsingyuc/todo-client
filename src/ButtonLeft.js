import React from 'react';
import { ArrowLeft } from '@styled-icons/bootstrap'

export default class ButtonLeft extends React.PureComponent {
	render() {
		const { onClick } = this.props;

		return(
			<div className='btn-container'>
				<button className='btn btn-arrow-left' onClick={ onClick }>
					<ArrowLeft size="25" />
				</button>
				<span className='btn-text'>Todos</span>
			</div>
		); 
	}
}