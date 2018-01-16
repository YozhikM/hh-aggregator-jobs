/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';

type Props = {
  onChange: Function,
};

const options = [
  { id: 160, value: 'Almaty' },
  { id: 3, value: 'Ekaterinburg' },
  { id: 4, value: 'Novosibirsk' },
  { id: 88, value: 'Kazan' },
];

export default class Select extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange: Function;

  onChange() {
    const { onChange } = this.props;
    if (onChange && this.$select) onChange(this.$select.value);
  }

  $select: ?HTMLSelectElement;

  render() {
    return (
      <div className="row flex-center">
        <div className="form-group margin">
          <label htmlFor="city">Cities</label>
          <select
            id="city"
            ref={select => {
              this.$select = select;
            }}
            onChange={this.onChange}
          >
            {options.map(option => {
              const { id, value } = option || {};
              return (
                <option key={id} value={id}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
