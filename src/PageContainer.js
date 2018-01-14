/* @flow */

import * as React from "react";
import "papercss/dist/paper.min.css";
import Page from "./Page";
import Nav from "./Nav";
import Select from "./Select";

export default class PageContainer extends React.Component {
  constructor(props) {
    super(props);
	 
	this.onChange = this.onChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      isLoading: true,
	  city: 160,
      query: ["javascript", "frontend"]
    };
  }

  componentDidMount() {
    this.fetchData(1);
  }

  fetchData(page = 1, perPage = 9) {
    const { query, city } = this.state;
    const queryString = query.length > 1 ? query.join("+") : query.join('');
    fetch(
      `https://api.hh.ru/vacancies?text=${queryString}&area=${city}&per_page=${perPage}&page=${page}&order_by=publication_time`
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
  
  onChange(id) {
	  if (id) this.setState({ city: id }, () => this.fetchData());
  }
 

  render() {
    const { jobs, isLoading, pages } = this.state;

    if (!isLoading)
      return (
        <div>
		  <Select onChange={this.onChange} />
          <Page jobs={jobs} />
          <Nav pages={pages} onClick={this.fetchData} />
        </div>
      );

    return 'null';
  }
}
