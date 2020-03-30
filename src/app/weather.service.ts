import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SpotService } from './spot.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient, private spotService: SpotService) { }

  public getCurrentWeather(): Observable<any> {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?q=${
      this.spotService.selectedSpot.spotName
      }&units=metric&APPID=529ed471254f7e720df0ecf1580d78cc`
    );
  }

  public getWeatherForecast(): Observable<any> {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${
        this.spotService.selectedSpot.spotName
      }&units=metric&APPID=529ed471254f7e720df0ecf1580d78cc`
    );
  }
}
