/* @flow */

import * as React from 'react';
import { graphql } from 'react-apollo';
import type { Match } from 'react-router-dom';
import gql from 'graphql-tag';
import 'papercss/dist/paper.min.css';
import JobItem from './JobItem';
import { type JobPageQueryQuery, type JobPageQueryQueryVariables } from './type';

type Props = {
  data: JobPageQueryQuery,
  match: Match, // eslint-disable-line
};

class JobPage extends React.Component<Props> {
  render() {
    const { data } = this.props;
    const { jobOne } = data || {};
    if (!data || !jobOne) return null;

    return (
      <div className="row flex-center">
        <JobItem job={jobOne} />
      </div>
    );
  }
}

const JobPageQuery = gql`
  query JobPageQuery($filter: FilterFindOneJobInput) {
    jobOne(filter: $filter) {
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
  }
`;

const options = (props: Props): { variables: JobPageQueryQueryVariables } => {
  const { params } = props.match || {};
  const { id } = params || {};

  return { variables: { filter: { id } } };
};

export default graphql(JobPageQuery, { options })(JobPage);
