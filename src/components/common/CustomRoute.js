import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NotFound404 from '../common/404NotFound';
import Loader from "../common/Loader";

const CustomRoute = ({
  component: Component,
  auth,
  guestRoute,
  privateRoute,
  teacherRoute,
  ...rest
}) => {
  if (auth.isLoading) return <Loader />;
  else if (auth.isAuthenticated) {
    if (guestRoute) return <Redirect to="/dashboard" />;
    else {
      if (auth.user.is_student && teacherRoute) return <NotFound404 />;
      return (
        <Route {...rest} render={props => <Component {...props} />} />
      );
    }
  } else {
    if (privateRoute) return <Redirect to="/login" />;
    else
      return (
        <Route {...rest} render={props => <Component {...props} />} />
      );
  }
};

const mapStatetoProps = state => {
  return { auth: state.auth };
};

export default connect(mapStatetoProps)(CustomRoute);
