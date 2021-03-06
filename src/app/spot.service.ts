import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  selectedSpot: any;

  constructor(private http: HttpClient) { }

  public getRegionsLambda(): Observable<any> {
    return this.http.get<any>('https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellregions');
  }

  public getSpotsLambda(): Observable<any> {
    return this.http.get<any>('https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellspots');
  }

  public getCurrentConditionsFromSurfline(): Observable<any> {
    return this.http.get<any>(`https://services.surfline.com/kbyg/spots/forecasts/conditions?spotId=${this.selectedSpot.surflineLongId}&days=1`);
  }

  public getForecastFromSurfline(): Observable<any> {
    return this.http.get<any>(`https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${this.selectedSpot.surflineLongId}&days=5&intervalHours=24`);
  }

  public getSpotByIdLambda(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellspots/spot?id=${id}`);
  }

  public addSpotToFavourites(userId: string, spotObj: any): Observable<any> {
    console.log(userId);
    return this.http.post<any>(`https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellusers/favourite?userId=${userId}`, spotObj);
  }
}
