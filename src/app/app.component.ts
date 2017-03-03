
import * as _ from 'lodash';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LocalStorageService, LocalStorage } from 'ng2-webstorage';

import { AppState, Primus, Auth } from '../services';

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

  @LocalStorage()
  theme: string;
  showSideMenu: boolean;

  rootPage: any = HomePage;

  activePage: string;
  activePageData: string;

  hasPet: boolean;

  public onlineStatusIcon: string;
  public currentStatusString = 'IdleLands';
  private clicks = 0;

  public choices: number = 0;
  public latestMessages: number = 0;

  pages: Array<{title: string, icon: string, component: any, extraContent?: Function, showBadge?: Function, badge?: Function}> = [
    { title: 'Overview',      icon: 'body',       component: OverviewPage, showBadge: () => this.choices > 0, badge: () => this.choices },
    { title: 'Map',           icon: 'globe',      component: MapPage },
    { title: 'Equipment',     icon: 'shirt',      component: EquipmentPage },
    { title: 'Achievements',  icon: 'ribbon',     component: AchievementsPage },
    { title: 'Collectibles',  icon: 'magnet',     component: CollectiblesPage },
    { title: 'Statistics',    icon: 'analytics',  component: StatisticsPage },
    { title: 'Pets',          icon: 'nutrition',  component: PetsPage },
    { title: 'Chat',          icon: 'chatboxes',  component: ChatPage, showBadge: () => this.latestMessages > 0, badge: () => this.latestMessages },
    { title: 'Premium',       icon: 'cash',       component: PremiumPage },
    { title: 'Settings',      icon: 'cog',        component: SettingsPage }
  ];

  constructor(
    public platform: Platform,
    public state: AppState,
    public storage: LocalStorageService,
    public primus: Primus,
    public auth: Auth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    if(!this.theme) this.theme = 'default';

    this.state.showSideMenu.subscribe(isLoggedIn => {
      this.showSideMenu = isLoggedIn;
    });

    this.subscribeForExtraContentChanges();

    this.primus.requestPets();
  }

  subscribeForExtraContentChanges() {
    const statusIcons = {
      online:       'cloud',
      connecting:   'reconnecting',
      offline:      'sad'
    };

    this.state.onlineStatus.subscribe(onlineStatus => {
      this.onlineStatusIcon = statusIcons[onlineStatus];
    });

    this.state.activePageData.subscribe(({ page, data }) => {
      this.activePage = page.substring(0, page.length - 4);
      if(_.includes(this.activePage, 'Pets')) {
        this.activePage = 'Pets';
      }
      this.activePageData = data;

      if(this.activePage === 'Chat') {
        this.latestMessages = 0;
      }
    });

    this.state.petactive.subscribe(data => {
      if(!data.name) return;
      this.hasPet = true;
    });

    this.state.player.subscribe(data => {
      this.choices = data.choices.length;
    });

    const now = Date.now();
    this.state.chatMessages.subscribe(data => {
      if(data.hidden || data.timestamp < now || this.activePage === 'Chat') return;
      this.latestMessages++;
    });
  }

  clickStatus() {
    if(this.clicks > 500) {
      this.clicks = 0;
    }

    const clicks = {
      0:    'IdleLands',
      5:    'Why are you doing this?',
      10:   'There are better things to do...',
      20:   'Go back to idling!',
      50:   'Stop that.',
      60:   'Really, stop that.',
      70:   'Please?',
      75:   'Please??',
      80:   'Please???',
      85:   'Please????',
      90:   'Please?????',
      95:   'Please??????',
      100:  'Please???????',
      105:  'Fine.',
      120:  'I have accepted this.',
      150:  'Okay, maybe not really.',
      170:  'You\'re being pretty annoying.',
      200:  'LEAVE ME ALONE',
      201:  'OR ELSE',
      202:  'I WILL DISCONNECT YOU',
      205:  '... That didn\'t stop you?',
      210:  'I was being mean :(',
      211:  'Please come back :(',
      212:  'I didn\'t mean it :(',
      215:  'Sigh...',
      220:  'Okay, we\'re done here.',
      225:  'No, really, we\'re done.',
      250:  'I SAID WE\'RE DONE!',
      275:  'NO SOUP FOR YOU!',
      300:  'GOOD DAY SIR (or madam)!',
      350:  'W',
      351:  'H',
      352:  'Y',
      355:  '...',
      356:  '....',
      357:  '.....',
      358:  '......',
      359:  '.......',
      360:  '........',
      361:  '.........................................',
      362:  'Goodbye.',
      363:  '...'
    };

    let newMessage = clicks[++this.clicks];

    const name = this.storage.retrieve('profile').given_name;
    if(name && this.clicks === 362) {
      newMessage = `Goodbye, ${name}.`;
    }

    this.currentStatusString = newMessage || this.currentStatusString;
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.primus.disconnectSocket();
        this.nav.setRoot(HomePage);
      })
      .catch(() => {});
  }
}
