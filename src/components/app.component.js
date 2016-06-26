
import { Component } from '@angular/core';
import { TitleBarComponent } from './titlebar/titlebar.component';
import template from './app.html';

import { ROUTER_DIRECTIVES } from '@angular/router';

import './app.less';

@Component({
  selector: 'app',
  directives: [TitleBarComponent, ROUTER_DIRECTIVES],
  template
})
export class App {}