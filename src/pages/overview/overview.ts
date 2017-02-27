import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus, ItemCompare } from '../../services';
import { PlayComponent } from '../../components/play.component';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage extends PlayComponent implements OnInit {

  public stats = ['str', 'con', 'dex', 'agi', 'int', 'luk'];
  public choices = [];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public icomp: ItemCompare
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();
    this.primus.requestEquipment();
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
    this.icomp.compare(playerItem, choiceItem);
  }

}
