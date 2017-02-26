import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConnectPage } from '../pages';
import { AppState, Primus } from '../services';

@Component({})
export class PlayComponent implements OnInit, OnDestroy {

  private isOnline$: any;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.appState.showSideMenu.next(true);

    const toConnecting = () => {
      this.navCtrl.setRoot(ConnectPage, { fromPage: this.constructor.name });
    };

    this.isOnline$ = this.appState.onlineStatus.subscribe(onlineStatus => {
      if(onlineStatus === 'online') return;
      toConnecting();
    });
  }

  ngOnDestroy() {
    this.isOnline$.unsubscribe();
  }
}