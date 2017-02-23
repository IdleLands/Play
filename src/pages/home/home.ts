import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Auth } from '../../services';

import { ConnectPage } from '../';
import { PrivacyPage } from '../';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public auth: Auth
  ) {}

  login() {
    this.auth.login()
      .then(() => {
        this.play();
      });
  }

  logout() {
    this.auth.logout();
  }

  privacy() {
    this.navCtrl.push(PrivacyPage);
  }

  play() {
    this.navCtrl.push(ConnectPage)
  }

}
