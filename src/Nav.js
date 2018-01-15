/* @flow */

import * as React from 'react';
import 'papercss/dist/paper.min.css';

type Props = {
  pages?: number,
  onClick?: Function,
};

export default class Nav extends React.Component<Props, void> {
  initializeArray(end: number, start: number = 0, step: number = 1) {
    return Array.from({ length: Math.ceil((end + 1 - start) / step) }).map(
      (v, i) => i * step + start
    );
  }

  render() {
    const { pages } = this.props;
    if (!pages) return null;

    const pagesArray = this.initializeArray(pages - 1, 1);

    return (
      <div className="row flex-center align-bottom">
        {pagesArray.map(page => {
          return (
            <button
              className="btn-small"
              key={page}
              onClick={() => {
                if (this.props.onClick) this.props.onClick(page);
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }
}
