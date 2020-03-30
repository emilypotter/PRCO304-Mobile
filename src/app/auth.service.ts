import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage, private http: HttpClient) { }
  authToken: any;
  user: any;
  username: any;
  userId: any;

  registerUser(user) {
    return this.http.post('https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellusers', user);
  }

  getUserByUsername(username) {
    return this.http.get(`https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellusers/user?username=${username}`);
  }

  comparePassword(candidatePw, userPw) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`https://tetqc1kgx7.execute-api.eu-west-2.amazonaws.com/prod/swellusers?candidatePw=${candidatePw}&userPw=${userPw}`);
  }

  getProfile() {
    this.loadToken();
    const headers = new  HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get('users/profile', {headers});
  }

  // getProfile() {
  //   this.loadToken();
  //   return this.http.get('users/profile');
  // }

  storeUserData(token, user, id) {
    this.storage.set('id_token', token);
    this.storage.set('user', user);
    this.storage.set('id', id);
    this.authToken = token;
    this.user = user;
    this.userId = id;
  }

  loadToken() {
    // const token = this.storage.get('id_token');
    // this.authToken = token;
    this.storage.get('id_token').then((val) => {
    this.authToken = val;
    });
  }

  loadUsername() {
    // const username = this.storage.get('user');
    // this.username = username;
      this.storage.get('user').then((val) => {
      this.username = val;
    });
  }

  isTokenExpired() {
    this.storage.get('id_token').then((val) => {
      if (val !== 'undefined') {
        const isExpired = helper.isTokenExpired(val);
        return isExpired;
      } else {
        return true;
      }
    });
  }

  public logout() {
    this.authToken = null;
    this.user = null;
    this.storage.clear();
  }
}
