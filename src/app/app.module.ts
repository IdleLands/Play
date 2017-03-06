import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';

import { MomentModule } from 'angular2-moment';
import { Ng2Webstorage } from 'ng2-webstorage';
import { RoundProgressModule } from 'angular-svg-round-progressbar/dist/index';

import { AppState, Auth, Primus, ItemCompare, ItemCompareModal, Theme } from '../services';

import { RedditNewsComponent } from '../components/reddit-news.component';
import { GameIconComponent } from '../components/gameicon.component';
import { AdventureLogIconComponent } from '../components/advlogicon.component';
import { StatComponent } from '../components/stat.component';
import { PetCardComponent } from '../components/petcard.component';
import { PlayerCardComponent } from '../components/playercard.component';
import { ItemComponent, ItemPopover } from '../components/item.component';
import { AchievementIconComponent } from '../components/achievementicon.component';
import { GendervatarComponent } from '../components/gendervatar.component';
import { AscensionLevelComponent } from '../components/ascensionlevel.component';

import { PlayComponent } from '../components/play.component';

import { MapRendererComponent } from '../pages/map/map-renderer.component';
import { StatisticsTreeComponent } from '../pages/statistics/statistics-tree.component';
import { ChatWindowComponent, CurrentChannelPipe, LinkifyPipe } from '../pages/chat/chatwindow.component';

(<any>window).PIXI = require('pixi.js');
(<any>window).p2 = require('p2.js');
(<any>window).Phaser = require('phaserlib');

import { MyApp } from './app.component';
import {
  HomePage,
  ConnectPage,
  CreatePage,
  PrivacyPage,
  OverviewPage,
  EquipmentPage,
  AchievementsPage, AchievementModal,
  CollectiblesPage,
  StatisticsPage,
  ChatPage,
  MapPage, PersonalityPopover,
  PetsPage, PetsOverviewPage, PetsItemsPage,
  PremiumPage,
  SettingsPage,
  BattlePage
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
    { component: PetsOverviewPage,  name: 'Pet Overview',       segment: '' },
    { component: PetsItemsPage,     name: 'Pet Items',          segment: '' },
    { component: PremiumPage,       name: 'Premium',            segment: 'premium' },
    { component: SettingsPage,      name: 'Settings',           segment: 'settings' },
    { component: BattlePage,        name: 'Battle',             segment: 'overview' }
    // { component: BattlePage,        name: 'Battle',             segment: 'battle/:battleName' }
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
    ChatPage, ChatWindowComponent,
    MapPage, PersonalityPopover,
    PetsPage, PetsOverviewPage, PetsItemsPage,
    PremiumPage,
    SettingsPage,
    BattlePage,

    PlayComponent,

    RedditNewsComponent,
    GameIconComponent,
    AdventureLogIconComponent,
    StatComponent,
    PlayerCardComponent,
    PetCardComponent,
    ItemComponent, ItemPopover,
    AchievementIconComponent,
    GendervatarComponent,
    AscensionLevelComponent,

    MapRendererComponent,
    StatisticsTreeComponent,

    AchievementModal,
    ItemCompareModal,

    CurrentChannelPipe,
    LinkifyPipe
  ],
  imports: [
    MomentModule,
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
    MapPage, PersonalityPopover,
    PetsPage, PetsOverviewPage, PetsItemsPage,
    PremiumPage,
    SettingsPage,
    BattlePage,

    ItemPopover,

    AchievementModal,
    ItemCompareModal
  ],
  providers: [
    AppState,
    Auth,
    Primus,
    ItemCompare,
    Theme,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
