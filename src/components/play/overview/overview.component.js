
import { Component } from '@angular/core';
import template from './overview.html';
import './overview.less';

import { PlayerCardComponent } from './playercard/playercard';
import { AdventureLogComponent } from './adventurelog/adventurelog';
import { ChoiceLogComponent } from './choicelog/choicelog';

import { PrimusWrapper } from '../../../services/primus';

@Component({
  template,
  directives: [PlayerCardComponent, AdventureLogComponent, ChoiceLogComponent]
})
export class OverviewComponent {

  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
  }

  ngOnInit() {
    this.primus.requestEquipment();
  }
}