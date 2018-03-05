/* @flow */

import * as React from 'react';
import { type RouterHistory, type Match } from 'react-router-dom';
import 'papercss/dist/paper.min.css';
import Select from './Select';
import JobItem from './JobItem';
import Checkboxes from './Checkboxes';
import Pagination from './Pagination';
import { type Jobs } from '../type';

type Props = {|
  history: RouterHistory,
  match: Match,
|};

type State = {
  page: string,
  pages?: number,
  jobs?: Jobs,
  perPage?: number,
  count?: number,
  query: string,
};

export default class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.fetchJob = this.fetchJob.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.initializeArray = this.initializeArray.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);

    const { history, match } = this.props;
    const { params } = match || {};
    const { page } = params || {};

    if (page) {
      this.state = {
        page,
        query: 'frontend',
      };
    } else {
      history.push('160-1');
      this.state = {
        page: '160-1',
        query: 'frontend',
      };
    }
    this.fetchData();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.match.params !== this.props.match.params) {
      const { match } = nextProps;
      const { params } = match || {};
      const { page } = params || {};
      if (page) this.setState({ page }, () => this.fetchData());
    }
  }

  onSelect: string => void;

  onSelect(city: string) {
    const { history } = this.props;
    this.setState({ page: `${city}-1` }, () => {
      history.replace(`${city}-1`);
      this.fetchData();
    });
  }

  fetchData: Function;

  fetchData() {
    const { page, query } = this.state;

    let perPage = 0;

    if (document.body) {
      const cw = document.body.clientWidth;
      if (cw <= 768) perPage = 6;
      if (cw >= 769 && cw <= 1199) perPage = 8;
      if (cw >= 1200) perPage = 9;
    }

    const city = page.replace(/-\d/gi, '');
    const currentPage = page.replace(/\d+-/gi, '');

    const url = `https://api.hh.ru/vacancies?text=${query}&area=${city}&per_page=${perPage}&page=${currentPage}&order_by=publication_time`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { items, pages, found } = data || {};
        this.setState(
          {
            jobs: items,
            count: found,
            pages,
          },
          () => {
            if (document.body) document.body.scrollTop = 0;
          }
        );
      })
      .catch(err => console.log(err));
  }

  initializeArray: (?number, ?number) => Array<number>;

  initializeArray(start: number = 1, step: number = 1): Array<number> {
    const { pages = 1 } = this.state;
    return Array.from({ length: Math.ceil((pages - start) / step) }).map(
      (v, i) => i * step + start
    );
  }

  fetchJob: (string, number) => void;

  fetchJob(jobUrl: string, index: number) {
    fetch(jobUrl)
      .then(res => res.json())
      .then(data => {
        const { jobs } = this.state;
        if (!jobs) return;

        const { description, apply_alternate_url } = data || {};
        const newJob = jobs[index];
        newJob.fullDescription = description;
        newJob.response = apply_alternate_url;
        const copyJobs = jobs.slice();
        copyJobs.splice(index, 1, newJob);

        this.setState({ jobs: copyJobs });
      })
      .catch(err => console.error(err));
  }

  onChangeCheckbox: () => void;

  onChangeCheckbox(query: string) {
    this.setState({ query }, () => this.fetchData());
  }

  render() {
    const { jobs, count, page, query } = this.state;
    const city = page.replace(/-\d/gi, '');
    const pagesArray = this.initializeArray();
    if (!jobs) return null;

    return (
      <div>
        <Select onSelect={this.onSelect} page={page} />

        <Checkboxes onChange={this.onChangeCheckbox} query={query} />

        {count && (
          <div className="row flex-center">
            <span className="badge">{`${count} jobs`}</span>
          </div>
        )}

        <div className="row">
          {jobs.map((job, i) => {
            const { id } = job || {};
            return <JobItem key={id} job={job} index={i} fetchJob={this.fetchJob} />;
          })}
        </div>
        <div className="row flex-center align-bottom">
          <Pagination pagesArray={pagesArray} city={city} />
        </div>
      </div>
    );
  }
}
