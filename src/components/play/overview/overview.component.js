
import { Component } from '@angular/core';
import template from './overview.html';
import './overview.less';

import { PlayerCardComponent } from './playercard/playercard';
import { AdventureLogComponent } from './adventurelog/adventurelog';

import { PrimusWrapper } from '../../../services/primus';

@Component({
  template,
  directives: [PlayerCardComponent, AdventureLogComponent]
})
export class OverviewComponent {

  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
  }
}