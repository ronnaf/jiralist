import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Environment } from '../../Environment';
import { jStorageKeys } from '../../services/LocalStorageService';

interface Props extends RouteProps {}

/**
 * A wrapper for <Route> that redirects to the login screen
 * if you're not yet authenticated.
 * @param children
 * @param rest
 * @constructor
 */
export const PrivateRoute: React.FC<Props> = ({ children, component: Component, ...rest }) => {
  const { services } = Environment.current();
  const isAuthenticated = !!services.storage.getToken(jStorageKeys.J_API_TOKEN);
  return (
    <Route
      render={props =>
        isAuthenticated ? (
          children || (Component && <Component {...props} />)
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
      {...rest}
    />
  );
};
