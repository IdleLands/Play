import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

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
