import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicPageModule, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MomentModule } from 'angular2-moment';
import { Ng2Webstorage } from 'ng2-webstorage';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { AppState, Auth, Primus, ItemCompare, Theme } from '../services';

import { PlayComponent } from '../components/play.component';

import { GlobalComponentsModule } from '../components/components.module';

import { ItemPopover } from '../components/item.component';
import { PetCardComponent } from '../components/petcard.component';
import { PlayerCardComponent } from '../components/playercard.component';

(<any>window).PIXI = require('pixi.js');
(<any>window).p2 = require('p2.js');
(<any>window).Phaser = require('phaserlib');
(<any>window).PhaserGlobal = { hideBanner: true };

import { MyApp } from './app.component';

import { PetsItemsPage } from '../pages/pets/pets-items';
import { PetsOverviewPage } from '../pages/pets/pets-overview';

import { GuildBuildingsPage } from '../pages/guild/guild-buildings';
import { GuildManagePage } from '../pages/guild/guild-manage';
import { GuildMembersPage } from '../pages/guild/guild-members';
import { GuildOverviewPage } from '../pages/guild/guild-overview';

@NgModule({
  declarations: [
    MyApp,

    PlayComponent,
    PetCardComponent,
    PlayerCardComponent,

    PetsItemsPage,
    PetsOverviewPage,

    GuildBuildingsPage,
    GuildManagePage,
    GuildMembersPage,
    GuildOverviewPage,

    ItemPopover
  ],
  imports: [
    IonicModule.forRoot(MyApp, { locationStrategy: 'hash' }),
    MomentModule,
    RoundProgressModule,
    Ng2Webstorage.forRoot({ prefix: 'idp', separator: '-' }),
    IonicPageModule.forChild(MyApp),
    GlobalComponentsModule,
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    PetsItemsPage,
    PetsOverviewPage,

    GuildBuildingsPage,
    GuildManagePage,
    GuildMembersPage,
    GuildOverviewPage,

    ItemPopover
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
