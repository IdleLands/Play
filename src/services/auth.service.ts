
import { Injectable } from '@angular/core';

import Auth0Lock from 'auth0-lock';

import { tokenNotExpired } from 'angular2-jwt';

import { AlertController } from 'ionic-angular';

import { LocalStorageService } from 'ng2-webstorage';

import { AppState } from './';
import { Theme } from './theme.service';

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

declare var AUTH0_CLIENT_ID: string;

const DOMAIN = 'idlelands.auth0.com';
const lock = new Auth0Lock(AUTH0_CLIENT_ID, DOMAIN, lockOptions);

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
    private alertCtrl: AlertController,
    private theme: Theme
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
            return reject(error);
          }

          this.storage.store('profile', profile);
          this.storage.store('idToken', idToken);
          this.storage.store('accessToken', accessToken);
          this.storage.store('refreshToken', refreshToken);

          resolve();
        });
      });

      lock.show();
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        cssClass: this.theme.currentTheme,
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
              this.storage.clear('idToken');
              this.storage.clear('accessToken');
              this.storage.clear('refreshToken');
              this.appState.reset();
              resolve();
            }
          }
        ]
      }).present();
    });
  }

  get authenticated(): boolean {
    return this.storage.retrieve('profile') && tokenNotExpired('idp-idtoken');
  }

  renew(): Promise<any> {
    return new Promise((resolve, reject) => {

      if(!this.storage.retrieve('profile')) {
        return reject(new Error('No profile to renew token for'));
      }

      const refreshToken = this.storage.retrieve('refreshToken');
      if(!refreshToken) {
        return reject(new Error('No refresh token in storage'));
      }
    });
  }
}