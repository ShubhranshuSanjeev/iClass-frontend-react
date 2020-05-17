import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

import { registerUser } from "../../actions";
import AuthWrapper from "./AuthWrapper";
import styles from "./AuthForm.module.css";

class SignUp extends Component {
	state = {
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		password2: "",
		role: "",
	};

	onSubmit = event => {
		event.preventDefault();
		const {
			first_name,
			username,
			email,
			password,
			password2,
			role,
		} = this.state;
		if (!first_name || !username || !email || !password || !role) {
			this.props.alert.error("Fill all required fields");
		} else if (password !== password2) {
			this.props.alert.error("Passwords didn't match");
		} else this.props.registerUser(this.state);
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
					Account Register
					<span className={styles.cardSubTitle}>
						<Link to="/login">&nbsp;&nbsp;or Login</Link>
					</span>
				</h5>
				<div className={`card-body px-2 ${styles.formText}`}>
					<form className="px-3" onSubmit={this.onSubmit}>
						<div className="form-row form-group">
							<div className="col">
								<label htmlFor="first_name">
									First Name{" "}
									<span
										style={{
											color: "red",
											fontSize: "100%",
										}}
									>
										*
									</span>
								</label>
								<input
									name="first_name"
									type="text"
									className="form-control"
									id="first_name"
									value={this.state.first_name}
									onChange={this.onChange}
								/>
							</div>
							<div className="col">
								<label htmlFor="first_name">Last Name</label>
								<input
									name="last_name"
									type="text"
									className="form-control"
									id="last_name"
									value={this.state.last_name}
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="form-group mt-4">
							<label htmlFor="username">
								Username{" "}
								<span
									style={{
										color: "red",
										fontSize: "100%",
									}}
								>
									*
								</span>
							</label>
							<input
								name="username"
								type="text"
								className="form-control form-control"
								id="username"
								value={this.state.username}
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group mt-4">
							<label htmlFor="email">
								Email{" "}
								<span
									style={{
										color: "red",
										fontSize: "100%",
									}}
								>
									*
								</span>
							</label>
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
								<label htmlFor="password">
									Password{" "}
									<span
										style={{
											color: "red",
											fontSize: "100%",
										}}
									>
										*
									</span>
								</label>
								<input
									name="password"
									type="password"
									className="form-control"
									id="password"
									value={this.state.password}
									onChange={this.onChange}
								/>
							</div>
							<div className="col">
								<label htmlFor="password2">
									Confirm Password{" "}
									<span
										style={{
											color: "red",
											fontSize: "100%",
										}}
									>
										*
									</span>
								</label>
								<input
									name="password2"
									type="password"
									className="form-control"
									id="password2"
									value={this.state.password2}
									onChange={this.onChange}
								/>
							</div>
						</div>

						<div className="form-group mt-4">
							<p className="mb-1">
								Choose your role:{" "}
								<span
									style={{
										color: "red",
										fontSize: "100%",
									}}
								>
									*
								</span>
							</p>
							<div className="form-check ml-3">
								<input
									className="form-check-input"
									type="radio"
									name="role"
									id="student"
									value="student"
									onChange={this.onChange}
									checked={this.state.role === "student"}
								/>
								<label
									className="form-check-label"
									htmlFor="student"
								>
									Student
								</label>
							</div>
							<div className="form-check mt-2 ml-3">
								<input
									className="form-check-input"
									type="radio"
									name="role"
									id="teacher"
									value="teacher"
									onChange={this.onChange}
									checked={this.state.role === "teacher"}
								/>
								<label
									className="form-check-label"
									htmlFor="teacher"
								>
									Teacher
								</label>
							</div>
						</div>
						<div className="form-group row mt-4 justify-content-center">
							<div className="col-sm-9 d-flex justify-content-center">
								<button
									type="submit"
									className={`btn btn-success btn-lg py-2 px-5 ${styles.myBtn}`}
								>
									Sign Up
								</button>
							</div>
						</div>
					</form>
				</div>
			</AuthWrapper>
		);
	}
}

export default connect(null, { registerUser })(withAlert()(SignUp));
