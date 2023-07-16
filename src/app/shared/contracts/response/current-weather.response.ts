export interface ICurrentWeatherResponse {
  current: {
    condition: {
      icon: string;
      text: string;
    };
    last_updated: string;
    uv: number;
  };
  location: {
    country: string;
    lat: number;
    localtime: string;
    localtime_epoch: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
  }
}
