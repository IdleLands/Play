import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AppState } from '../services/appstate.service';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  theme: string = 'default';
  showSideMenu: boolean;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}> = [
    // { title: 'Overview', component: OverviewPage }
  ];

  constructor(public platform: Platform, public state: AppState) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.state.loggedIn.subscribe(isLoggedIn => {
      this.showSideMenu = isLoggedIn;
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
