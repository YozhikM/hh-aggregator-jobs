/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';

type OptionT = { name: string | number, value: string };

type Props = {
  value?: string,
  name: string,
  options: OptionT[],
  onSelect: Function,
};

type State = {
  activeOption: string,
};

export default class Select extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);

    this.state = {
      activeOption: props.value || String(props.options[0].name),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setState({ activeOption: nextProps.value });
    }
  }

  onSelect: Function;

  onSelect() {
    const { onSelect } = this.props;
    if (onSelect && this.$select) onSelect(this.$select.value);
  }

  $select: ?HTMLSelectElement;

  render() {
    const { options, name } = this.props;
    const { activeOption } = this.state;

    return (
      <div className="form-group margin">
        <label htmlFor="select">{name}</label>
        <select
          id="select"
          ref={select => {
            this.$select = select;
          }}
          value={activeOption}
          onChange={this.onSelect}
        >
          {options.map(option => {
            const { name: optionName, value } = option || {};
            return (
              <option key={optionName} value={optionName}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
