/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Dashboard from 'containers/Dashboard';
import Login from 'containers/Login';
import ProtectedRoute from 'components/ProtectedRoute';
import ProductDetails from 'containers/ProductDetails';
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/auth" component={Login} />
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute exact path="/product/:id" component={ProductDetails} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
