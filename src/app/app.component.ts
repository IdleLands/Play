import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AppState } from '../services';

import { HomePage, OverviewPage, EquipmentPage } from '../pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  theme: string = 'default';
  showSideMenu: boolean;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}> = [
    { title: 'Overview',    component: OverviewPage },
    { title: 'Equipment',   component: EquipmentPage }
  ];

  constructor(public platform: Platform, public state: AppState) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.state.showSideMenu.subscribe(isLoggedIn => {
      this.showSideMenu = isLoggedIn;
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
