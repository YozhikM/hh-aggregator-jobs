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
  +currency: string
|};

export default class Page extends React.Component<Props, void> {
  getSalary(salary: Salary) {
    const { from, to, currency } = salary || {};

    if (from && to && currency) return `от ${from} до ${to} ${currency}`;
    if (from && !to && currency) return `от ${from} ${currency}`;
    if (!from && to && currency) return `${to} ${currency}`;
    return `не указана`;
  }

  render() {
    const { jobs } = this.props;
    if (!jobs) return null;

    return (
      <div className="row">
        {jobs.map(job => {
          const { id, alternate_url: jobUrl, name, salary, employer, snippet } = job || {};

          const { requirement, responsibility } = snippet || {};

          return (
            <div className="sm-1 md-3 lg-4 col align-top" key={id}>
              <div className="card">
                <div className="card-header">
                  <h4 className="card-subtitle" style={{ fontFamily: '"Neucha",sans-serif' }}>
                    {name}
                  </h4>
                  <p className="card-text">
                    <strong>Зарплата: </strong>
                    {this.getSalary(salary)}
                  </p>
                </div>
                <div className="card-body">
                  <a href={employer.alternate_url} className="card-text">
                    {employer.name}
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
