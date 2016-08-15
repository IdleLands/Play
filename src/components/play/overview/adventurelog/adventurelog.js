
import { Component } from '@angular/core';
import template from './adventurelog.html';
import './adventurelog.less';

import { ROUTER_DIRECTIVES } from '@angular/router';
import { PrimusWrapper } from '../../../../services/primus';

@Component({
  template,
  selector: 'adventurelog',
  inputs: ['adventureLog'],
  directives: [ROUTER_DIRECTIVES]
})
export class AdventureLogComponent {

  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
  }
}