/* @flow */

import * as React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import 'papercss/dist/paper.min.css';

const badges = [
  { name: 'react', color: 'success' },
  { name: 'node', color: 'success' },
  { name: 'graphql', color: 'success' },
  { name: 'middle', color: 'success' },
  { name: 'junior', color: 'success' },
  { name: 'mongo', color: 'success', regs: ['mongo', 'монго'] },
  { name: 'angular', color: 'secondary', regs: ['angular', 'ангуляр', 'ангулар'] },
  { name: 'javascript', color: 'secondary', regs: ['js', 'javascript', 'es5', 'es6'] },
  { name: 'vue', color: 'secondary' },
  { name: 'design', color: 'danger', regs: ['photoshop', 'ui', 'ux', 'design', 'дизайн'] },
  { name: 'java', color: 'danger', regs: [/^java/] },
  { name: 'c#', color: 'danger' },
  { name: 'верстальщик', color: 'danger', regs: ['верстка', 'верстальщик', 'bootstrap'] },
  { name: 'python', color: 'danger' },
  { name: '.net', color: 'danger' },
  { name: 'objective-с', color: 'danger' },
  { name: 'swift', color: 'danger' },
  { name: 'ruby', color: 'danger' },
  { name: 'php', color: 'danger' },
  {
    name: 'LEGACY',
    color: 'danger',
    regs: [
      'jquery',
      'angularjs',
      'knockout',
      'backbone',
      'gulp',
      'browserify',
      'wordpress',
      'bitrix',
      'битрикс',
    ],
  },
];

type Props = {|
  job: Object,
|};

type State = {
  isFullDescription: boolean,
};

export default class JobItem extends React.Component<Props, State> {
  state = {
    isFullDescription: false,
  };

  getSalary = (salary: ?Object): string => {
    const { from, to, currency } = salary || {};

    if (from && to && currency) return `от ${from} до ${to} ${currency}`;
    if (from && !to && currency) return `от ${from} ${currency}`;
    if (!from && to && currency) return `до ${to} ${currency}`;
    return `не указана`;
  };

  getBadges = (string: string): ?React.Node => {
    const arr = badges
      .map(badge => {
        if (badge.regs) {
          const regsMap = badge.regs.map(badgeReg => {
            const reg = new RegExp(badgeReg, 'gi');
            if (string.match(reg)) return badge;
            return null;
          });
          return regsMap[0];
        }
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
      if (requirement && responsibility) {
        return (
          <div>
            <strong>Требования: </strong>
            <p className="card-text">{requirement.replace(/<[^>]+>/g, '')}</p>

            <strong>Обязанности: </strong>
            <p className="card-text">{responsibility.replace(/<[^>]+>/g, '')}</p>
          </div>
        );
      } else if (!requirement && responsibility) {
        return (
          <div>
            <strong>Обязанности: </strong>
            <p className="card-text">{responsibility.replace(/<[^>]+>/g, '')}</p>
          </div>
        );
      } else if (requirement && !responsibility) {
        return (
          <div>
            <strong>Требования: </strong>
            <p className="card-text">{requirement.replace(/<[^>]+>/g, '')}</p>
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
    const { isFullDescription } = this.state;
    const { job } = this.props;
    const { id, name, salary, snippet, employer, address, published_at, description } = job || {};
    const { city: jobCity, metro } = address || {};
    const { requirement, responsibility } = snippet || {};
    const { alternate_url: companyUrl, name: companyName } = employer || {};

    return (
      <div className="sm-12 md-6 lg-4 col align-top" key={id}>
        <div className="card">
          <div className="card-header">
            <div className="row flex-edges">
              {this.getBadges(description || '')}
              <Link to={`/job/${id}`} style={{ background: 'none' }}>
                <span style={{ marginRight: '10px', marginTop: '10px' }} className="badge blue">
                  К странице
                </span>
              </Link>
            </div>
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
