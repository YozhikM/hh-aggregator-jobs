/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';

type Props = {
  query: string,
  onChange?: Function,
};

type State = {};

const options = [
  { value: 'frontend', name: 'Frontend' },
  { value: 'react', name: 'Только Реакт' },
  { value: 'javascript', name: 'Javascript' },
];

export default class Checkboxes extends React.Component<Props, State> {
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
    const { query } = this.props;

    return (
      <div className="row flex-center">
        <fieldset className="form-group">
          {options.map((option, i) => {
            const { name, value } = option || {};
            return (
              <label htmlFor={`paperRadios${i + 1}`} className="paper-radio">
                <input
                  type="radio"
                  name="paperRadios"
                  id={`paperRadios${i + 1}`}
                  value={value}
                  onChange={() => this.onChange(value)}
                  checked={query === value}
                />
                <span>{name}</span>
              </label>
            );
          })}
        </fieldset>
      </div>
    );
  }
}
