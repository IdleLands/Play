import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConnectPage } from '../pages';
import { AppState, Primus } from '../services';

import { Player } from '../models';

@Component({})
export class PlayComponent implements OnInit, OnDestroy {

  public player$: any;
  public player: Player;

  private isOnline$: any;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {}

  setPlayer(player: Player) {
    this.player = player;
  }

  updatePageData(string) {
    this.appState.activePageData.next({ page: this.constructor.name, data: string });
  }

  ngOnInit() {
    this.appState.showSideMenu.next(true);
    this.updatePageData('');

    const toConnecting = () => {
      this.navCtrl.setRoot(ConnectPage, { fromPage: this.constructor.name });
    };

    this.isOnline$ = this.appState.onlineStatus.subscribe(onlineStatus => {
      if(onlineStatus === 'online') return;
      toConnecting();
    });

    this.player$ = this.appState.player.subscribe(data => {
      this.setPlayer(data);
    });
  }

  ngOnDestroy() {
    this.isOnline$.unsubscribe();
    this.player$.unsubscribe();
  }
}