import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Auth } from '../../services';

import { ConnectPage, PrivacyPage } from '../';
import { Primus } from '../../services';

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
        console.error(e);
      });
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.primus.disconnectSocket();
      })
      .catch(e => {
        console.error(e);
      });
  }

  privacy() {
    this.navCtrl.push(PrivacyPage);
  }

  play() {
    this.navCtrl.push(ConnectPage)
  }

}
