import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OverviewPage, CreatePage } from '../';
import { AppState, Primus } from '../../services';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage implements OnInit, OnDestroy {

  public isOnline$: any;
  public isOnline: boolean;

  constructor(
    public navCtrl: NavController,
    public appState: AppState,
    public primus: Primus
  ) {}

  ngOnInit() {
    this.appState.loggedIn.next(false);

    this.isOnline$ = this.appState.onlineStatus.subscribe(onlineStatus => {
      this.isOnline = onlineStatus === 'online';

      if(!this.isOnline) return;

      this.primus.checkIfExists(exists => {
        if(exists) {
          this.primus.login(() => {
            this.appState.loggedIn.next(true);
            this.navCtrl.setRoot(OverviewPage);
          });
          return;
        }

        this.navCtrl.push(CreatePage);
      });
    });

    this.primus.initSocket();
  }

  ngOnDestroy() {
    this.isOnline$.unsubscribe();
  }

}
