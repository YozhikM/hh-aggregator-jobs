/* @flow */

import * as React from 'react';
import { Link } from 'react-router';
import 'papercss/dist/paper.min.css';

type Props = {
  pages?: Array<number>,
  city?: number,
};

export default class Nav extends React.Component<Props, void> {

  render() {
    const { pages, city } = this.props;
    if (!pages || !city) return null;

    return (
      <div className="row flex-center align-bottom">
        {pages.map(page => {
          return (
            <Link to={`/${city}/${page}`} key={`${city}${page}`}>
              <button className="btn-small">
                {page}
              </button>
            </Link>
          );
        })}
      </div>
    );
  }
}
