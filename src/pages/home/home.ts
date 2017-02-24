import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { NavController } from 'ionic-angular';
import 'reddit.js';

import { Auth } from '../../services';

import { ConnectPage, PrivacyPage } from '../';
import { Primus } from '../../services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public redditPosts = [];
  public didRedditFail: boolean;

  constructor(
    public navCtrl: NavController,
    public auth: Auth,
    public primus: Primus
  ) {}

  ngOnInit() {
    (<any>window).reddit.search('flair:News', 'idle_lands').restrict_sr(true).t('all').limit(3).sort('new').fetch(res => {
      if(!res || !res.data || !res.data.children) {
        this.didRedditFail = true;
        return;
      }
      this.redditPosts = _.map(res.data.children, 'data');
    }, () => this.didRedditFail = true);
  }

  login() {
    this.auth.login()
      .then(() => {
        this.play();
      });
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.primus.disconnectSocket();
      });
  }

  privacy() {
    this.navCtrl.push(PrivacyPage);
  }

  play() {
    this.navCtrl.push(ConnectPage)
  }

}
