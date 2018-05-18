/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';
import './styles.css';

type Props = {
  option: { value: string, name: string },
  query: string,
  onChange?: Function,
};

type State = {};

export default class Checkbox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange: string => void;

  onChange(value: string) {
    const { onChange } = this.props;

    if (onChange) onChange(value);
  }

  render() {
    const { option, query } = this.props;
    const { name, value } = option || {};

    return (
      <div className="row flex-center">
        <fieldset className="form-group">
          <label htmlFor={`paperRadios${name}`} className="paper-radio" key={name}>
            <input
              type="checkbox"
              name="paperRadios"
              id={`paperRadios${name}`}
              onChange={() => this.onChange(value)}
              checked={query === value}
            />
            <span>{name}</span>
          </label>
        </fieldset>
      </div>
    );
  }
}
