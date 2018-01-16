/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';

type Props = {
  onChange: Function,
};

export default class SearchForm extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange: Function;

  onChange(e: SyntheticInputEvent<>) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    return (
      <div className="row flex-center">
        <div className="form-group margin">
          <label htmlFor="query">Поиск</label>
          <input
            type="text"
            placeholder="Слова разделяются пробелами"
            id="query"
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
