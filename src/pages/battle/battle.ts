// import * as _ from 'lodash';

import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Battle } from '../../models';

@IonicPage({
  segment: 'battle/:battleName',
  defaultHistory: ['OverviewPage']
})
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
    this.battle$ = this.appState.battle.subscribe(battle => {
      this.battle = this.restructureBattle(battle);
    });
    this.pet$ = this.appState.petactive.subscribe(pet => this.petName = pet.name);
    this.battle.messageData = [ { data: null, message: 'Loading' } ];
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

  restructureBattle(battle) {
    if (!battle || !battle.messageData) {
      return battle
    }

    battle.rounds = [];

    let round = -1;
    let currentRound;
    battle.messageData.forEach((i) => {
      if (i.data || !currentRound) {
        round += 1;
        battle.rounds[round] = {
          data: i.data || battle.initialParties,
          messages: [],
          header: i.message
        };
        currentRound = battle.rounds[round].messages
      } else {
        currentRound.push(i.message)
      }
    })

    return battle;
  }

}

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(message: string, checkString: string): string {
    message = message.trim();
    if(!checkString) return message;
    if(!message) return '';
    return message.replace(new RegExp(`(${checkString})`, 'gi'), '<span class="highlighted-text">$1</span>');
  }
}
