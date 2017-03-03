import * as _ from 'lodash';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocalStorageService } from 'ng2-webstorage';

import { AppState, Primus, ItemCompare, ItemInfo } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { AdventureLog } from '../../models';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage extends PlayComponent implements OnInit, OnDestroy {

  public stats = [];
  public choices = [];

  public adventureLog$: any;
  public adventureLog: AdventureLog[] = [];

  party$: any;
  public party: any;

  @ViewChild('choiceSlides') public choiceSlides;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public icomp: ItemCompare,
    public storage: LocalStorageService
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
      this.storage.store('adventureLog', this.adventureLog);
    });

    this.party$ = this.appState.party.subscribe(data => {
      this.party = data;
    });

    this.primus.requestEquipment();
    this.primus.requestParty();
  }

  ngOnDestroy() {
    this.adventureLog$.unsubscribe();
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

  }

}
