
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { PetsItemsPage } from './pets-items';
import { PetsOverviewPage } from './pets-overview';

import { LocalStorageService } from 'ng2-webstorage';

@Component({
  selector: 'page-pets',
  templateUrl: 'pets.html'
})
export class PetsPage extends PlayComponent {
  public overviewRoot = PetsOverviewPage;
  public itemsRoot = PetsItemsPage;

  petactive$: any;
  inventoryBadge: string = '';

  public defaultTab = 0;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public storage: LocalStorageService
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.petactive$ = this.appState.petactive.subscribe(data => this.inventoryBadge = this.setBadge(data));

    const tab = this.storage.retrieve('currentPetTab');
    this.defaultTab = tab;
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.petactive$.unsubscribe();
  }

  changeTab(newTab) {
    this.storage.store('currentPetTab', newTab.index);
  }

  setBadge(data) {
    if(!data.scaleLevel) return '';

    return `${data.inventory.length}/${data.$scale.inventory[data.scaleLevel.inventory]}`;
  }

}