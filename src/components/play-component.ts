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
    this.isOnline$ = this.appState.onlineStatus.subscribe(onlineStatus => {
      if(onlineStatus === 'online') return;

      this.navCtrl.setRoot(ConnectPage);
    });
  }

  ngOnDestroy() {
    this.isOnline$.unsubscribe();
  }
}