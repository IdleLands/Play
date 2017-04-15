import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

import { Auth } from '../../services';

import { Primus, Logger } from '../../services';

@IonicPage({
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public primus: Primus
  ) {}

  login() {
    this.auth.login()
      .then(() => {
        this.play();
      })
      .catch(e => {
        Logger.error(e);
      });
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.primus.disconnectSocket();
      })
      .catch(e => {
        Logger.error(e);
      });
  }

  privacy() {
    this.navCtrl.push('PrivacyPage');
  }

  play() {
    this.navCtrl.push('ConnectPage');
  }

}
