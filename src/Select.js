import * as React from "react";
import "papercss/dist/paper.min.css";

export default class Select extends React.Component {
  render() {
    const options = [{ id: 160, value: "Almaty" }, { id: 3, value: 'Ekaterinburg'}, { id: 4, value: 'Novosibirsk'}, { id: 88, value: 'Kazan'}];
    return (
      <div className="row flex-center">
        <div className="form-group margin">
          <label for="city">Cities</label>
          <select id="city">
            {options.map(option => {
              const { id, value } = option || {};
              return (
                <option key={id} value="id" onClick={() => this.props.onChange(id)}>
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
