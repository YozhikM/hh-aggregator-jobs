/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';

type Props = {
  onChange: string => void,
  value: string,
};

type State = {
  value: string,
};

export default class SearchForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = {
      value: props.value || '',
    };
  }

  onChange: Function;

  onChange(e: SyntheticInputEvent<>) {
    const { onChange } = this.props;
    const { value } = e.target;
    this.setState({ value }, () => onChange(value));
  }

  render() {
    const { value } = this.state;
    console.log(value);
    return (
      <div className="row flex-center">
        <div className="form-group margin">
          <label htmlFor="query">Поиск</label>
          <input
            type="text"
            placeholder="Поиск по ключевому слову"
            id="query"
            onChange={this.onChange}
            value={value}
            style={{ padding: '0.5rem 3rem' }}
          />
        </div>
      </div>
    );
  }
}
