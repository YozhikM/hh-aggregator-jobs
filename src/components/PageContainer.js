/* @flow */

import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import 'papercss/dist/paper.min.css';
import './styles.css';

import Loader from './Loader';

const Page = Loadable({
  loader: () => import('./Page'),
  loading: Loader,
});

const JobPage = Loadable({
  loader: () => import('./JobPage'),
  loading: Loader,
});

export default function PageContainer() {
  return (
    <Router>
      <div
        style={{
          background: 'linear-gradient(135deg, #3023ae 0%,#c86dd7 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        }}
      >
        <Route exact path="/" component={Page} />
        <Route path="/jobs/:page" component={Page} />
        <Route path="/job/:id" component={JobPage} />
      </div>
    </Router>
  );
}
