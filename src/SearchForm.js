import * as React from "react";
import "papercss/dist/paper.min.css";

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    return (
      <div className="row flex-center">
        <div className="form-group margin">
          <label for="query">Поиск</label>
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
