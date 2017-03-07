import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AppState, Primus, Theme } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Premium, Festival } from '../../models';

@Component({
  selector: 'page-premium',
  templateUrl: 'premium.html'
})
export class PremiumPage extends PlayComponent implements OnInit, OnDestroy {

  public ilpGoldMargins = [50, 500, 1000, 2500];

  premium$: any;
  premium: Premium = new Premium();

  festivals$: any;
  festivals: Festival[];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public theme: Theme
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.premium$ = this.appState.premium.subscribe(data => this.setPremium(data));
    this.festivals$ = this.appState.festivals.subscribe(data => this.setFestivals(data));
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.premium$.unsubscribe();
  }

  getTotalFestival(): Festival {
    const base = {
      name: 'All Festivals',
      endDate: _.maxBy(this.festivals, fest => new Date(fest.endDate).getTime()).endDate,
      bonuses: {}
    };

    _.each(this.festivals, fest => {
      _.each(_.keys(fest.bonuses), bonusKey => {
        if(!base.bonuses[bonusKey]) base.bonuses[bonusKey] = 0;
        base.bonuses[bonusKey] += fest.bonuses[bonusKey];
      });
    });

    return base;
  }

  setFestivals(festivals) {
    this.festivals = _.cloneDeep(festivals);
    if(this.festivals.length > 0) {
      this.festivals.unshift(this.getTotalFestival());
    }
  }

  festivalBonus(festivalBonuses) {
    return _.map(_.keys(festivalBonuses), key => `${key.toUpperCase()} +${(festivalBonuses[key] * 100).toFixed(0)}`);
  }

  setPremium(premium) {
    this.premium = premium;
    this.updatePageData(`Your ILP: ${premium.ilp.toLocaleString()}`);
  }

  buyIlp(ilpToBuy: number) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Buy ILP`,
      message: `Are you sure you want to buy ${ilpToBuy.toLocaleString()} ILP?`,
      buttons: [
        { text: 'Cancel' },
        { text: 'Yes, Please!', handler: () => {
          this.primus.buyIlp(ilpToBuy);
        } }
      ]
    }).present();
  }

  buyIlpItem(item: string) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Buy ${item}`,
      message: `Are you sure you want to buy ${item}?`,
      buttons: [
        { text: 'Cancel' },
        { text: 'Yes, Please!', handler: () => {
          this.primus.buyIlpItem(item);
        } }
      ]
    }).present();
  }

  createFestival() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Create Festival`,
      message: 'Enter the festival text here. Don\'t forget the bonuses and the hour duration!',
      inputs: [
        { type: 'text', name: 'festival', placeholder: '"Festival Name" xp=0.15 hours=24' }
      ],
      buttons: [
        { text: 'Cancel' },
        { text: 'Create Festival', handler: (data) => {
          this.primus.createFestival(data.festival);
        } }
      ]
    }).present();
  }

  cancelFestival(festival) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Cancel Festival',
      message: 'Are you sure you want to do this? The players will be very sad :(',
      buttons: [
        { text: 'No, Keep It' },
        { text: 'Yes, Cancel It', handler: () => {
          this.primus.cancelFestival(festival._id);
        } }
      ]
    }).present();
  }

}
