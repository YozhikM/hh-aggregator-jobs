/* @flow */

import * as React from 'react';
import { format } from 'date-fns';
import 'papercss/dist/paper.min.css';
import { type JobItemFragment, type JobSalaryInput } from './types.flow';

const badges = [
  { name: 'react', color: 'success' },
  { name: 'node', color: 'success' },
  { name: 'javascript', color: 'secondary' },
  { name: 'vue', color: 'secondary' },
  { name: 'angular', color: 'secondary' },
  { name: 'jquery', color: 'warning' },
  { name: 'php', color: 'danger' },
  { name: 'junior', color: 'success' },
  { name: '.net', color: 'danger' },
  { name: 'c#', color: 'danger' },
  { name: 'верстальщик', color: 'danger' },
  { name: 'python', color: 'danger' },
  { name: 'mongo', color: 'success' },
  { name: 'graphql', color: 'success' },
  { name: 'objective-с', color: 'danger' },
];

type Props = {|
  job: JobItemFragment,
|};

type State = {
  isFullDescription: boolean,
  isRemoved: boolean,
};

export default class JobItem extends React.Component<Props, State> {
  state = {
    isFullDescription: false,
    isRemoved: false,
  };

  getSalary = (salary: ?JobSalaryInput): string => {
    const { from, to, currency } = salary || {};

    if (from && to && currency) return `от ${from} до ${to} ${currency}`;
    if (from && !to && currency) return `от ${from} ${currency}`;
    if (!from && to && currency) return `до ${to} ${currency}`;
    return `не указана`;
  };

  getBadges = (string: string): ?React.Node => {
    const arr = badges
      .map(badge => {
        const reg = new RegExp(badge.name, 'gi');
        if (string.match(reg)) return badge;
        return null;
      })
      .filter(Boolean);
    if (arr.length > 0) {
      return (
        <div style={{ width: '66%' }}>
          {arr.map(a => (
            <span
              key={a.name}
              style={{ marginRight: '10px', marginTop: '10px' }}
              className={`badge ${a.color}`}
            >
              {a.name}
            </span>
          ))}
        </div>
      );
    }
    return null;
  };

  renderDescription = (
    responsibility: ?string,
    requirement: ?string,
    fullDescription?: React.Node
  ) => {
    const { isFullDescription } = this.state;

    if (!isFullDescription) {
      if (requirement) {
        return (
          <div>
            <strong>Требования: </strong>
            <p className="card-text">{requirement.replace(/<[^>]+>/g, '')}</p>
          </div>
        );
      }
      if (responsibility) {
        return (
          <div>
            <strong>Обязанности: </strong>
            <p className="card-text">{responsibility.replace(/<[^>]+>/g, '')}</p>
          </div>
        );
      }
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: fullDescription }} />
      </div>
    );
  };

  toggleDescription = () => {
    this.setState({ isFullDescription: !this.state.isFullDescription });
  };

  render() {
    const { isFullDescription, isRemoved } = this.state;
    const { job } = this.props;
    const { id, name, salary, snippet, employer, address, published_at, description } = job || {};
    const { city: jobCity, metro } = address || {};
    const { requirement, responsibility } = snippet || {};
    const { alternate_url: companyUrl, name: companyName } = employer || {};

    if (isRemoved) return null;

    return (
      <div className="sm-12 md-6 lg-4 col align-top" key={id}>
        <div className="card">
          <div className="card-header">
            <div className="row flex-edges">{this.getBadges(description || '')}</div>
            <h4 className="card-subtitle" style={{ fontFamily: '"Neucha",sans-serif' }}>
              {name}
            </h4>

            <p className="card-text">
              <strong>Зарплата: </strong>
              {this.getSalary(salary)}
            </p>
          </div>
          <div className="card-body">
            {jobCity && <p className="card-text">{jobCity}</p>}

            {metro &&
              metro.station_name && (
                <p className="card-text">{`Станция метро: ${metro.station_name}`}</p>
              )}

            <a href={companyUrl} className="card-text">
              {companyName}
            </a>

            <div className="margin">
              {this.renderDescription(responsibility, requirement, description)}
            </div>

            {published_at && (
              <p className="card-text">{`Опубликовано: ${format(published_at, 'DD/MM')}`}</p>
            )}

            <div className="flex-center row">
              <button className="paper-btn btn-small" onClick={this.toggleDescription}>
                {isFullDescription ? 'Свернуть' : 'Показать полное описание'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
