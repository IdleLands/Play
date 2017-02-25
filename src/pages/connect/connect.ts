import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

import { Observable } from 'rxjs';

import { OverviewPage, CreatePage } from '../';
import { AppState, Primus } from '../../services';

import * as messages from './messages.json';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage implements OnInit, OnDestroy {

  public isOnline$: any;
  public isOnline: boolean;

  public connectMessage$: any;
  public currentMessage = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appState: AppState,
    public primus: Primus
  ) {}

  ngOnInit() {

    // can't be defined anywhere else or pages won't be instantiated
    const backrefPages = {
      OverviewPage
    };

    this.appState.loggedIn.next(false);

    this.isOnline$ = this.appState.onlineStatus.subscribe(onlineStatus => {
      this.isOnline = onlineStatus === 'online';

      if(!this.isOnline) return;

      this.primus.checkIfExists(exists => {
        if(exists) {
          this.primus.login(() => {
            this.appState.loggedIn.next(true);

            const ref = this.navParams.get('fromPage') || 'OverviewPage';
            this.navCtrl.setRoot(backrefPages[ref]);
          });
          return;
        }

        this.navCtrl.push(CreatePage);
      });
    });

    this.connectMessage$ = Observable.timer(0, 1000)
      .subscribe(() => {
        this.currentMessage = _.sample(messages);
      });

    this.primus.initSocket();
  }

  ngOnDestroy() {
    this.isOnline$.unsubscribe();
    this.connectMessage$.unsubscribe();
  }

}
