/* @flow */

import * as React from 'react';
import LinkButton from './LinkButton';
import './styles.css';

type Props = {|
  pagesArray: Array<number>,
  city: number | string,
  query: string,
  currentPage: number,
|};

type State = {};

export default class Pagination extends React.Component<Props, State> {
  render() {
    const { pagesArray, city, query, currentPage } = this.props;
    return pagesArray.map(page => (
      <LinkButton data={{ city, page, query, currentPage }} key={page} />
    ));
  }
}
