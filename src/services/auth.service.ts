
import { Injectable } from '@angular/core';

import Auth0Lock from 'auth0-lock';

import { tokenNotExpired } from 'angular2-jwt';

import { AlertController } from 'ionic-angular';

import { LocalStorageService } from 'ng2-webstorage';

import { AppState } from './';

const lockOptions = {
  autoclose: true,
  auth: {
    redirect: false,
    params: {
      scope: 'openid offline_access',
      access_type: 'offline',
      device: 'idlelands'
    }
  }
};

const CLIENT_ID = 'eeZLr1IQYWDYgxUtEAAiibI4617kIfT9';
const DOMAIN = 'idlelands.auth0.com';
const lock = new Auth0Lock(CLIENT_ID, DOMAIN, lockOptions);

lock.on('authorization_error', (error) => {
  lock.show({
    flashMessage: {
      type: 'error',
      text: error.error_description
    }
  });
});

@Injectable()
export class Auth {

  constructor(
    private storage: LocalStorageService,
    private appState: AppState,
    private alertCtrl: AlertController
  ) {}

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      lock.on('authenticated', (authResult) => {

        if(authResult.error) {
          return reject(authResult.error);
        }

        const { accessToken, idToken, refreshToken } = authResult;

        lock.getUserInfo(accessToken, (error, profile) => {
          if(error) {
            return reject();
          }

          this.storage.store('profile', profile);
          this.storage.store('idToken', idToken);
          this.storage.store('accessToken', accessToken);
          this.storage.store('refreshToken', refreshToken);
        });

        resolve();
      });

      lock.show();
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        title: 'Log out?',
        message: 'Are you sure you want to log out?',
        buttons: [
          {
            text: 'No, stay logged in',
            handler: () => reject()
          },
          {
            text: 'Yes, log out',
            handler: () => {
              this.storage.clear('profile');
              this.storage.clear('refreshToken');
              this.storage.clear('idToken');
              this.appState.reset();
              resolve();
            }
          }
        ]
      }).present();
    });
  }

  get authenticated(): boolean {
    return tokenNotExpired('idp-idtoken');
  }

  renew(): Promise<any> {
    return new Promise((resolve, reject) => {
      const auth0 = new (<any>window).Auth0({ clientID: CLIENT_ID, domain: DOMAIN, responseType: 'token' });

      auth0.refreshToken(this.storage.retrieve('refreshToken'), (err, authData) => {
        if(err) {
          return reject(err);
        }

        this.storage.store('idToken', authData.id_token);
        resolve();
      });
    });
  }
}