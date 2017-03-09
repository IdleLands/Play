import * as _ from 'lodash';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';

import { AppState, Primus, ItemInfo, Theme } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { LocalStorage } from 'ng2-webstorage';

import { PetBasic, PetBuy, PetActive, Equipment, Item } from '../../models';

import * as defaultPetAttrs from './petattrs.json';

@Component({
  selector: 'page-pets-overview',
  templateUrl: 'pets-overview.html'
})
export class PetsOverviewPage extends PlayComponent implements OnInit, OnDestroy {

  @LocalStorage()
  public hidePets: boolean;

  @ViewChild('petSlides') public petSlides;

  petbasic$: any;
  petbasic: PetBasic[] = [];

  petactive$: any;
  petactive: PetActive = new PetActive();

  petbuy$: any;
  petbuy: PetBuy = {};

  equipment$: any;
  playerEquipment: Equipment;

  petEquipment: Item[];

  achievements$: any;
  petClasses: string[] = [];
  petAttrs: string[] = [];

  upgrades = [
    { name: 'Combat Aid Chance',  stat: 'battleJoinPercent',        info: (val) => `Battle join chance is ${val}%` },
    { name: 'Gold Storage',       stat: 'goldStorage',              info: (val) => `Gold storage is ${val.toLocaleString()}` },
    { name: 'Inventory Size',     stat: 'inventory',                info: (val) => `Inventory size is ${val}` },
    { name: 'Item Quality Bonus', stat: 'itemFindBonus',            info: (val) => `Bonus to item quality is ${val}` },
    { name: 'Item Find Time',     stat: 'itemFindTimeDuration',     info: (val) => `New item every ${val}s` },
    { name: 'Item Equip Bonus',   stat: 'itemFindRangeMultiplier',  info: (val) => `Bonus to item equipping is ${val*100}` },
    { name: 'Item Sell Bonus',    stat: 'itemSellMultiplier',       info: (val) => `Bonus to item selling is ${(val*100).toFixed(0)}%` },
    { name: 'Max Item Score',     stat: 'maxItemScore',             info: (val) => `Bonus to max equip item score is ${val}` },
    { name: 'Max Level',          stat: 'maxLevel',                 info: (val) => `Max level is ${val}` },
  ];

  get stats() {
    return ItemInfo.statOrder;
  }

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public theme: Theme,
    public platform: Platform
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.equipment$ = this.appState.equipment.subscribe(data => this.playerEquipment = data);
    this.petbasic$ = this.appState.petbasic.subscribe(data => this.petbasic = data);
    this.petbuy$ = this.appState.petbuy.subscribe(data => this.petbuy = data);
    this.petactive$ = this.appState.petactive.subscribe(data => this.setPetActive(data));
    this.achievements$ = this.appState.achievements.subscribe(data => this.parseAchievements(data));

    this.primus.requestPets();
    this.primus.requestAchievements();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.equipment$.unsubscribe();
    this.petbasic$.unsubscribe();
    this.petbuy$.unsubscribe();
    this.petactive$.unsubscribe();
    this.achievements$.unsubscribe();
  }

  get numSlides() {
    return this.platform.is('ios') || this.platform.is('android') ? 1 : 3;
  }

  setPetActive(petactive) {
    this.petactive = petactive;
    this.petEquipment = _.flatten(_.values(petactive.equipment));
  }

  parseAchievements(achievements) {
    const achiRewards = _(achievements)
      .map('rewards')
      .flattenDeep();

    this.petAttrs = achiRewards
      .filter(reward => reward.type === 'petattr')
      .map('petattr')
      .value()
      .concat(defaultPetAttrs);

    this.petClasses = achiRewards
      .filter(reward => reward.type === 'petclass')
      .map('petclass')
      .concat(['Monster'])
      .uniq()
      .value();
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

  makeActive(petType) {
    this.primus.makePetActive(petType);
  }

  changeAttr(newAttr) {
    this.primus.changePetAttr(newAttr);
  }

  changeClass(newClass) {
    this.primus.changePetClass(newClass);
  }

  takeGold() {
    this.primus.takePetGold();
  }

  feedGold() {
    const neededXp = this.petactive._xp.maximum - this.petactive._xp.__current;
    const totalGold = this.player.gold;
    const xpPerGold = this.petactive.$scale.xpPerGold[this.petactive.scaleLevel.xpPerGold];

    const maxGold = Math.min(Math.ceil(neededXp / xpPerGold), totalGold);

    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Feed your pet',
      message: `Your pet gains ${xpPerGold.toLocaleString()} xp per gold spent and needs ${neededXp.toLocaleString()} xp to level up. You have ${totalGold.toLocaleString()} gold and can spend ${maxGold.toLocaleString()} maximum.`,
      inputs: [{
        name: 'gold',
        type: 'number',
        value: ''+maxGold,
        placeholder: 'Gold to spend'
      }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Feed Max', handler: () => {
          this.primus.feedMax();
        } },
        { text: 'Feed', handler: data => {
          const gold = +data.gold;
          this.primus.feedPetGold(gold, maxGold);
        } }
      ]
    }).present();
  }

  upgradeAttr(attr) {
    this.primus.upgradePetAttr(attr);
  }

}