import { ICurrentWeatherResponse } from '@shared/contracts/response/current-weather.response';

export class CurrentWeather {
  public conditionIcon: string;
  public conditionText: string;
  public lastUpdated: string;
  public locationCountry: string;
  public locationName: string;
  public locationRegion: string;
  public locationTimezone: string;

  constructor({ current, location }: ICurrentWeatherResponse) {
    this.conditionIcon = current.condition.icon;
    this.conditionText = current.condition.text;
    this.lastUpdated = current.last_updated;
    this.locationCountry = location.country;
    this.locationName = location.name;
    this.locationRegion = location.region;
    this.locationTimezone = location.tz_id;
  }
}
