import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { HomeContainer as Home } from './modules/home/containers/HomeContainer';
import { TodoAddContainer as TodoAdd } from './modules/todo/containers/TodoAddContainer';
import { TodoListContainer as TodoList } from './modules/todo/containers/TodoListContainer';
import { routes } from './routes';

/** Routes are structured here, and declared at routes.json */
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: routes.HOME }} />
        </Route>
        <Route path={routes.HOME}>
          <Home />
        </Route>
        <Route path={routes.TODO__ADD}>
          <TodoAdd />
        </Route>
        <Route path={routes.TODO__LIST}>
          <TodoList />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
