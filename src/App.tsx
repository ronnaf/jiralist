import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './modules/core/PrivateRoute';
import { HomeContainer } from './modules/home/containers/HomeContainer';
import { LoginContainer } from './modules/login/containers/LoginContainer';
import { TodoAddContainer } from './modules/todo/containers/TodoAddContainer';
import { TodoListContainer } from './modules/todo/containers/TodoListContainer';
import { routes } from './routes';

/** Routes are structured here, and declared at routes.json */
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: routes.PROJECTS }} />
        </Route>
        <Route path={routes.LOGIN} component={LoginContainer} />
        <PrivateRoute path={routes.PROJECTS} component={HomeContainer} />
        <PrivateRoute path={routes.TODO__ADD} component={TodoAddContainer} />
        <PrivateRoute path={routes.TODO__LIST} component={TodoListContainer} />
      </Switch>
    </Router>
  );
};

export default App;
