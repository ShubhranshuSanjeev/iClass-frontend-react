import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAlert } from "react-alert";

class Alerts extends Component {
	static propTypes = {
		error: PropTypes.object.isRequired,
		message: PropTypes.object.isRequired,
	};

	componentDidUpdate(prevProps) {
		const { error, alert, message } = this.props;
		if (error !== prevProps.error) {
			if (error.msg.non_field_errors)
				alert.error(
					`Auth Error: ${error.msg.non_field_errors.join(" ")}`
				);
		}

		if (message !== prevProps.message) {
			if (message.userRegistered) alert.success(message.userRegistered);
		}
	}
	render() {
		return <Fragment />;
	}
}

const mapStateToProps = state => ({
	error: state.errors,
	message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
