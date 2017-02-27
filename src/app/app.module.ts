import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';

import { Ng2Webstorage } from 'ng2-webstorage';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { AppState, Auth, Primus, ItemCompare, ItemCompareModal } from '../services';

import { RedditNewsComponent } from '../components/reddit-news.component';
import { GameIconComponent } from '../components/gameicon.component';
import { AdventureLogIconComponent } from '../components/advlogicon.component';
import { StatComponent } from '../components/stat.component';
import { PlayerCardComponent } from '../components/playercard.component';
import { ItemComponent } from '../components/item.component';

import { MyApp } from './app.component';
import {
  HomePage,
  ConnectPage,
  CreatePage,
  PrivacyPage,
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

const deepLinks: DeepLinkConfig = {
  links: [
    { component: HomePage,          name: 'Home Page',          segment: '' },
    { component: PrivacyPage,       name: 'Privacy Policy',     segment: 'privacy' },
    { component: ConnectPage,       name: 'Connecting...',      segment: 'connect' },
    { component: CreatePage,        name: 'Create Character',   segment: 'create' },
    { component: OverviewPage,      name: 'Overview',           segment: 'overview' },
    { component: EquipmentPage,     name: 'Equipment',          segment: 'equipment' },
    { component: AchievementsPage,  name: 'Achievements',       segment: 'achievements' },
    { component: CollectiblesPage,  name: 'Collectibles',       segment: 'collectibles' },
    { component: StatisticsPage,    name: 'Statistics',         segment: 'statistics' },
    { component: ChatPage,          name: 'Chat',               segment: 'chat' },
    { component: MapPage,           name: 'Map',                segment: 'map' },
    { component: PetsPage,          name: 'Pets',               segment: 'pets' },
    { component: PremiumPage,       name: 'Premium',            segment: 'premium' },
    { component: SettingsPage,      name: 'Settings',           segment: 'settings' }
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
    EquipmentPage,
    AchievementsPage,
    CollectiblesPage,
    StatisticsPage,
    ChatPage,
    MapPage,
    PetsPage,
    PremiumPage,
    SettingsPage,

    RedditNewsComponent,
    GameIconComponent,
    AdventureLogIconComponent,
    StatComponent,
    PlayerCardComponent,
    ItemComponent,

    ItemCompareModal
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
    OverviewPage,
    EquipmentPage,
    AchievementsPage,
    CollectiblesPage,
    StatisticsPage,
    ChatPage,
    MapPage,
    PetsPage,
    PremiumPage,
    SettingsPage,

    ItemCompareModal
  ],
  providers: [
    AppState,
    Auth,
    Primus,
    ItemCompare,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
