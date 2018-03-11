/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';

type Props = {
  page: string,
  onSelect: Function,
};

type State = {
  activeOption: string,
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

export default class Select extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.getPage = this.getPage.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.state = {
      activeOption: this.getPage(props.page) || props.page[0],
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.page !== this.props.page) {
      this.setState({ activeOption: this.getPage(nextProps.page) });
    }
  }

  getPage: string => string;

  getPage(page: string) {
    return page.replace(/-\d/gi, '');
  }

  onSelect: Function;

  onSelect() {
    const { onSelect } = this.props;
    if (onSelect && this.$select) onSelect(this.$select.value);
  }

  $select: ?HTMLSelectElement;

  render() {
    const { activeOption } = this.state;

    return (
      <div className="row flex-center">
        <div className="form-group margin">
          <label htmlFor="city">Cities</label>
          <select
            id="city"
            ref={select => {
              this.$select = select;
            }}
            value={activeOption}
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
