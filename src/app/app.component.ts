import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AppState } from '../services';

import {
  HomePage,
  OverviewPage,
  EquipmentPage,
  AchievementsPage,
  CollectiblesPage,
  StatisticsPage,
  ChatPage,
  MapPage,
  PetsPage,
  PremiumPage,
  SettingsPage
} from '../pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  theme: string = 'default';
  showSideMenu: boolean;

  rootPage: any = HomePage;

  pages: Array<{title: string, icon: string, component: any}> = [
    { title: 'Overview',      icon: 'body',       component: OverviewPage },
    { title: 'Equipment',     icon: 'shirt',      component: EquipmentPage },
    { title: 'Achievements',  icon: 'ribbon',     component: AchievementsPage },
    { title: 'Collectibles',  icon: 'magnet',     component: CollectiblesPage },
    { title: 'Statistics',    icon: 'analytics',  component: StatisticsPage },
    { title: 'Chat',          icon: 'chatboxes',  component: ChatPage },
    { title: 'Map',           icon: 'globe',      component: MapPage },
    { title: 'Pets',          icon: 'nutrition',  component: PetsPage },
    { title: 'Premium',       icon: 'cash',       component: PremiumPage },
    { title: 'Settings',      icon: 'cog',        component: SettingsPage }
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
