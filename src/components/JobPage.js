/* @flow */

import * as React from 'react';
import { graphql } from 'react-apollo';
import { type Match, Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import 'papercss/dist/paper.min.css';
// import { type JobPageQueryQuery, type JobPageQueryQueryVariables } from './type';

type Props = {
  data: Object,
  match: Match, // eslint-disable-line
};

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
  { name: 'swift', color: 'danger' },
  { name: 'ruby', color: 'danger' },
];

class JobPage extends React.Component<Props> {
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

  render() {
    const { data } = this.props;
    const { jobOne } = data || {};
    if (!data || !jobOne) return null;
    const { id, name, salary, employer, address, published_at, description, area } = jobOne || {};
    const { city: jobCity, metro } = address || {};
    const { alternate_url: companyUrl, name: companyName } = employer || {};

    return (
      <div className="row flex-center">
        <div className="sm-12 md-12 lg-9 col align-top" key={id}>
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
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>

              {published_at && (
                <p className="card-text">{`Опубликовано: ${format(published_at, 'DD/MM')}`}</p>
              )}

              <div className="flex-center row">
                <Link to={`/jobs/${area}-1`}>
                  <button className="paper-btn btn-small">Назад к списку</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const JobPageQuery = gql`
  query JobPageQuery($filter: FilterFindOneJobInput) {
    jobOne(filter: $filter) {
      _id
      id
      area
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
  }
`;

const options = (props: Props): { variables: Object } => {
  const { params } = props.match || {};
  const { id } = params || {};

  return { variables: { filter: { id } } };
};

export default graphql(JobPageQuery, { options })(JobPage);
