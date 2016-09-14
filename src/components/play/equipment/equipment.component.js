
import _ from 'lodash';

import { Component } from '@angular/core';
import { PrimusWrapper } from '../../../services/primus';

import { ItemComponent } from '../_shared/item/item.component';

import template from './equipment.html';
import './equipment.less';

@Component({
  selector: 'equipment',
  directives: [ItemComponent],
  template
})
export class EquipmentComponent {
  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
    this.stats = ['str', 'con', 'dex', 'agi', 'int', 'luk'];

    this.equippedItemButtons = [
      { tooltip: 'Give to Pet', name: 'Pet', callback: (item) => this.primus.giveItemToPet(item.id) }
    ];
  }

  setPlayerData(data) {
    this.player = { equipment: data };
    this.equipmentKeys = _.sortBy(_.keys(this.player.equipment));
  }

  ngOnInit() {
    this.equipmentSubscription = this.primus.contentUpdates.equipment.subscribe(data => this.setPlayerData(data));
    this.primus.requestEquipment();
  }

  ngOnDestroy() {
    this.equipmentSubscription.unsubscribe();
  }
}