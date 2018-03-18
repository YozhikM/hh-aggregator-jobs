/* @flow */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type FilterFindOneJobInput = {|
  name?: ?string,
  id?: ?string,
  salary?: ?JobSalaryInput,
  snippet?: ?JobSnippetInput,
  area?: ?string,
  created_at?: ?string,
  published_at?: ?string,
  employer?: ?JobEmployerInput,
  address?: ?JobAddressInput,
  description?: ?string,
  _id?: ?any,
  _ids?: ?Array< ?any >,
  // List of *indexed* fields that can be filtered via operators.
  _operators?: ?OperatorsFilterFindOneJobInput,
  OR?: ?Array< FilterFindOneJobInput >,
  AND?: ?Array< FilterFindOneJobInput >,
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

export type OperatorsFilterFindOneJobInput = {|
  salary?: ?SalaryOperatorsFilterFindOneJobInput,
  created_at?: ?Created_atOperatorsFilterFindOneJobInput,
  published_at?: ?Published_atOperatorsFilterFindOneJobInput,
  _id?: ?_idOperatorsFilterFindOneJobInput,
|};

export type SalaryOperatorsFilterFindOneJobInput = {|
  gt?: ?JobSalaryInput,
  gte?: ?JobSalaryInput,
  lt?: ?JobSalaryInput,
  lte?: ?JobSalaryInput,
  ne?: ?JobSalaryInput,
  in?: ?Array< ?JobSalaryInput >,
  nin?: ?Array< ?JobSalaryInput >,
|};

export type Created_atOperatorsFilterFindOneJobInput = {|
  gt?: ?string,
  gte?: ?string,
  lt?: ?string,
  lte?: ?string,
  ne?: ?string,
  in?: ?Array< ?string >,
  nin?: ?Array< ?string >,
|};

export type Published_atOperatorsFilterFindOneJobInput = {|
  gt?: ?string,
  gte?: ?string,
  lt?: ?string,
  lte?: ?string,
  ne?: ?string,
  in?: ?Array< ?string >,
  nin?: ?Array< ?string >,
|};

export type _idOperatorsFilterFindOneJobInput = {|
  gt?: ?any,
  gte?: ?any,
  lt?: ?any,
  lte?: ?any,
  ne?: ?any,
  in?: ?Array< ?any >,
  nin?: ?Array< ?any >,
|};

export type FilterFindManyJobInput = {|
  name?: ?string,
  id?: ?string,
  salary?: ?JobSalaryInput,
  snippet?: ?JobSnippetInput,
  area?: ?string,
  created_at?: ?string,
  published_at?: ?string,
  employer?: ?JobEmployerInput,
  address?: ?JobAddressInput,
  description?: ?string,
  _id?: ?any,
  _ids?: ?Array< ?any >,
  // List of *indexed* fields that can be filtered via operators.
  _operators?: ?OperatorsFilterFindManyJobInput,
  OR?: ?Array< FilterFindManyJobInput >,
  AND?: ?Array< FilterFindManyJobInput >,
  // Search by query
  q?: ?string,
|};

export type OperatorsFilterFindManyJobInput = {|
  salary?: ?SalaryOperatorsFilterFindManyJobInput,
  created_at?: ?Created_atOperatorsFilterFindManyJobInput,
  published_at?: ?Published_atOperatorsFilterFindManyJobInput,
  _id?: ?_idOperatorsFilterFindManyJobInput,
|};

export type SalaryOperatorsFilterFindManyJobInput = {|
  gt?: ?JobSalaryInput,
  gte?: ?JobSalaryInput,
  lt?: ?JobSalaryInput,
  lte?: ?JobSalaryInput,
  ne?: ?JobSalaryInput,
  in?: ?Array< ?JobSalaryInput >,
  nin?: ?Array< ?JobSalaryInput >,
|};

export type Created_atOperatorsFilterFindManyJobInput = {|
  gt?: ?string,
  gte?: ?string,
  lt?: ?string,
  lte?: ?string,
  ne?: ?string,
  in?: ?Array< ?string >,
  nin?: ?Array< ?string >,
|};

export type Published_atOperatorsFilterFindManyJobInput = {|
  gt?: ?string,
  gte?: ?string,
  lt?: ?string,
  lte?: ?string,
  ne?: ?string,
  in?: ?Array< ?string >,
  nin?: ?Array< ?string >,
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

export type SortFindManyJobInput =
  "CREATED_AT_ASC" |
  "CREATED_AT_DESC" |
  "PUBLISHED_AT_ASC" |
  "PUBLISHED_AT_DESC" |
  "SALARY_ASC" |
  "SALARY_DESC" |
  "_ID_ASC" |
  "_ID_DESC";


export type JobPageQueryQueryVariables = {|
  filter?: ?FilterFindOneJobInput,
|};

export type JobPageQueryQuery = {|
  jobOne: ? {|
    _id: any,
    id: ?string,
    name: ?string,
    description: ?string,
    salary: ? {|
      from: ?number,
      to: ?number,
      currency: ?string,
      gross: ?boolean,
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
  |},
|};

export type PageQueryQueryVariables = {|
  page?: ?number,
  perPage?: ?number,
  filter?: ?FilterFindManyJobInput,
  sort?: ?SortFindManyJobInput,
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
      _id: any,
      id: ?string,
      name: ?string,
      description: ?string,
      salary: ? {|
        from: ?number,
        to: ?number,
        currency: ?string,
        gross: ?boolean,
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

export type JobItemFragment = {|
  _id: any,
  id: ?string,
  name: ?string,
  description: ?string,
  salary: ? {|
    from: ?number,
    to: ?number,
    currency: ?string,
    gross: ?boolean,
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
|};