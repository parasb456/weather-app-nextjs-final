export interface RootObject {
  total_count: number;
  results: Result[];
}
export interface Result {
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names?: string[];
  feature_class: string;
  feature_code: string;
  country_code: string;
  cou_name_en: string;
  country_code_2?: any;
  admin1_code: string;
  admin2_code: string;
  admin3_code: string;
  admin4_code: string;
  population: number;
  elevation?: string;
  dem: number;
  timezone: string;
  modification_date: string;
  label_en: string;
  coordinates: Coordinates;
}
export interface Coordinates {
  lon: number;
  lat: number;
}

export enum NameSorting {
  ASC,
  DSC,
  NONE
}
export enum CountrySorting {
  ASC,
  DSC,
  NONE
}
