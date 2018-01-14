import * as React from "react";
import "papercss/dist/paper.min.css";

export default class Nav extends React.Component {
  initializeArray(end, start = 0, step = 1) {
    return Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(
      (v, i) => i * step + start
    );
  }

  render() {
    const { pages } = this.props;
    const pagesArray = this.initializeArray(pages - 1, 1);

    return (
      <div className="row flex-center align-bottom">
        {pagesArray.map(page => {
          return (
            <button
              className="btn-small"
              key={page}
              onClick={() => this.props.onClick(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }
}
