
import { Component } from '@angular/core';
import template from './home.html';
import './home.less';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  providers: [Auth],
  directives: [ROUTER_DIRECTIVES],
  template
})
export class HomeComponent {
  static get parameters() {
    return [[Auth]];
  }
  constructor(auth) {
    this.auth = auth;
  }
}