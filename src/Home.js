import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
	render() {
		return(
			<div>
				<p>Hello</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todos,
	editingId: state.editingId
  });
  
  export default connect(mapStateToProps)(Home);
