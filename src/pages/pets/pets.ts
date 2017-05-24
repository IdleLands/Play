import * as _ from 'lodash';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';

import { AppState, Primus, Theme } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { PetsItemsPage } from './pets-items';
import { PetsOverviewPage } from './pets-overview';

import { PetBasic, PetActive, PetBuy, Item, Premium } from '../../models';

import { LocalStorageService } from 'ng2-webstorage';

@IonicPage({
  segment: 'pets'
})
@Component({
  selector: 'page-pets',
  templateUrl: 'pets.html'
})
export class PetsPage extends PlayComponent {
  public overviewRoot = PetsOverviewPage;
  public itemsRoot = PetsItemsPage;

  inventoryBadge: string = '';
  hasPet: boolean;

  petbasic$: any;
  petbasic: PetBasic[] = [];

  petactive$: any;
  petactive: PetActive = new PetActive();

  petbuy$: any;
  petbuy: PetBuy = {};

  petEquipment: Item[];

  premium$: any;
  premium: Premium = new Premium();

  public defaultTab = 0;

  @ViewChild('petPageContent')
  public petPageContent;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public theme: Theme,
    public storage: LocalStorageService
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.petbasic$ = this.appState.petbasic.subscribe(data => this.petbasic = data);
    this.petactive$ = this.appState.petactive.subscribe(data => this.setPetActive(data));
    this.petbuy$ = this.appState.petbuy.subscribe(data => this.petbuy = data);
    this.premium$ = this.appState.premium.subscribe(data => this.premium = data);

    const tab = this.storage.retrieve('currentPetTab');
    this.defaultTab = tab;
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.petbasic$.unsubscribe();
    this.petactive$.unsubscribe();
    this.petbuy$.unsubscribe();
    this.premium$.unsubscribe();
  }

  togglePetMenu() {
    this.menuCtrl.toggle('right');
  }

  get shouldShowPetMenu() {
    return this.petPageContent._elementRef.nativeElement.offsetWidth > 768;
  }

  setPetActive(petactive) {
    this.hasPet = !!petactive.name
    this.petactive = petactive;
    this.petEquipment = _.flatten(_.values(petactive.equipment));
    this.inventoryBadge = this.setBadge(petactive);
  }

  makeActive(petType) {
    this.primus.makePetActive(petType);
  }

  buyPet(petType) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Adopt Pet',
      message: `What would you like to call your pet ${petType}?`,
      inputs: [{
        name: 'name',
        placeholder: 'Pet Name'
      }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Buy', handler: data => {
          this.primus.buyPet(petType, data.name);
        } }
      ]
    }).present()
  }

  renamePet(petType, currentName) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Rename Pet',
      message: `What would you like to call your pet ${petType}?`,
      inputs: [{
        name: 'name',
        placeholder: 'Pet Name',
        value: currentName
      }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Rename', handler: data => {
          this.primus.renamePet(petType, data.name);
        } }
      ]
    }).present()
  }

  changeTab(newTab) {
    this.storage.store('currentPetTab', newTab.index);
  }

  setBadge(data) {
    if(!data.scaleLevel) return '';

    return `${data.inventory.length}/${data.$scale.inventory[data.scaleLevel.inventory]}`;
  }

}
