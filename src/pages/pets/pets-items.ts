
import * as _ from 'lodash';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { PetActive, Equipment, Item } from '../../models';

@Component({
  selector: 'page-pets-items',
  templateUrl: 'pets-items.html'
})
export class PetsItemsPage extends PlayComponent {

  petactive$: any;
  petactive: PetActive = new PetActive();

  equipment$: any;
  playerEquipment: Equipment;

  petEquipment: Item[];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.equipment$ = this.appState.equipment.subscribe(data => this.playerEquipment = data);
    this.petactive$ = this.appState.petactive.subscribe(data => this.setPetActive(data));

    this.primus.requestPets();
    this.primus.requestAchievements();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.equipment$.unsubscribe();
    this.petactive$.unsubscribe();
  }

  setPetActive(petactive) {
    this.petactive = petactive;
    this.petEquipment = _.sortBy(_.flatten(_.values(petactive.equipment)), 'type');
  }

}