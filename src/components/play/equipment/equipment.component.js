
import _ from 'lodash';

import { Component } from '@angular/core';
import { PrimusWrapper } from '../../../services/primus';

import template from './equipment.html';
import './equipment.less';

@Component({
  template
})
export class EquipmentComponent {
  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
    this.stats = ['str', 'con', 'dex', 'agi', 'int', 'luk'];
  }

  setPlayerData(data) {
    this.player = data;
    this.equipmentKeys = _.sortBy(_.keys(data.equipment));
  }

  scoreRating(item) {
    return Math.round(item._calcScore/item._baseScore*100);
  }

  ngOnInit() {
    this.playerSubscription = this.primus.contentUpdates.player.subscribe(data => this.setPlayerData(data));
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }
}