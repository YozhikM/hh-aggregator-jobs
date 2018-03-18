/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Page from './Page';
import JobPage from './JobPage';

export default function PageContainer() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Page} />
        <Route path="/jobs/:page" component={Page} />
        <Route path="/job/:id" component={JobPage} />
      </div>
    </Router>
  );
}
