/* @flow */

import * as React from 'react';
import { type RouterHistory, type Match, type Location } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import 'papercss/dist/paper.min.css';
import JobItem from './JobItem';
import Pagination from './Pagination';
import Select from './Select';
import SearchForm from './SearchForm';
import Checkbox from './Checkbox';
import { citiesOptions, sortOptions } from './options';
import './styles.css';
// import {
//   type PageQueryQueryVariables,
//   type SortFindManyJobInput,
//   type PageQueryQuery,
// } from './type';

type Props = {|
  history: RouterHistory,
  match: Match,
  location: Location,
  data: Object,
|};

type State = {
  page?: string,
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

    this.onChange = debounce(this.onChange, 600);

    this.state = {
      count: 0,
    };

    if (!page) {
      history.push('jobs/160-1');
    }
  }

  static fragments = {
    job: gql`
      fragment JobItem on Job {
        _id
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
    const { data } = nextProps || {};
    const { jobPagination } = data || {};
    const { count, pageInfo } = jobPagination || {};
    const { pageCount } = pageInfo || {};

    if (pageCount && count) {
      this.setState({ pages: pageCount, count });
    } else if (!pageCount && !count) {
      this.setState({ pages: 0, count: 0 });
    }
    if (document.body) document.body.scrollTop = 0;
  }

  initializeArray = (start: number = 1, step: number = 1): Array<number> => {
    const { pages = 1 } = this.state;
    return Array.from({ length: Math.ceil((pages - start) / step + 1) }).map(
      (v, i) => i * step + start
    );
  };

  onSelect = (value: string) => {
    const { history, location } = this.props;
    const query = location.search;

    history.replace(`${value}-1${query}`);
    if (document.body) document.body.scrollTop = 0;
  };

  onChange = (value: string) => {
    const { location, history } = this.props;
    const query = new URLSearchParams(location.search);
    if (!query.has('q')) {
      query.append('q', value);
    } else {
      query.set('q', value);
    }
    history.push({ pathname: location.pathname, search: query.toString() });
  };

  onChangeSort = (value: string) => {
    const { location, history } = this.props;
    const query = new URLSearchParams(location.search);
    if (!query.has('sort')) {
      query.append('sort', value);
    } else {
      query.set('sort', value);
    }
    history.push({ pathname: location.pathname, search: query.toString() });
  };

  onChangeCheckbox = () => {
    const { location, history } = this.props;
    const query = new URLSearchParams(location.search);
    if (!query.has('salaryNotExist')) {
      query.append('salaryNotExist', 'true');
    } else if (query.get('salaryNotExist') === 'true') {
      query.delete('salaryNotExist');
    } else {
      query.set('salaryNotExist', 'true');
    }
    history.push({ pathname: location.pathname, search: query.toString() });
  };

  render() {
    const { data, location, match } = this.props;
    const { params } = match || {};
    const { page } = params || {};

    const { jobPagination } = data || {};
    const { items } = jobPagination || {};
    const { count } = this.state;
    const matchParts = page && page.match(/\d+/gi);
    let city = '160';
    let currentPage = 1;
    if (matchParts) {
      [city, currentPage] = matchParts;
    }
    const pagesArray = this.initializeArray();
    const query = new URLSearchParams(location.search);
    if (!items) return null;

    return (
      <div>
        <div className="row flex-center">
          <Select name="Города" value={city} options={citiesOptions} onSelect={this.onSelect} />
          <Select
            name="Сортировка"
            value={query.get('sort')}
            options={sortOptions}
            onSelect={this.onChangeSort}
          />
        </div>

        <div className="row flex-center">
          <Checkbox
            option={{ name: 'Скрыть без з/п', value: 'true' }}
            query={query.get('salaryNotExist')}
            onChange={this.onChangeCheckbox}
          />
        </div>

        <SearchForm onChange={this.onChange} value={query.get('q')} />

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
          <Pagination
            pagesArray={pagesArray}
            city={city}
            query={query.toString()}
            currentPage={Number(currentPage)}
          />
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

const options = ({ match, location }: Props): { variables: Object } => {
  const { params } = match || {};
  const { page } = params || {};
  let area;
  let pageNumber;
  const query = new URLSearchParams(location.search);
  if (!page) {
    area = '160';
    pageNumber = 1;
  } else if (page) {
    const matchParts = page.match(/\d+/gi);
    if (matchParts) {
      [area, pageNumber] = matchParts;
    }
  }

  let filter;
  if (query.has('q')) {
    filter = { q: query.get('q'), area };
  } else {
    filter = { area };
  }

  if (query.has('salaryNotExist')) {
    filter = { ...filter, salaryNotExist: query.get('salaryNotExist') };
  }

  let sort: string;
  if (query.has('sort')) {
    sort = (query.get('sort'): any);
  } else {
    sort = 'PUBLISHED_AT_DESC';
  }

  return { variables: { page: Number(pageNumber), filter, perPage: 9, sort } };
};

export default graphql(PageQuery, { options })(Page);
