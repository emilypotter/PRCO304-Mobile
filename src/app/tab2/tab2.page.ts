import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, public toastController: ToastController) {}

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
          this.authService.storeUserData(res.token, userData[0].username, userData[0]._id);
          this.router.navigate(['']).then(() => {
            this.presentSuccessLoginToast();
          });
        });
      } else {
        this.presentFailedLoginToast()
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
