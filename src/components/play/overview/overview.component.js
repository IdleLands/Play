
import { Component } from '@angular/core';
import template from './overview.html';
import './overview.less';

import { PlayerCardComponent } from './playercard/playercard';
import { AdventureLogComponent } from './adventurelog/adventurelog';
import { ChoiceLogComponent } from './choicelog/choicelog';

import { EquipmentComponent } from '../equipment/equipment.component';

import { PrimusWrapper } from '../../../services/primus';

import { StorageService } from 'ng2-storage';

@Component({
  template,
  directives: [PlayerCardComponent, AdventureLogComponent, ChoiceLogComponent, EquipmentComponent]
})
export class OverviewComponent {

  static get parameters() {
    return [[PrimusWrapper], [StorageService]];
  }

  constructor(primus, storage) {
    this.primus = primus;
    this.storage = storage.local;
  }

  ngOnInit() {
    this.primus.requestEquipment();
    this.primus.requestPets();
  }
}