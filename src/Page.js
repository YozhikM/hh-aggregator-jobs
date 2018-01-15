/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';
import { type Jobs } from './type';

type Props = {
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

export default class Page extends React.Component<Props, void> {
  getSalary(salary: Salary): string {
    const { from, to, currency } = salary || {};

    if (from && to && currency) return `от ${from} до ${to} ${currency}`;
    if (from && !to && currency) return `от ${from} ${currency}`;
    if (!from && to && currency) return `${to} ${currency}`;
    return `не указана`;
  }

  getBadges(string: string) {
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
    const { jobs } = this.props;
    if (!jobs) return null;

    return (
      <div className="row">
        {jobs.map(job => {
          const { id, alternate_url: jobUrl, name, salary, employer, snippet } = job || {};

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
