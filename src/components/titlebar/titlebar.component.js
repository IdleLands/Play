
import _ from 'lodash';
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { StorageService } from 'ng2-storage';
import { Auth } from '../../services/auth';
import { PrimusWrapper } from '../../services/primus';
import template from './titlebar.html';
import './titlebar.less';

@Component({
  selector: 'titlebar',
  directives: [ROUTER_DIRECTIVES],
  template
})
export class TitleBarComponent {
  static get parameters() {
    return [[Router], [Auth], [PrimusWrapper], [StorageService]];
  }

  constructor(router, auth, primus, storage) {
    this.router = router;
    this.auth = auth;
    this.primus = primus;
    this.storage = storage.local;
  }

  login() {
    this.auth.login().then(() => this.primus.initSocket());
  }

  logout() {
    this.auth.logout().then(() => this.primus.disconnect());
  }

  hideSelf() {
    return _.includes(this.router.url, '/play');
  }
}