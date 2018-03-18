/* @flow */

import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {|
  data: {|
    city: number | string,
    page: number,
    query: string,
  |},
|};

export default function LinkButton(props: Props) {
  const { data } = props;
  const { city, page, query } = data || {};

  return (
    <Link to={`/jobs/${city}-${page}?${query}`} key={`${city}${page}`}>
      <button className="btn-small">{page}</button>
    </Link>
  );
}
