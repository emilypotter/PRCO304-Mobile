import { Component, OnInit } from '@angular/core';
import { SpotService } from '../spot.service';

@Component({
  selector: 'app-spot-detail',
  templateUrl: './spot-detail.page.html',
  styleUrls: ['./spot-detail.page.scss'],
})
export class SpotDetailPage implements OnInit {

  constructor(public spotService: SpotService) { }

  ngOnInit() {
  }

}
