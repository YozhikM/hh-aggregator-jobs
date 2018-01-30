/* @flow */

import * as React from 'react';

export type Jobs = $ReadOnlyArray<{|
  fullDescription?: React.Node,
  +salary: ?{|
    +to: ?number,
    +gross: boolean,
    +from: ?number,
    +currency: string,
  |},
  +snippet: {|
    +requirement: string,
    +responsibility: ?string,
  |},
  +archived: boolean,
  +premium: boolean,
  +name: string,
  +area: {|
    +url: string,
    +id: string,
    +name: string,
  |},
  +url: string,
  +created_at: string,
  +alternate_url: string,
  +apply_alternate_url: string,
  +relations: $ReadOnlyArray<any>,
  +employer: {|
    +logo_urls: ?{|
      '+90': string,
      '+240': string,
      +original: string,
    |},
    +vacancies_url: string,
    +name: string,
    +url: string,
    +alternate_url: string,
    +id: string,
    +trusted: boolean,
  |},
  +response_letter_required: boolean,
  +published_at: string,
  +address: ?{|
    +building: ?string,
    +city: ?string,
    +description: any, // FIXME: Type could not be determined
    +metro: ?{|
      +line_name: string,
      +station_id: string,
      +line_id: string,
      +lat: number,
      +station_name: string,
      +lng: number,
    |},
    +metro_stations: | $ReadOnlyArray<{|
          +line_name: string,
          +station_id: string,
          +line_id: string,
          +lat: number,
          +station_name: string,
          +lng: number,
        |}>
      | $ReadOnlyArray<any>
      | $ReadOnlyArray<{|
          +line_name: string,
          +station_id: string,
          +line_id: string,
          +lat: number,
          +station_name: string,
          +lng: number,
        |}>
      | $ReadOnlyArray<{|
          +line_name: string,
          +station_id: string,
          +line_id: string,
          +lat: number,
          +station_name: string,
          +lng: number,
        |}>,
    +raw: ?string,
    +street: ?string,
    +lat: ?number,
    +lng: ?number,
    +id: string,
  |},
  +department: ?{|
    +id: string,
    +name: string,
  |},
  +sort_point_distance: ?any, // FIXME: Type could not be determined
  +type: {|
    +id: string,
    +name: string,
  |},
  +id: string,
|}>;
