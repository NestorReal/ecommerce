/**
 *
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../../utils/auth';

const checkTokenExpiration = () => {
  try {
    if (auth.getToken()) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};
/* eslint-disable react/prefer-stateless-function */
const redirect = (checkToken, location, Component, props) => {
  if (checkToken) {
    return <Component {...props} />;
  }
  return (
    <Redirect
      to={{
        pathname: '/auth',
        state: { from: location, expired: true },
      }}
    />
  );
};
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      redirect(
        checkTokenExpiration(),
        props.location.pathname,
        Component,
        props,
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default ProtectedRoute;
