import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spot.service';
import { WeatherService } from '../weather.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

const helper = new JwtHelperService();

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
  public loggedIn = false;

  constructor(public spotService: SpotService, private weatherService: WeatherService, private storage: Storage, public toastController: ToastController) { }

  ngOnInit() {
    this.flat = false;
    this.getConditions();
    this.getCurrentWeather();
    this.getWeatherForecast();
    this.getSurfForecast();
  }

  ionViewWillEnter() {
    this.storage.get('id_token').then((val) => {
      this.loggedIn = !helper.isTokenExpired(val);
    });

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

  public addToFavourites() {
    const spot = {
      spot: this.spotService.selectedSpot._id
    };

    this.storage.get('id').then((val) => {
      this.spotService.addSpotToFavourites(val, spot).subscribe((res: any) => {
      this.presentSuccessToast();
      }, error => {
        this.presentFailureToast(error);
      });
    });
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Spot added to favourites',
      duration: 2000
    });
    toast.present();
  }

  async presentFailureToast(err: string) {
    const toast = await this.toastController.create({
      message: 'Something went wrong: ' + err,
      duration: 2000
    });
    toast.present();
  }

}
