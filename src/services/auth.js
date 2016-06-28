import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'ng2-storage';
import { SweetAlertService } from 'ng2-sweetalert2';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

import { PrimusWrapper } from './primus';

@Injectable()
export class Auth {

  static get parameters() {
    return [[NgZone], [Router], [StorageService], [PrimusWrapper], [SweetAlertService]];
  }

  constructor(zone, router, storage, primus, swal) {
    this.zoneImpl = zone;
    this.router = router;
    this.storage = storage.local;
    this.user = this.storage.profile;
    this.primus = primus;
    this.swal = swal;

    this.lock = new Auth0Lock('eeZLr1IQYWDYgxUtEAAiibI4617kIfT9', 'idlelands.auth0.com');
  }

  authenticated() {
    return tokenNotExpired('idp-idToken');
  }

  login(func = 'show') {
    this.lock[func]({}, (err, profile, token) => {
      if (err) {
        alert(err);
        return;
      }

      this.storage.profile = profile;
      this.storage.idToken = token;
      this.zoneImpl.run(() => this.user = profile);
      this.router.navigate(['/play']);
    });
  }

  logout() {
    this.swal.confirm({ text: 'Are you sure you want to log out?' }).then(res => {
      if(!res) return;
      this.storage.profile = null;
      this.storage.idToken = null;
      this.zoneImpl.run(() => this.user = null);
      this.primus.disconnect();
      this.router.navigate(['/']);
      window.location.reload();
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
  }

  canActivate() {
    if(this.storage.idToken && tokenNotExpired('idp-idToken')) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}