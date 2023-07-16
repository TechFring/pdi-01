import { ISearchLocationResponse } from '@shared/contracts/response/search-location.response';

export class SearchLocation {
  name: string;
  region: string;
  country: string;

  constructor(response: ISearchLocationResponse) {
    this.name = response.name;
    this.region = response.region;
    this.country = response.country;
  }
}
