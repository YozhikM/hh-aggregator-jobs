/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Page from './Page';
import { type Jobs } from './type';

type Props = {};

type State = {
  city: number,
  isLoading?: boolean,
  pages?: number,
  jobs?: Jobs,
};

export default class PageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.initializeArray = this.initializeArray.bind(this);
    this.state = {
      city: 160,
    };
  }

  componentWillMount() {
    const item = localStorage.getItem(`pages_city`);
    if (item) this.setState({ pages: JSON.parse(item) });
  }

  initializeArray: Function;

  initializeArray(start: number = 1, step: number = 1): Array<number> {
    const { pages = 1 } = this.state;
    return Array.from({ length: Math.ceil((pages - start) / step) }).map(
      (v, i) => i * step + start
    );
  }

  render() {
    const { city } = this.state;
    const pagesArray = this.initializeArray();

    return (
      <Router>
        <div>
          <Route exact path="/" component={Page} />
          <Route path="/:city/:page" component={Page} />

          <div className="row flex-center align-bottom">
            {pagesArray.map(page => (
              <Link to={`/${city}/${page}`} key={`${city}${page}`}>
                <button className="btn-small">{page}</button>
              </Link>
            ))}
          </div>
        </div>
      </Router>
    );
  }
}
