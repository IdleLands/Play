import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
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
    public navCtrl: NavController
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
      endDate: _.maxBy(this.festivals, fest => new Date(fest.endDate).getMilliseconds()).endDate,
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
    this.primus.buyIlp(ilpToBuy);
  }

  buyIlpItem(item: string) {
    this.primus.buyIlpItem(item);
  }

}
