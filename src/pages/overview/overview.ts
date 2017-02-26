import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage extends PlayComponent {

  public stats = ['str', 'con', 'dex', 'agi', 'int', 'luk'];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
