/* @flow */

import * as React from 'react';

type Props = {
  error?: Error,
};

export default function Loader(props: Props) {
  if (props.error) {
    return <div>Error!</div>;
  }
  return <div>Loading</div>;
}
