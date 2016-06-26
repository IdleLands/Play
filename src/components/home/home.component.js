
import { Component } from '@angular/core';
import template from './home.html';
import './home.less';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template
})
export class HomeComponent {
  constructor() {
  }
}