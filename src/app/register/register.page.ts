import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;
  hashedPassword: string;
  favourites = [];

  constructor(private validateService: ValidateService, public authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  public onRegisterSubmit() {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (ERROR: any, hash: any) => {
        this.hashedPassword = hash;
        const user = {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.hashedPassword,
          favourites: this.favourites
        };

        // required fields
        if (!this.validateService.validateRegister(user)) {
      this.presentRequiredToast();
      return false;
    }

    // validate email
        if (!this.validateService.validateEmail(user.email)) {
      this.presentNotValidToast();
      return false;
    }

        if (ERROR) { throw ERROR; }

    // // register user
        this.authService.registerUser(user).subscribe(() => {
      this.router.navigate(['tabs/tab3/login']).then(() => {
        this.presentSuccessRegisterToast();
      });
    }, error => {
      this.presentErrorRegisterToast();
      console.log(error);
    });
      });
    });
  }

  async presentSuccessRegisterToast() {
    const toast = await this.toastController.create({
      message: 'User Registered',
      duration: 2000
    });
    toast.present();
  }

  async presentNotValidToast() {
    const toast = await this.toastController.create({
      message: 'ERROR: Invalid email address',
      duration: 2000
    });
    toast.present();
  }

  async presentErrorRegisterToast() {
    const toast = await this.toastController.create({
      message: 'ERROR: Unable to register user',
      duration: 2000
    });
    toast.present();
  }

  async presentRequiredToast() {
    const toast = await this.toastController.create({
      message: 'ERROR: All fields are required',
      duration: 2000
    });
    toast.present();
  }

}
