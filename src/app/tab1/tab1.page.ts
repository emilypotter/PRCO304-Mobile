import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  spots = [];

  ngOnInit(): void {
    this.getSpots();
  }

  constructor(private spotService: SpotService, private router: Router) {}

  private getSpots() {
    this.spotService.getSpotsLambda().subscribe((res: any) => {
      this.spots = JSON.parse(res.body);
      console.log(this.spots);
    });
  }

  public goToSpotDetailPage(spot: string) {
    this.spotService.selectedSpot = spot;
    console.log(this.spotService.selectedSpot.surflineLongId);
    this.router.navigate(['tabs/tab1/spot-detail']);
  }

}
