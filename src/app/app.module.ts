import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';

import { Ng2Webstorage } from 'ng2-webstorage';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { AppState, Auth, Primus } from '../services';

import { RedditNewsComponent } from '../components/reddit-news.component';
import { GameIconComponent } from '../components/gameicon.component';
import { StatComponent } from '../components/stat.component';
import { PlayerCardComponent } from '../components/playercard.component';

import { MyApp } from './app.component';
import {
  HomePage,
  ConnectPage,
  CreatePage,
  PrivacyPage,
  OverviewPage
} from '../pages';

const deepLinks: DeepLinkConfig = {
  links: [
    { component: HomePage,          name: 'Home Page',          segment: '' },
    { component: PrivacyPage,       name: 'Privacy Policy',     segment: 'privacy' },
    { component: ConnectPage,       name: 'Connecting...',      segment: 'connect' },
    { component: CreatePage,        name: 'Create Character',   segment: 'create' },
    { component: OverviewPage,      name: 'Overview',           segment: 'overview' }
  ]
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnectPage,
    CreatePage,
    PrivacyPage,
    OverviewPage,

    RedditNewsComponent,
    GameIconComponent,
    StatComponent,
    PlayerCardComponent
  ],
  imports: [
    RoundProgressModule,
    Ng2Webstorage.forRoot({ prefix: 'idp', separator: '-' }),
    IonicModule.forRoot(MyApp, { locationStrategy: 'hash' }, deepLinks)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnectPage,
    CreatePage,
    PrivacyPage,
    OverviewPage
  ],
  providers: [
    AppState,
    Auth,
    Primus,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
