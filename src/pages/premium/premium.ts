// import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Premium } from '../../models';

@Component({
  selector: 'page-premium',
  templateUrl: 'premium.html'
})
export class PremiumPage extends PlayComponent implements OnInit, OnDestroy {

  public ilpGoldMargins = [500, 1000, 2500];

  premium$: any;
  premium: Premium = new Premium();

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
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.premium$.unsubscribe();
  }

  setPremium(premium) {
    this.premium = premium;
    this.updatePageData(`Your ILP: ${premium.ilp.toLocaleString()}`);
  }

  buyIlp(ilpToBuy: number) {
    this.primus.buyIlp(ilpToBuy);
  }

}
