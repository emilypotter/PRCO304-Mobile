import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

const helper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  public loggedIn = false;

  constructor(private storage: Storage, public toastController: ToastController, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.storage.get('id_token').then((val) => {
      const isExpired = helper.isTokenExpired(val);
      if (!isExpired) { // logged in
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    console.log(user);
    this.authService.getUserByUsername(this.username).subscribe((userData: any) => {
      if (userData.length > 0) {
        console.log(userData);
        this.authService.comparePassword(this.password, userData[0].password).subscribe((res: any) => {
          if (res.success) {
            this.authService.storeUserData(res.token, userData[0].username, userData[0]._id);
            this.router.navigate(['tabs/tab3']).then(() => {
              this.router.navigate(['tabs/tab2']).then(() => {
                this.presentSuccessLoginToast();
                });
            });
          } else {
            this.presentFailedLoginToast();
          }
        });
      } else {
        this.presentFailedLoginToast();
      }
    });
  }

  async presentSuccessLoginToast() {
    const toast = await this.toastController.create({
      message: 'Logged in',
      duration: 2000
    });
    toast.present();
  }

  async presentFailedLoginToast() {
    const toast = await this.toastController.create({
      message: 'Incorrect username or password',
      duration: 2000
    });
    toast.present();
  }

}
