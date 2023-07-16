import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '@env';
import { ICurrentWeatherResponse, ISearchLocationResponse } from '@shared/contracts/response';
import { CurrentWeather, SearchLocation } from '@shared/models/classes';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public readonly PARAM_LOCATION = 'q';
  public readonly PARAM_AIR_QUALITY = 'aqi';
  public readonly PARAM_KEY = 'key';
  public readonly RESOURCE_CURRENT = 'current.json';
  public readonly RESOURCE_SEARCH = 'search.json';

  constructor(private http: HttpClient) {}

  public getCurrentWeather(location: string): Observable<CurrentWeather> {
    const url = environment.weatherApiUrl.concat(this.RESOURCE_CURRENT);
    const params = new HttpParams()
      .set(this.PARAM_LOCATION, location)
      .set(this.PARAM_AIR_QUALITY, 'no')
      .set(this.PARAM_KEY, environment.weatherApiKey);
    return this.http.get<ICurrentWeatherResponse>(url, { params }).pipe(
      map((res) => new CurrentWeather(res))
    );
  }

  public searchLocation(location: string): Observable<any> {
    const url = environment.weatherApiUrl.concat(this.RESOURCE_SEARCH);
    const params = new HttpParams()
      .set(this.PARAM_LOCATION, location)
      .set(this.PARAM_KEY, environment.weatherApiKey);
    return this.http.get<ISearchLocationResponse[]>(url, { params }).pipe(
      map((res) => res.map((location) => new SearchLocation(location)))
    );
  }
}
