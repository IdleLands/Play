import * as _ from 'lodash';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';

import { AppState, Primus, ItemCompare, ItemInfo, Theme } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { BattlePage } from '../';

import { AdventureLog, Shop } from '../../models';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage extends PlayComponent implements OnInit, OnDestroy {

  public stats = [];
  public choices = [];

  public adventureLog$: any;
  public adventureLog: AdventureLog[] = [];

  public shop$: any;
  public shop: Shop;

  party$: any;
  public party: any;

  @ViewChild('choiceSlides') public choiceSlides;

  shopButtons = [
    { name: 'Buy', callback: (item) => {
      const equipment = this.appState.equipment.getValue();
      const buttons = [
        { text: `Buy for ${item.price.toLocaleString()} gold`, color: 'primary', callback: () => this.primus.buyShopItem(item.id) },
        { text: 'Close', color: 'light', callback: () => {} }
      ];
      this.icomp.compare(equipment[item.type], item, buttons).then(button => {
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
    public theme: Theme,
    public platform: Platform
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.stats = ItemInfo.statOrder;

    this.adventureLog$ = this.appState.adventureLog.subscribe(data => {
      if(!this.adventureLog) this.adventureLog = [];

      this.adventureLog.unshift(data);
      if(this.adventureLog.length > 50) {
        this.adventureLog.length = 50;
      }
    });

    this.shop$ = this.appState.shop.subscribe(data => this.shop = data);

    this.party$ = this.appState.party.subscribe(data => {
      this.party = data;
    });

    this.primus.requestEquipment();
    this.primus.requestParty();
    this.primus.requestShop();
  }

  ngOnDestroy() {
    this.adventureLog$.unsubscribe();
    this.party$.unsubscribe();
    this.shop$.unsubscribe();
  }

  get equipment() {
    return this.appState.equipment.getValue();
  }

  get numSlides() {
    return this.platform.is('ios') || this.platform.is('android') ? 1 : 3;
  }

  setPlayer(player) {
    super.setPlayer(player);

    this.setChoices(player.choices);
  }

  setChoices(choices) {
    const add = _.differenceBy(choices, this.choices, 'id');
    const remove = _.map(_.differenceBy(this.choices, choices, 'id'), 'id');
    this.choices.push(...add);
    this.choices = _.reject(this.choices, choice => _.includes(remove, choice.id));

    if(this.choices.length < 4 && this.choices.length > 0) {
      try {
        this.choiceSlides.slideTo(0);
      } catch(e) {}
    }
  }

  makeChoice(id, choice) {
    this.primus.makeChoice(id, choice);

    if(choice === 'Yes') {
      this.primus.requestEquipment();
    }
  }

  moreInfo(choice) {
    const choiceItem = choice.extraData.item;
    const equipment = this.appState.equipment.getValue();
    const playerItem = equipment[choiceItem.type] || { str: 0, dex: 0, con: 0, int: 0, agi: 0, luk: 0, _baseScore: 1, _calcScore: 1 };

    const buttons = [
      { text: 'Equip',      color: 'primary', callback: () => this.makeChoice(choice.id, 'Yes') },
      { text: 'Discard',    color: 'danger',  callback: () => this.makeChoice(choice.id, 'No') },
      { text: 'Close',      color: 'light',   callback: () => {} }
    ];

    this.icomp.compare(playerItem, choiceItem, buttons).then(button => {
      if(!button) return;
      button.callback();
    });
  }

  openLink(link) {
    window.open(link, '_blank');
  }

  viewBattle(id) {
    this.navCtrl.push(BattlePage, { battleName: id });
  }

  leaveParty() {
    this.primus.leaveParty();
  }

  ascend() {

    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Ascension Confirmation',
      message: `Are you sure you want to ascend? <br><br>You will: go back to level 1, 
                lose all of your items, lose all of your pet items, lose all of your gold, lose all of your pet gold, 
                and lose all of your collectibles. <br><br>In return, you will: increase your maximum level by 50, have a bonus to gold find and xp gain,
                go up one ascension level, and create an experience and gold festival for all players. Your collectibles will be remembered.`,
      buttons: [
        { text: 'No, Nevermind' },
        {
          text: 'Yes, Ascend',
          handler: () => {
            this.primus.ascend();
          }
        }
      ]
    }).present();
  }

}
