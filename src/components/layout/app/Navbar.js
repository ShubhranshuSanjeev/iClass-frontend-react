import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchClassrooms } from '../../../actions/classroom';
import { logoutUser } from '../../../actions/index';

import Dropdown from '../Dropdown';
import Logo from "../../../assests/logo3.png";
import styles from "./App.module.css";

class Navbar extends React.Component {

  logout = (event) => {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <>
        <nav className={`navbar px-5 py-0 shadow-sm ${styles.myNav}`}>
          <Link className="navbar-brand" to="/dashboard">
            <img src={Logo} alt="Logo" width="120px"></img>
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item d-flex align-items-center" style={{ height: "60px" }}>
              <Dropdown title="Classrooms" />
            </li>
            <li className="nav-item d-flex align-items-center" style={{ height: "60px" }}>
              <Link className="nav-link px-3" to="/calendar"> Events </Link>
            </li>
            <li className="nav-item d-flex align-items-center" style={{ height: "60px" }}>
              <Link className="nav-link px-3" to="/dashboard"> Messages </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item d-flex align-items-center" style={{ height: "60px" }}>
              <Link className="nav-link px-3" to="/dashboard"> Notification </Link>
            </li>
            <li className="nav-item d-flex align-items-center" style={{ height: "60px" }}>
              <Link className="nav-link px-3" to="/dashboard"> Account </Link>
            </li>
            <li className="nav-item d-flex align-items-center" style={{ height: "60px" }}>
              <a className="nav-link px-3 m-0" onClick={this.logout} href="/"> Logout </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return { classrooms: Object.values(state.classrooms) };
};

export default connect(mapStateToProps, { fetchClassrooms, logoutUser })(Navbar);
