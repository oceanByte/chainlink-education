import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { hasAuthData } from '../../helpers/authStorage';

const PrivateRoute = ({ children, ...rest }: RouteProps) => (
  <Route
    {...rest}
    render={(props) =>
      hasAuthData() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;