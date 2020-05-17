import React from "react";
import {Link} from 'react-router-dom';

import styles from "./Home.module.css";
import Reading from "../../../assests/reading.svg";
import Graduation from "../../../assests/grad.svg";
import Logo from "../../../assests/logo3.png";

const Home = () => {
	return (
		<>
			<nav className={`navbar navbar-light ${styles.myNav}`}>
				<div className="container">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">
							<img src={Logo} alt="Logo" width="150px"></img>
						</Link>
					</div>
					<ul className="nav navbar-nav d-flex flex-row justify-content-between w-10">
						<li>
							<Link
								className={`btn btn-outline-primary py-2 px-4 ${styles.myNavBtn}`}
								to="register/"
							>
								Sign up
							</Link>
						</li>
						<li>
							<Link
								className="btn btn-outline-success py-2 px-4 my-nav-btn"
								to="login/"
							>
								Log-in
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			<div className={styles.homeWrapper}>
				<div
					className={`container-fluid ${styles.homeBackground}`}
				></div>
				<div className={`container-fluid ${styles.homeContent}`}>
					<div className={`container ${styles.homeImageContainer}`}>
						<img src={Reading} alt="reading" />
					</div>
					<div className={styles.homeTextContainer}>
						<div className={styles.homeTextIcon}>
							<img
								src={Graduation}
								alt="graduation"
								width="300px"
							/>
						</div>
						<div style={{ position: "relative" }}>
							<h1 className={styles.homeText}>
								<span style={{ fontSize: "150px" }}>M</span>anag
								<span className={styles.homeTextHighlight}>
									i
								</span>
								ng
								<br />
								<span className={styles.homeTextHighlight}>
									Class
								</span>
								&nbsp;now easy
							</h1>
							<p className={styles.homeText}>
								Looking for Distance Learning tools? Get <br />
								started with iClass immediately at no cost
								today.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
