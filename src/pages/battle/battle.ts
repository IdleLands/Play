// import * as _ from 'lodash';

import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
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

  pet$: any;
  petName: string;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    const battleName = this.navParams.get('battleName');
    this.battle$ = this.appState.battle.subscribe(battle => this.battle = battle);
    this.pet$ = this.appState.petactive.subscribe(pet => this.petName = pet.name);

    this.primus.loadBattle(battleName);
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.appState.battle.next(new Battle());
    this.battle$.unsubscribe();
    this.pet$.unsubscribe();
  }

  battleHeader(item) {
    if(!item.data) return null;
    return item.data;

  }

}

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(message: string, checkString: string): string {
    if(!message) return '';
    return message.replace(new RegExp(`(${checkString})`, 'gi'), '<span class="highlighted-text">$1</span>');
  }
}