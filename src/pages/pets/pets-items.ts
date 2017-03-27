
import * as _ from 'lodash';

import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AppState, Primus, ItemCompare, Theme } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { PetActive, PetBasic, Equipment, Item } from '../../models';

@Component({
  selector: 'page-pets-items',
  templateUrl: 'pets-items.html'
})
export class PetsItemsPage extends PlayComponent {

  petactive$: any;
  petactive: PetActive = new PetActive();

  petbasic$: any;
  boughtPets: PetBasic[];

  equipment$: any;
  playerEquipment: Equipment;

  petEquipment: Item[];

  private currentItemId: string;

  @ViewChild('pets')
  public pets;

  equippedItemButtons = [
    { name: 'Unequip Item',
      disable: () => this.petactive.inventory.length === this.petactive.$scale.inventory[this.petactive.scaleLevel.inventory],
      disableReason: 'Inventory full',
      callback: (item) => this.primus.unequipItemFromPet(item.id) }
  ];

  inventoryButtons = [
    { name: 'Sell Item', callback: (item) => this.primus.sellItemFromPet(item.id) },
    { name: 'Salvage Item',
      disable: () => this.petactive.$scale.salvage[this.petactive.scaleLevel.salvage] === 0,
      disableReason: 'Pet cannot salvage',
      callback: (item) => this.primus.salvageItemFromPet(item.id) },
    { name: 'Give To Other Pet', callback: (item) => {
      this.currentItemId = item.id;
      this.pets.open();
    } },
    { name: 'Compare Item (Pet)',
      disable: (item) => item._calcScore > this.petactive.statCache.itemFindRange,
      disableReason: 'Pet max score too low',
      callback: (item) => this.primus.equipItemOnPet(item.id)
    },
    { name: 'Compare Item (Player)',
      disable: (item) => item._calcScore > this.player.statCache.itemFindRange && !item._wasEquipped,
      disableReason: 'Player max score too low',
      callback: (item) => {

      const buttons = [
        { text: 'Equip',      color: 'primary', callback: () => this.primus.giveItemToPlayer(item.id) },
        { text: 'Sell',       color: 'danger',  callback: () => this.primus.sellItemFromPet(item.id) },
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
    public icomp: ItemCompare,
    public alertCtrl: AlertController,
    public theme: Theme
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.pets.selectOptions = { cssClass: this.theme.currentTheme };

    this.equipment$ = this.appState.equipment.subscribe(data => this.playerEquipment = data);
    this.petactive$ = this.appState.petactive.subscribe(activeData => {
      this.setPetActive(activeData);

      if(this.petbasic$) this.petbasic$.unsubscribe();

      this.petbasic$ = this.appState.petbasic.subscribe(basicData => this.boughtPets = _.filter(basicData, pet => {
        return pet.bought && pet.name !== activeData.$petId;
      }));
    });

    this.primus.requestPets();
    this.primus.requestAchievements();
    this.primus.requestEquipment();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.equipment$.unsubscribe();
    this.petactive$.unsubscribe();
    this.petbasic$.unsubscribe();
  }

  _chooseOtherPet(petId) {
    this.primus.giveItemToOtherPet(this.currentItemId, petId);
  }

  setPetActive(petactive) {
    this.petactive = petactive;
    this.petEquipment = _.sortBy(_.flatten(_.values(petactive.equipment)), 'type');
  }

  sellAll() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Sell All Pet Items',
      message: `Are you sure you want to sell all of your pet items?`,
      buttons: [
        { text: 'Cancel' },
        { text: 'Yes, get rid of them!', handler: () => {
          this.primus.sellAllItemsFromPet();
        } }
      ]
    }).present()
  }

  salvageAll() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Salvage All Pet Items',
      message: `Are you sure you want to salvage all of your pet items?`,
      buttons: [
        { text: 'Cancel' },
        { text: 'Yes, give me Astralium!', handler: () => {
          this.primus.salvageAllItemsFromPet();
        } }
      ]
    }).present()
  }

}