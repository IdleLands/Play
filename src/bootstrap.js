
import 'reflect-metadata';
import 'zone.js/dist/zone';

// require the favicons
require.context('../favicon', true, /^\.\//);

import 'bootstrap/dist/css/bootstrap.css';
import { HTTP_PROVIDERS } from '@angular/http';
import { provide, PLATFORM_DIRECTIVES, enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { SweetAlertService } from 'ng2-sweetalert2';
import { GameIconsDirective } from 'ng2-gameicons';
import { FontAwesomeDirective } from 'ng2-fontawesome';
import { StatComponent } from './directives/stat';

import { MessageNotifier } from './services/messagenotifier';
import { PrimusWrapper } from './services/primus';
import { PNotifyService, PNotifySettings } from 'ng2-pnotify';
import { Auth, AuthGuard } from './services/auth';
import { App } from './components/app.component';

import { StorageSettings, StorageService } from 'ng2-storage';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/components/tooltip';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { APP_ROUTER_PROVIDERS } from './components/app.routes';

if(window.location.hostname !== 'localhost') enableProdMode();

if(window.Proxy) {
  bootstrap(App, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    PrimusWrapper,
    SweetAlertService,
    StorageService,
    PNotifyService,
    MessageNotifier,
    AuthGuard,
    Auth,
    provide(StorageSettings, { useValue: { prefix: 'idp' } }),
    provide(PNotifySettings, { useValue: { styling: 'fontawesome' } }),
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    provide(PLATFORM_DIRECTIVES, { useValue: TOOLTIP_DIRECTIVES, multi: true }),
    provide(PLATFORM_DIRECTIVES, { useValue: FontAwesomeDirective, multi: true }),
    provide(PLATFORM_DIRECTIVES, { useValue: GameIconsDirective, multi: true }),
    provide(PLATFORM_DIRECTIVES, { useValue: StatComponent, multi: true })
  ]);

  const badBrowser = document.getElementById('badbrowser');
  badBrowser.parentNode.removeChild(badBrowser);
}