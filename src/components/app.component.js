
import { Component } from '@angular/core';
import { TitleBarComponent } from './titlebar/titlebar.component';
import template from './app.html';

import { ROUTER_DIRECTIVES } from '@angular/router';

import { StorageService } from 'ng2-storage';

import './app.less';

import '../_themes/dark.less';
import '../_themes/amoled.less';

@Component({
  selector: 'app',
  directives: [TitleBarComponent, ROUTER_DIRECTIVES],
  template
})
export class App {
  static get parameters() {
    return [[StorageService]];
  }

  constructor(storage) {
    this.storage = storage.local;
  }
}