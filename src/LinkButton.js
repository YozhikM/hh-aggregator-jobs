/* @flow */

import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {|
  data: {|
    city: number | string,
    page: number,
  |},
|};

export default function LinkButton(props: Props) {
  const { data } = props;
  const { city, page } = data || {};

  return (
    <Link to={`/${city}-${page}`} key={`${city}${page}`}>
      <button className="btn-small">{page}</button>
    </Link>
  );
}
