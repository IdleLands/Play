import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'ng2-storage';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

import { PrimusWrapper } from './primus';

@Injectable()
export class Auth {

  static get parameters() {
    return [[NgZone], [Router], [StorageService], [PrimusWrapper]];
  }

  constructor(zone, router, storage, socketCluster) {
    this.zoneImpl = zone;
    this.router = router;
    this.storage = storage.local;
    this.user = this.storage.profile;
    this.sc = socketCluster;

    this.lock = new Auth0Lock('eeZLr1IQYWDYgxUtEAAiibI4617kIfT9', 'idlelands.auth0.com');
  }

  authenticated() {
    return tokenNotExpired('idp-idToken');
  }

  login() {
    this.lock.show({}, (err, profile, token) => {
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
    this.storage.profile = null;
    this.storage.idToken = null;
    this.zoneImpl.run(() => this.user = null);
    this.sc.disconnect();
    this.router.navigate(['/']);
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