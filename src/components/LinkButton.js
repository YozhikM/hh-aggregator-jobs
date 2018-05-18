/* @flow */

import * as React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

type Props = {|
  data: {|
    city: number | string,
    page: number,
    query: string,
    currentPage: number,
  |},
|};

export default function LinkButton(props: Props) {
  const { data } = props;
  const { city, page, query, currentPage } = data || {};

  return (
    <Link to={`/jobs/${city}-${page}?${query}`} key={`${city}${page}`}>
      <button
        className="btn-small"
        style={page === currentPage ? { backgroundColor: '#41403e', color: '#fff' } : {}}
      >
        {page}
      </button>
    </Link>
  );
}
