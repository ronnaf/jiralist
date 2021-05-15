import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {}

/**
 * A wrapper for <Route> that redirects to the login screen
 * if you're not yet authenticated.
 * @param children
 * @param rest
 * @constructor
 */
const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  let isAuthenticated = true;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
