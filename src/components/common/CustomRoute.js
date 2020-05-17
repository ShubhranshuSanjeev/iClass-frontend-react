import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Loader from "../common/Loader";

const CustomRoute = ({
  component: Component,
  auth,
  guestRoute,
  privateRoute,
  ...rest
}) => {
  console.log('Intial', rest);
  if (auth.isLoading) return <Loader />;
  else if (auth.isAuthenticated) {
    console.log('Authenticated', rest);
    if (guestRoute) return <Redirect to="/dashboard" />;
    else
      return (
        <Route {...rest} render={props => <Component {...props} />} />
      );
  } else {
    console.log('Not Authenticated', rest);
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
