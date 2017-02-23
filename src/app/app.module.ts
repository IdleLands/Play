import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AppState, Auth } from '../services';

import { MyApp } from './app.component';
import { HomePage, ConnectPage, CreatePage, PrivacyPage } from '../pages';

const deepLinks: DeepLinkConfig = {
  links: [
    { component: HomePage, name: 'Home Page', segment: '' },
    { component: PrivacyPage, name: 'Privacy Policy', segment: 'privacy' },
    { component: ConnectPage, name: 'Connecting...', segment: 'connect' },
    { component: CreatePage, name: 'Create Character', segment: 'create' }
  ]
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnectPage,
    CreatePage,
    PrivacyPage
  ],
  imports: [
    Ng2Webstorage.forRoot({ prefix: 'idp', separator: '-' }),
    IonicModule.forRoot(MyApp, { locationStrategy: 'hash' }, deepLinks)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnectPage,
    CreatePage,
    PrivacyPage
  ],
  providers: [
    AppState,
    Auth,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
