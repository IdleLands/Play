
import _ from 'lodash';
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import template from './playbar.html';

@Component({
  selector: 'playbar',
  providers: [Auth],
  directives: [ROUTER_DIRECTIVES],
  inputs: ['hideTabs'],
  template
})
export class PlayBarComponent {
  static get parameters() {
    return [[Router], [Auth]];
  }

  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }

  logout() {
    this.auth.logout();
  }

  hasActiveRoute(fragment) {
    return _.includes(this.router.url, fragment);
  }
}