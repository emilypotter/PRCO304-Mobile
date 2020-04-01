import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { SpotService } from '../spot.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  user: any;
  favourites = [];
  loggedIn = false;

  constructor(private authService: AuthService, private spotService: SpotService, private storage: Storage, private router: Router) { }

  ionViewWillEnter() { // so when logged out account page info disappears
    // this.storage.get('id_token').then((val) => {
    //   this.loggedIn = !helper.isTokenExpired(val);
    // });
    this.favourites = [];
    this.storage.get('id_token').then((val) => {
      this.loggedIn = !helper.isTokenExpired(val);
      if (this.loggedIn) {
        this.storage.get('user').then((username) => {
          this.authService.getUserByUsername(username).subscribe((user: any) => {
            this.user = user[0];
            this.user.favourites.forEach(spot => {
              this.spotService.getSpotByIdLambda(spot.spot).subscribe((fav: any) => {
                this.favourites.push(fav[0]);
              });
            });
          });
        });
      }
  });
  }

  // ngOnInit() {
  //   this.storage.get('id_token').then((val) => {
  //     this.loggedIn = !helper.isTokenExpired(val);
  //     if (this.loggedIn) {
  //       this.storage.get('user').then((username) => {
  //         this.authService.getUserByUsername(username).subscribe((user: any) => {
  //           this.user = user[0];
  //           this.user.favourites.forEach(spot => {
  //             this.spotService.getSpotByIdLambda(spot.spot).subscribe((fav: any) => {
  //               this.favourites.push(fav[0]);
  //             });
  //           });
  //         });
  //       });
  //     }
  // });
  // }

  public goToSpotDetailPage(spot: string) {
    this.spotService.selectedSpot = spot;
    console.log(this.spotService.selectedSpot.surflineLongId);
    this.router.navigate(['tabs/tab1/spot-detail']);
  }

}
