import React, { Component } from "react";
import { connect } from "react-redux";

import { loadUser } from "../actions";
import Home from "./layout/Home/Home";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layout/Alerts";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import CustomRoute from "./common/CustomRoute";
import { BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./layout/app/Dashboard";
import Navbar from "./layout/app/Navbar";
import Classroom from './layout/app/Classroom';

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

class App extends Component {
  state = { flag: 0 }

  componentDidMount() {
    this.props.loadUser();
    this.setState({ flag: 1 });
  }

  getNavbar() {
    if (this.props.auth.isAuthenticated) return <Navbar />;
  }

  getRoutes() {
    if (this.state.flag) {
      return (
        <Switch>
          <CustomRoute path="/" exact component={Home} guestRoute />
          <CustomRoute path="/register" exact component={SignUp} guestRoute />
          <CustomRoute path="/login" exact component={Login} guestRoute />
          <CustomRoute path="/dashboard" exact component={Dashboard} privateRoute />
          <CustomRoute path="/classrooms/:id" exact component={Classroom} privateRoute />
        </Switch>
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          {this.getNavbar()}
          <Alerts />
          {this.getRoutes()}
        </AlertProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { loadUser })(App);
