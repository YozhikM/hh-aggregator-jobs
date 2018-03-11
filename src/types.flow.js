/* @flow */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type FilterFindManyJobInput = {|
  name?: ?string,
  id?: ?string,
  salary?: ?JobSalaryInput,
  snippet?: ?JobSnippetInput,
  area?: ?JobAreaInput,
  created_at?: ?string,
  published_at?: ?string,
  employer?: ?JobEmployerInput,
  address?: ?JobAddressInput,
  _id?: ?any,
  _ids?: ?Array< ?any >,
  // List of *indexed* fields that can be filtered via operators.
  _operators?: ?OperatorsFilterFindManyJobInput,
  OR?: ?Array< FilterFindManyJobInput >,
  AND?: ?Array< FilterFindManyJobInput >,
|};

export type JobSalaryInput = {|
  from?: ?number,
  to?: ?number,
  gross?: ?boolean,
  currency?: ?string,
|};

export type JobSnippetInput = {|
  requirement?: ?string,
  responsibility?: ?string,
|};

export type JobAreaInput = {|
  id?: ?string,
  name?: ?string,
|};

export type JobEmployerInput = {|
  name?: ?string,
  alternate_url?: ?string,
|};

export type JobAddressInput = {|
  city?: ?string,
  id?: ?string,
  metro?: ?JobAddressMetroInput,
|};

export type JobAddressMetroInput = {|
  station_name?: ?string,
|};

export type OperatorsFilterFindManyJobInput = {|
  _id?: ?_idOperatorsFilterFindManyJobInput,
|};

export type _idOperatorsFilterFindManyJobInput = {|
  gt?: ?any,
  gte?: ?any,
  lt?: ?any,
  lte?: ?any,
  ne?: ?any,
  in?: ?Array< ?any >,
  nin?: ?Array< ?any >,
|};

export type PageQueryQueryVariables = {|
  page?: ?number,
  perPage?: ?number,
  filter?: ?FilterFindManyJobInput,
|};

export type PageQueryQuery = {|
  jobPagination: ? {|
    // Information to aid in pagination.
    pageInfo: {|
      // Total number of pages
      pageCount: ?number,
      // When paginating forwards, are there more items?
      hasNextPage: ?boolean,
      // Current page number
      currentPage: number,
      // When paginating backwards, are there more items?
      hasPreviousPage: ?boolean,
      // Number of items per page
      perPage: number,
    |},
    // Total object count.
    count: ?number,
    // Array of objects.
    items: ? Array<? {|
      id: ?string,
      name: ?string,
      salary: ? {|
        from: ?number,
        to: ?number,
        currency: ?string,
      |},
      snippet: ? {|
        responsibility: ?string,
        requirement: ?string,
      |},
      created_at: ?string,
      published_at: ?string,
      employer: ? {|
        name: ?string,
        alternate_url: ?string,
      |},
      address: ? {|
        city: ?string,
        metro: ? {|
          station_name: ?string,
        |},
      |},
    |} >,
  |},
|};