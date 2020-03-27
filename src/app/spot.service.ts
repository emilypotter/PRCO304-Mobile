import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  selectedSpot: string;

  constructor(private http: HttpClient) { }

  public getRegionsLambda(): Observable<any> {
    return this.http.get<any>('https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellregions');
  }

  public getSpotsLambda(): Observable<any> {
    return this.http.get<any>('https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellspots');
  }

  // NEXT: get spot from surfline with id and deisplay data
}
