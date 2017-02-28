
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { PetsItemsPage } from './pets-items';
import { PetsOverviewPage } from './pets-overview';

@Component({
  selector: 'page-pets',
  templateUrl: 'pets.html'
})
export class PetsPage extends PlayComponent {
  public overviewRoot = PetsOverviewPage;
  public itemsRoot = PetsItemsPage;

  petactive$: any;
  inventoryBadge: string = '';

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.petactive$ = this.appState.petactive.subscribe(data => this.inventoryBadge = this.setBadge(data));
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.petactive$.unsubscribe();
  }

  setBadge(data) {
    if(!data.scaleLevel) return '';

    return `${data.inventory.length}/${data.$scale.inventory[data.scaleLevel.inventory]}`;
  }

}