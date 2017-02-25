import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Player } from '../../models';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage extends PlayComponent {

  public player$: any;
  public player: Player;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.player$ = this.appState.player.subscribe(data => {
      this.player = data;
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.player$.unsubscribe();
  }

}
