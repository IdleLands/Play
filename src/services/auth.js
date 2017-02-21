import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'ng2-storage';
import { SweetAlertService } from 'ng2-sweetalert2';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

const lock = new Auth0Lock('eeZLr1IQYWDYgxUtEAAiibI4617kIfT9', 'idlelands.auth0.com');

@Injectable()
export class Auth {

  static get parameters() {
    return [[NgZone], [Router], [StorageService], [SweetAlertService]];
  }

  constructor(zone, router, storage, swal) {
    this.zoneImpl = zone;
    this.router = router;
    this.storage = storage.local;
    this.user = this.storage.profile;
    this.swal = swal;

    this.lock = lock;
  }

  authenticated() {
    return tokenNotExpired('idp-idToken');
  }

  login(func = 'show') {
    return new Promise((resolve, reject) => {
      this.lock[func]({
        authParams: {
          scope: 'openid offline_access'
        }
      }, (err, profile, token, accessToken, state, refreshToken) => {
        if (err) {
          alert(err);
          return reject();
        }

        this.storage.refreshToken = refreshToken;
        this.storage.profile = profile;
        this.storage.idToken = token;
        this.zoneImpl.run(() => this.user = profile);
        this.router.navigate(['/play']);
        resolve();
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.swal.confirm({ text: 'Are you sure you want to log out?', customClass: this.storage.theme }).then(res => {
        if(!res) return reject();
        this.storage.refreshToken = null;
        this.storage.profile = null;
        this.storage.idToken = null;
        this.zoneImpl.run(() => this.user = null);
        this.router.navigate(['/']);
        window.location.reload();
        resolve();
      });
    });
  }

  renew() {
    return new Promise((resolve, reject) => {
      this.lock.getClient().refreshToken(this.storage.refreshToken, (err, delegationResult) => {
        if(err) {
          console.error(err);
          return reject();
        }

        this.storage.idToken = delegationResult.id_token;
        return resolve();
      });
    });
  }
}

@Injectable()
export class AuthGuard {

  static get parameters() {
    return [[Router], [StorageService]];
  }

  constructor(router, storage) {
    this.router = router;
    this.storage = storage.local;
    this.lock = lock;
  }

  canActivate() {
    return Observable.fromPromise(new Promise(resolve => {
      if(this.storage.idToken && tokenNotExpired('idp-idToken')) {
        return resolve(true);
      }

      const back = () => {
        this.router.navigate(['/']);
        resolve(false);
      };

      if(!this.storage.refreshToken) {
        return back();
      }

      this.lock.getClient().refreshToken(this.storage.refreshToken, (err, delegationResult) => {
        if(err) {
          console.error(err);
          return back();
        }

        this.storage.idToken = delegationResult.id_token;
        return resolve(true);
      });
    }));
  }
}