
import * as _ from 'lodash';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus, ItemCompare } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { PetActive, Equipment, Item } from '../../models';

@Component({
  selector: 'page-pets-items',
  templateUrl: 'pets-items.html'
})
export class PetsItemsPage extends PlayComponent {

  petactive$: any;
  petactive: PetActive = new PetActive();

  equipment$: any;
  playerEquipment: Equipment;

  petEquipment: Item[];

  equippedItemButtons = [
    { name: 'Unequip Item', callback: (item) => this.primus.unequipItemFromPet(item.id) }
  ];

  inventoryButtons = [
    { name: 'Sell Item', callback: (item) => this.primus.sellItemFromPet(item.id) },
    { name: 'Equip Item (Pet)', callback: (item) => this.primus.equipItemOnPet(item.id) },
    { name: 'Equip Item (Player)', callback: (item) => {

      const buttons = [
        { text: 'Equip',      color: 'primary', callback: () => this.primus.giveItemToPlayer(item.id) },
        { text: 'Close',      color: 'light',   callback: () => {} }
      ];

      const playerItem = this.playerEquipment[item.type] || { name: 'nothing', type: item.type, str: 0, dex: 0, con: 0, int: 0, agi: 0, luk: 0, _baseScore: 1, _calcScore: 1 };
      this.icomp.compare(playerItem, item, buttons).then(button => {
        if(!button) return;
        button.callback();
      });
    } }
  ];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public icomp: ItemCompare
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.equipment$ = this.appState.equipment.subscribe(data => this.playerEquipment = data);
    this.petactive$ = this.appState.petactive.subscribe(data => this.setPetActive(data));

    this.primus.requestPets();
    this.primus.requestAchievements();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.equipment$.unsubscribe();
    this.petactive$.unsubscribe();
  }

  setPetActive(petactive) {
    this.petactive = petactive;
    this.petEquipment = _.sortBy(_.flatten(_.values(petactive.equipment)), 'type');
  }

}