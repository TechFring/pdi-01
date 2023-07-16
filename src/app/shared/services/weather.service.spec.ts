import { TestBed } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env';
import { ICurrentWeatherResponse, ISearchLocationResponse } from '@shared/contracts/response';
import { CurrentWeather, SearchLocation } from '@shared/models/classes';
import { WeatherService } from './weather.service';

describe(WeatherService.name, () => {
  let service: WeatherService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WeatherService,
      ]
    });

    service = TestBed.inject(WeatherService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  describe(WeatherService.prototype.getCurrentWeather.name, () => {
    const mockResponse: ICurrentWeatherResponse = {
      current: {
        condition: {
          icon: '',
          text: '',
        },
        last_updated: '',
        uv: 0,
      },
      location: {
        country: '',
        lat: 0,
        localtime: '',
        localtime_epoch: 0,
        lon: 0,
        name: '',
        region: '',
        tz_id: '',
      }
    };

    it('should send GET request with params and transform response', () => {
      const location = 'location';

      service.getCurrentWeather(location).subscribe((res) => {
        expect(res).toBeInstanceOf(CurrentWeather);
      });

      const params = new HttpParams()
        .set(service.PARAM_LOCATION, location)
        .set(service.PARAM_AIR_QUALITY, 'no')
        .set(service.PARAM_KEY, environment.weatherApiKey);
      const url = `${environment.weatherApiUrl}${service.RESOURCE_CURRENT}?${params.toString()}`;
      const req = controller.expectOne(url);

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe(WeatherService.prototype.searchLocation.name, () => {
    const mockResponse: ISearchLocationResponse[] = [
      {
        id: 0,
        name: '',
        region: '',
        country: '',
        lat: 0,
        lon: 0,
        url: '',
      }
    ];

    it('should send GET request with params and transform response', () => {
      const location = 'location';

      service.searchLocation(location).subscribe((res) => {
        expect(res[0]).toBeInstanceOf(SearchLocation);
      });

      const params = new HttpParams()
        .set(service.PARAM_LOCATION, location)
        .set(service.PARAM_KEY, environment.weatherApiKey);
      const url = `${environment.weatherApiUrl}${service.RESOURCE_SEARCH}?${params.toString()}`;
      const req = controller.expectOne(url);

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
