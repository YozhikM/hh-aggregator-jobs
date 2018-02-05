/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Page from './Page';

export default function PageContainer() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Page} />
        <Route path="/:page" component={Page} />
      </div>
    </Router>
  );
}
