/* @flow */

import * as React from "react";
import "papercss/dist/paper.min.css";
import Page from "./Page";
import Nav from "./Nav";

export default class PageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
    this.state = {
      isLoading: true,
      query: ["javascript", "frontend"]
    };
  }

  componentDidMount() {
    this.fetchData(1);
  }

  fetchData(page = 1, perPage = 9) {
    const { query } = this.state;
    const queryString = query.length > 1 ? query.join("+") : query.join('');
    fetch(
      `https://api.hh.ru/vacancies?text=${queryString}&area=160&per_page=${perPage}&page=${page}&order_by=publication_time`
    )
      .then(res => res.json())
      .then(data => {
        const { items, pages } = data || {};
        this.setState(
          {
            jobs: items,
            pages,
            isLoading: false
          },
          () => (document.body.scrollTop = 0)
        );
      })
      .catch(err => console.log(err));
  }
 

  render() {
    const { jobs, isLoading, pages } = this.state;

    if (!isLoading)
      return (
        <div>
          <Page jobs={jobs} />
          <Nav pages={pages} onClick={this.fetchData} />
        </div>
      );

    return "";
  }
}
