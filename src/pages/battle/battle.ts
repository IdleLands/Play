// import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Battle } from '../../models';

@Component({
  selector: 'page-battle',
  templateUrl: 'battle.html'
})
export class BattlePage extends PlayComponent implements OnInit, OnDestroy {

  battle$: any;
  battle: Battle = new Battle();

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    const battleName = this.navParams.get('battleName');
    this.battle$ = this.appState.battle.subscribe(battle => this.battle = battle);

    this.primus.loadBattle(battleName);
  }

  ngOnDestroy() {
    this.battle$.unsubscribe();
  }

}
