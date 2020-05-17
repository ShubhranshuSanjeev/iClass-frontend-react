import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions";
import { withAlert } from "react-alert";

import AuthWrapper from "./AuthWrapper";
import styles from "./AuthForm.module.css";

class Login extends Component {
	state = {
		email: "",
		password: "",
	};

	onSubmit = event => {
		event.preventDefault();
		const { email, password } = this.state;
		if (!email || !password) {
			this.props.alert.error("Please fill all required fields");
		} else this.props.loginUser(this.state);
	};

	onChange = event => {
		this.setState({
			...this.state,
			[event.target.name]: event.target.value,
		});
	};

	render() {
		return (
			<AuthWrapper>
				<h5 className={`card-title mb-3 ml-4 ${styles.cardTitle}`}>
					Account Login
					<span className={styles.cardSubTitle}>
						<Link to="/register">&nbsp;&nbsp;or Register</Link>
					</span>
				</h5>
				<div className={`card-body px-2 mt-5 ${styles.formText}`}>
					<form className="px-3 w-100" onSubmit={this.onSubmit}>
						<div className="form-group mt-4">
							<label htmlFor="email">Email</label>
							<input
								name="email"
								type="email"
								className="form-control form-control"
								id="email"
								value={this.state.email}
								onChange={this.onChange}
							/>
						</div>
						<div className="form-row form-group mt-4">
							<div className="col">
								<label htmlFor="password">Password</label>
								<input
									name="password"
									type="password"
									className="form-control"
									id="password"
									value={this.state.password}
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="form-group row mt-4 justify-content-center">
							<div className="col-sm-9 d-flex justify-content-center">
								<button
									type="submit"
									className={`btn btn-success btn-lg py-2 px-5 ${styles.myBtn}`}
								>
									Log in
								</button>
							</div>
						</div>
					</form>
				</div>
			</AuthWrapper>
		);
	}
}

export default connect(null, { loginUser })(withAlert()(Login));
