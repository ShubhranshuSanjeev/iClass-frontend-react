import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

import history from '../history';
import { loadUser } from "../actions";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layout/Alerts";
import Home from "./layout/Home/Home";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import CustomRoute from "./common/CustomRoute";
import Dashboard from "./layout/app/Dashboard";
import Navbar from "./layout/app/Navbar";
import Classroom from './layout/app/Classroom';
import JoinClass from './layout/app/JoinClass';
import AssignmentsCreate from './layout/app/AssignmentsCreate';
import ClassroomsCreate from './layout/app/ClassroomsCreate';
import ReferenceMaterialsCreate from "./layout/app/ReferenceMaterialsCreate";
import Assignment from './layout/app/AssignmentEditDeleteDetail';
import ReferenceMaterial from './layout/app/ReferenceMaterialsEditDeleteDetail';

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
          <CustomRoute path="/classrooms" exact component={ClassroomsCreate} privateRoute />
          <CustomRoute path="/classrooms/:id" exact component={Classroom} privateRoute />
          <CustomRoute path="/join-classroom" exact component={JoinClass} privateRoute />
          <CustomRoute path="/classrooms/:classroomId/assignments" exact component={AssignmentsCreate} privateRoute teacherRoute />
          <CustomRoute path="/classrooms/:classroomId/assignments/:id" exact component={Assignment} privateRoute teacherRoute />
          <CustomRoute path="/classrooms/:classroomId/referenceMaterials" exact component={ReferenceMaterialsCreate} privateRoute teacherRoute />
          <CustomRoute path="/classrooms/:classroomId/referenceMaterials/:id" exact component={ReferenceMaterial} privateRoute teacherRoute />
        </Switch>
      );
    }
  }

  render() {
    return (
      <Router history={history}>
        <AlertProvider template={AlertTemplate} {...options}>
          {this.getNavbar()}
          <Alerts />
          {this.getRoutes()}
        </AlertProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { loadUser })(App);
