import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spot.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-spot-detail',
  templateUrl: './spot-detail.page.html',
  styleUrls: ['./spot-detail.page.scss'],
})
export class SpotDetailPage implements OnInit {

  public conditions;
  public flat: boolean;
  public currentWeather;
  public weatherForecast = [];
  public surfForecast;

  constructor(public spotService: SpotService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.flat = false;
    this.getConditions();
    this.getCurrentWeather();
    this.getWeatherForecast();
    this.getSurfForecast();
  }

  private getConditions(): void {
    this.spotService.getCurrentConditionsFromSurfline().subscribe((data: any) => {
      this.conditions = data.data.conditions[0];
      console.log(this.conditions);
      if (data.data.conditions[0].am.minHeight === 0 && data.data.conditions[0].am.maxHeight === 0) {
        this.flat = true;
      }
    });
  }

  public getCurrentWeather(): void {
    this.weatherService.getCurrentWeather().subscribe((data: any) => {
      this.currentWeather = data;
      console.log(this.currentWeather);
    });
  }

  private getWeatherForecast(): void {
    this.weatherService.getWeatherForecast().subscribe((data: any) => {
      this.weatherForecast.push(data.list[8]);
      this.weatherForecast.push(data.list[16]);
      this.weatherForecast.push(data.list[24]);
      this.weatherForecast.push(data.list[32]);
      console.log(this.weatherForecast);
    });
  }

  private getSurfForecast(): void {
    this.spotService.getForecastFromSurfline().subscribe((data: any) => {
      this.surfForecast = data;
      console.log(this.surfForecast);
    });
  }

  // NEXT: get weather forecast and have card for each day. Then account and favourite spots.

}
