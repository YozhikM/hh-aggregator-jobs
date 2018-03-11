/* @flow */

import * as React from 'react';
import { type RouterHistory, type Match } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import 'papercss/dist/paper.min.css';
import JobItem from './JobItem';
import Pagination from './Pagination';
import Select from './Select';
import type { PageQueryQuery, PageQueryQueryVariables } from './types.flow';

type Props = {|
  history: RouterHistory,
  match: Match,
  data: ?PageQueryQuery,
|};

type State = {
  page: string,
  pages?: number,
  perPage?: number,
  count?: number,
};

class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { history, match } = this.props;
    const { params } = match || {};
    const { page } = params || {};

    if (page) {
      this.state = {
        page,
      };
    } else {
      history.push('160-1');
      this.state = {
        page: '160-1',
      };
    }
  }

  static fragments = {
    job: gql`
      fragment JobItem on Job {
        id
        name
        description
        salary {
          from
          to
          currency
          gross
        }
        snippet {
          responsibility
          requirement
        }
        created_at
        published_at
        employer {
          name
          alternate_url
        }
        address {
          city
          metro {
            station_name
          }
        }
      }
    `,
  };

  componentWillReceiveProps(nextProps: Props) {
    const { data, match } = nextProps || {};
    const { jobPagination } = data || {};
    const { count, pageInfo } = jobPagination || {};
    const { pageCount } = pageInfo || {};
    const { params } = match || {};
    const { page } = params || {};

    if (pageCount && count && page) this.setState({ pages: pageCount, count, page });
    if (document.body) document.body.scrollTop = 0;
  }

  initializeArray = (start: number = 1, step: number = 1): Array<number> => {
    const { pages = 1 } = this.state;
    return Array.from({ length: Math.ceil((pages - start) / step) }).map(
      (v, i) => i * step + start
    );
  };

  onSelect = (value: string) => {
    const { history } = this.props;

    history.replace(`${value}-1`);
    if (document.body) document.body.scrollTop = 0;
  };

  render() {
    const { data } = this.props;
    const { jobPagination } = data || {};
    const { items } = jobPagination || {};
    const { count, page } = this.state;
    const city = page.replace(/-\d/gi, '');
    const pagesArray = this.initializeArray();
    if (!items) return null;

    return (
      <div>
        <Select onSelect={this.onSelect} page={city} />

        {/* <Checkboxes onChange={this.onChangeCheckbox} query={query} /> */}

        {count && (
          <div className="row flex-center">
            <span className="badge">{`${count} jobs`}</span>
          </div>
        )}

        <div className="row">
          {items &&
            items.map(job => {
              if (!job) return null;
              const { id } = job || {};
              return <JobItem key={id} job={job} />;
            })}
        </div>
        <div className="row flex-center align-bottom">
          <Pagination pagesArray={pagesArray} city={city} />
        </div>
      </div>
    );
  }
}

const PageQuery = gql`
  query PageQuery(
    $page: Int
    $perPage: Int
    $filter: FilterFindManyJobInput
    $sort: SortFindManyJobInput
  ) {
    jobPagination(page: $page, perPage: $perPage, filter: $filter, sort: $sort) {
      pageInfo {
        pageCount
        hasNextPage
        currentPage
        hasPreviousPage
        perPage
      }
      count
      items {
        ...JobItem
      }
    }
  }
  ${Page.fragments.job}
`;

const options = ({ match }: { match: Match }): { variables: PageQueryQueryVariables } => {
  const { params } = match || {};
  const { page } = params || {};
  let area;
  let pageNumber;

  if (!page) {
    area = '160';
    pageNumber = 1;
  } else {
    [area = '160', pageNumber = 1] = page.match(/\d+/gi);
  }

  const filter = { area };

  return { variables: { page: Number(pageNumber), filter, perPage: 9, sort: 'PUBLISHED_AT_DESC' } };
};

export default graphql(PageQuery, { options })(Page);
