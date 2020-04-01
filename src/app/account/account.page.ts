import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SpotService } from '../spot.service';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: any;
  favourites = [];
  loggedIn = false;

  constructor(private authService: AuthService, private spotService: SpotService, private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.storage.get('id_token').then((val) => {
      this.loggedIn = !helper.isTokenExpired(val);
      if (!this.loggedIn) { // not expired (logged in)
        console.log(this.loggedIn);
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
      } else {
        console.log(this.loggedIn);
        this.router.navigate(['tabs/tab2']);
      }
  });
  }
}

// NEXT: figure out way to get account tab to go straight to login page if not logged in
