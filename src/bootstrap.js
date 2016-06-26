
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'bootstrap/dist/css/bootstrap.css';
import { HTTP_PROVIDERS } from '@angular/http';
import { provide, PLATFORM_DIRECTIVES, enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { FontAwesomeDirective } from 'ng2-fontawesome';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import { PrimusWrapper } from './services/primus';
import { PNotifyService, PNotifySettings } from 'ng2-pnotify';
import { AuthGuard } from './services/auth';
import { App } from './components/app.component';
import { StorageSettings, StorageService } from 'ng2-storage';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/components/tooltip';

import { APP_ROUTER_PROVIDERS } from './components/app.routes';

if(window.location.hostname !== 'localhost') enableProdMode();

bootstrap(App, [
  FIREBASE_PROVIDERS,
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  PrimusWrapper,
  StorageService,
  PNotifyService,
  AuthGuard,
  provide(StorageSettings, { useValue: { prefix: 'idp' } }),
  provide(PNotifySettings, { useValue: { styling: 'fontawesome' } }),
  provide(PLATFORM_DIRECTIVES, { useValue: TOOLTIP_DIRECTIVES, multi: true }),
  provide(PLATFORM_DIRECTIVES, { useValue: FontAwesomeDirective, multi: true }),
  defaultFirebase({ databaseURL: 'https://idlelandschat.firebaseio.com' })
]);