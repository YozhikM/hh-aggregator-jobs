/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';
import { type Jobs } from './type';
import { type Location, type RouterHistory } from 'react-router-dom';

type Props = {
  history: RouterHistory,
  location: Location,
};

type State = {
  city: string | number,
  page: string | number,
  jobs?: Jobs,
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
  fetchData: Function;
  getSalary: Salary => string;
  getBadges: string => React.Node;

  constructor(props: Props) {
    super(props);

    this.getSalary = this.getSalary.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getBadges = this.getBadges.bind(this);

    const { location, history } = this.props;
    const { pathname: path } = location || {};
    if (path !== '/') {
      const { city, page } = this.getRouteDate(path);
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

  componentDidUpdate(nextProps: Props) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { city, page } = this.getRouteDate(nextProps.location.pathname);
      this.setState({ city, page }, () => this.fetchData());
    }
  }

  getRouteDate(pathname: string): { city: string | number, page: string | number } {
    const { location } = this.props;
    const { pathname: path } = location || {};
    const pathArr = [];
    if (path) {
      pathArr.push(...path.split('/').filter(Boolean));
    }
    return { city: pathArr[0], page: pathArr[1] };
  }

  fetchData(perPage: number = 9) {
    const { city, page } = this.state;
    fetch(
      `https://api.hh.ru/vacancies?text=frontend+javascript&area=${city}&per_page=${perPage}&page=${page}&order_by=publication_time`
    )
      .then(res => res.json())
      .then(data => {
        const { items, pages } = data || {};
        localStorage.setItem(`pages_city`, JSON.stringify(pages));
        this.setState(
          {
            jobs: items,
          },
          () => {
            if (document.body) document.body.scrollTop = 0;
          }
        );
      })
      .catch(err => console.log(err));
  }

  getSalary(salary: Salary): string {
    const { from, to, currency } = salary || {};

    if (from && to && currency) return `от ${from} до ${to} ${currency}`;
    if (from && !to && currency) return `от ${from} ${currency}`;
    if (!from && to && currency) return `до ${to} ${currency}`;
    return `не указана`;
  }

  getBadges(string: string): React.Node {
    const arr = badges
      .map(badge => {
        const reg = new RegExp(badge.name, 'gi');
        if (string.match(reg)) return badge;
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
  }

  render() {
    const { jobs } = this.state;
    if (!jobs) return null;

    return (
      <div className="row">
        {jobs.map(job => {
          const { id, name, salary, snippet, employer, alternate_url: jobUrl } = job || {};
          const { requirement, responsibility } = snippet || {};
          const { alternate_url: companyUrl, name: companyName } = employer || {};

          return (
            <div className="sm-1 md-3 lg-4 col align-top" key={id}>
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
    );
  }
}
