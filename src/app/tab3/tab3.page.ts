import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  username: string;
  password: string;

  public loggedIn = false;

  constructor(private storage: Storage, public toastController: ToastController, private authService: AuthService, private router: Router) {}

  ionViewWillEnter() {
    console.log('hit');
    this.storage.get('id_token').then((val) => {
      const isExpired = helper.isTokenExpired(val);
      if (!isExpired) { // logged in
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  public logout() {
    this.storage.clear();
    this.router.navigate(['tabs/tab1']);
  }
}
