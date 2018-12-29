import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'dva/router';
import MainPage from './routes/main';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={MainPage} />
      </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RouterConfig;
