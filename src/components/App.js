import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import GlobalStyleProvider from '../GlobalStyleProvider';
import ErrorBoundary from './ErrorBoundry';
import Form from './Form';

export default function App() {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <GlobalStyleProvider />
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/form/:id?" component={Form} />
          </Switch>
        </Router>
      </ErrorBoundary>
    </React.Fragment>
  );
}
