/* @flow */

import * as React from 'react';
import { type RouterHistory, type Match, Link } from 'react-router-dom';
import 'papercss/dist/paper.min.css';
import Select from './Select';
import { type Jobs } from './Type';

type Props = {|
  history: RouterHistory,
  match: Match,
  location: Location,
|};

type State = {
  city: string | number,
  page: string | number,
  pages?: number,
  jobs?: Jobs,
  perPage?: number,
  count?: number,
};

type Salary = ?{|
  +to: ?number,
  +gross: boolean,
  +from: ?number,
  +currency: string,
|};

const badges = [
  { name: 'react', color: 'success' },
  { name: 'javascript', color: 'secondary' },
  { name: 'vue', color: 'secondary' },
  { name: 'angular', color: 'secondary' },
  { name: 'jquery', color: 'warning' },
  { name: 'php', color: 'danger' },
  { name: 'junior', color: 'success' },
];

export default class Page extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.getSalary = this.getSalary.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getBadges = this.getBadges.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.initializeArray = this.initializeArray.bind(this);

    const { history, match } = this.props;
    const { params } = match || {};
    const { city, page } = params || {};

    if (city && page) {
      this.state = {
        city,
        page,
      };
    } else {
      history.push('160/1');
      this.state = {
        city: 160,
        page: 1,
      };
    }
    this.fetchData();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.match.params !== this.props.match.params) {
      const { match } = nextProps;
      const { params } = match || {};
      const { city, page } = params || {};
      if (city && page) this.setState({ city, page }, () => this.fetchData());
    }
  }

  onSelect: string => void;

  onSelect(city: string) {
    this.setState({ city, page: 1 }, () => {
      this.fetchData();
    });
  }

  getSalary: Salary => string;

  getSalary(salary: Salary): string {
    const { from, to, currency } = salary || {};

    if (from && to && currency) return `от ${from} до ${to} ${currency}`;
    if (from && !to && currency) return `от ${from} ${currency}`;
    if (!from && to && currency) return `до ${to} ${currency}`;
    return `не указана`;
  }

  getBadges: string => React.Node;

  getBadges(string: string): ?React.Node {
    const arr = badges
      .map(badge => {
        const reg = new RegExp(badge.name, 'gi');
        if (string.match(reg)) return badge;
        return null;
      })
      .filter(Boolean);
    if (arr.length > 0) {
      return (
        <div>
          {arr.map(a => (
            <span key={a.name} style={{ marginRight: '10px' }} className={`badge ${a.color}`}>
              {a.name}
            </span>
          ))}
        </div>
      );
    }
    return null;
  }

  fetchData: Function;

  fetchData() {
    const { city, page } = this.state;

    let perPage = 0;

    if (document.body) {
      const cw = document.body.clientWidth;
      if (cw <= 768) perPage = 6;
      if (cw >= 769 && cw <= 1199) perPage = 8;
      if (cw >= 1200) perPage = 9;
    }

    const url = `https://api.hh.ru/vacancies?text=javascript&area=${city}&per_page=${perPage}&page=${page}&order_by=publication_time`;
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

  render() {
    const { jobs, city, count } = this.state;
    const pagesArray = this.initializeArray();
    if (!jobs) return null;

    return (
      <div>
        <Select onSelect={this.onSelect} />

        {count && (
          <div className="row flex-center">
            <span className="badge">{`${count} jobs`}</span>
          </div>
        )}

        <div className="row">
          {jobs.map(job => {
            const { id, name, salary, snippet, employer, alternate_url: jobUrl } = job || {};
            const { requirement, responsibility } = snippet || {};
            const { alternate_url: companyUrl, name: companyName } = employer || {};

            return (
              <div className="sm-12 md-6 lg-4 col align-top" key={id}>
                <div className="card">
                  <div className="card-header">
                    {this.getBadges(name + requirement + (responsibility || ''))}
                    <h4 className="card-subtitle" style={{ fontFamily: '"Neucha",sans-serif' }}>
                      {name}
                    </h4>
                    <p className="card-text">
                      <strong>Зарплата: </strong>
                      {this.getSalary(salary)}
                    </p>
                  </div>
                  <div className="card-body">
                    <a href={companyUrl} className="card-text">
                      {companyName}
                    </a>
                    <div className="margin">
                      {requirement && (
                        <div>
                          <strong>Требования: </strong>
                          <p className="card-text">{requirement.replace(/<[^>]+>/g, '')}</p>
                        </div>
                      )}
                      {responsibility && (
                        <div>
                          <strong>Обязанности: </strong>
                          <p className="card-text">{responsibility.replace(/<[^>]+>/g, '')}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-center row">
                      <a href={jobUrl} target="_blank" className="paper-btn">
                        Откликнуться
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row flex-center align-bottom">
          {pagesArray.map(page => (
            <Link to={`/${city}/${page}`} key={`${city}${page}`}>
              <button className="btn-small">{page}</button>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
