import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

@Component({
  selector: 'page-equipment',
  templateUrl: 'equipment.html'
})
export class EquipmentPage extends PlayComponent implements OnInit, OnDestroy {

  equipment$: any;
  public equipment: any;
  public iterationOrder: string[];

  equippedItemButtons = [
    { name: 'To Pet', callback: (item) => this.primus.giveItemToPet(item.id) }
  ];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.equipment$ = this.appState.equipment.subscribe(data => {
      this.setEquipment(data);
    });

    this.primus.requestEquipment();
  }

  ngOnDestroy() {
    this.equipment$.unsubscribe();
  }

  setEquipment(data) {
    this.equipment = data;
    this.iterationOrder = _.sortBy(_.keys(data));
  }

}
