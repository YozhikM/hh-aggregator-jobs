/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';

type Props = {
  onSelect: Function,
};

const options = [
  { id: 160, value: 'Almaty' },
  { id: 3, value: 'Yekaterinburg' },
  { id: 4, value: 'Novosibirsk' },
  { id: 88, value: 'Kazan' },
  { id: 66, value: 'Nizhny Novgorod' },
  { id: 76, value: 'Rostov-on-Don' },
  { id: 1255, value: 'Tomsk' },
  { id: 1438, value: 'Krasnodar' },
  { id: 1586, value: 'Samara' },
  { id: 2114, value: 'Crimea' },
  { id: 2019, value: 'for the Moscow Ring Road' },
];

export default class Select extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect: Function;

  onSelect() {
    const { onSelect } = this.props;
    if (onSelect && this.$select) onSelect(this.$select.value);
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
            onChange={this.onSelect}
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
