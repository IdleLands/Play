import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalStorageService } from 'ng2-webstorage';

import * as _ from 'lodash';

import { Observable } from 'rxjs';

import {
  OverviewPage,
  EquipmentPage,
  AchievementsPage,
  CollectiblesPage,
  StatisticsPage,
  ChatPage,
  MapPage,
  PetsPage,
  PremiumPage,
  SettingsPage,
  BattlePage,
  CreatePage,
  HomePage
} from '../';
import { AppState, Primus } from '../../services';

import * as messages from './messages.json';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage implements OnInit, OnDestroy {

  public onlineStatus$: any;
  public isOnline: boolean;

  public loggedIn$: any;
  public loggedIn: boolean;

  public hasCharacter$: any;
  public hasCharacter: boolean;

  public connectMessage$: any;
  public currentMessage = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appState: AppState,
    public primus: Primus,
    public storage: LocalStorageService
  ) {}

  ngOnInit() {

    this.appState.loggedIn.next(false);
    this.appState.showSideMenu.next(false);

    this.onlineStatus$ = this.appState.onlineStatus.subscribe(onlineStatus => {
      this.isOnline = onlineStatus === 'online';
      this.handleLoggedInAndStatus();
    });

    this.loggedIn$ = this.appState.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      this.handleLoggedInAndStatus();
    });

    this.hasCharacter$ = this.appState.hasCharacter.subscribe(hasCharacter => {
      this.hasCharacter = hasCharacter;
      this.handleLoggedInAndStatus();
    });

    this.connectMessage$ = Observable.timer(0, 1000).subscribe(() => {
      this.currentMessage = _.sample(messages);
    });

    this.primus.initSocket();
  }

  handleLoggedInAndStatus() {
    if(!this.storage.retrieve('profile')) {
      this.navCtrl.setRoot(HomePage);
      return;
    }

    // can't be defined anywhere else or pages won't be instantiated
    const backrefPages = {
      OverviewPage,
      EquipmentPage,
      AchievementsPage,
      CollectiblesPage,
      StatisticsPage,
      ChatPage,
      MapPage,
      PetsPage,
      PremiumPage,
      SettingsPage,
      BattlePage
    };

    if(_.isUndefined(this.loggedIn)
    || _.isUndefined(this.isOnline)
    || _.isUndefined(this.hasCharacter)
    || !this.isOnline
    || !this.loggedIn) return;

    if(!this.hasCharacter) {
      this.navCtrl.push(CreatePage);
    } else {
      const ref = this.navParams.get('fromPage') || 'OverviewPage';
      this.navCtrl.setRoot(backrefPages[ref]);
    }
  }

  ngOnDestroy() {
    this.onlineStatus$.unsubscribe();
    this.loggedIn$.unsubscribe();
    this.connectMessage$.unsubscribe();
  }

}
