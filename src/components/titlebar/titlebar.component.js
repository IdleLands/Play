
import _ from 'lodash';
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { StorageService } from 'ng2-storage';
import { Auth } from '../../services/auth';
import template from './titlebar.html';
import './titlebar.less';

@Component({
  selector: 'titlebar',
  providers: [Auth],
  directives: [ROUTER_DIRECTIVES],
  template
})
export class TitleBarComponent {
  static get parameters() {
    return [[Router], [Auth], [StorageService]];
  }

  constructor(router, auth, storage) {
    this.router = router;
    this.auth = auth;
    this.storage = storage.local;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  hideSelf() {
    return _.includes(this.router.url, '/play');
  }
}