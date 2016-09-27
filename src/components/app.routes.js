import { provideRouter } from '@angular/router';

import { HomeComponent }  from './home/home.component';
import { PlayComponent } from './play/play.component';
import { PrivacyPolicyComponent } from './privacypolicy/privacypolicy.component';

import { routes as playRoutes } from './play/play.routes';

export const routes = [
  { path: '',     component: HomeComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  { path: 'play', component: PlayComponent, children: [
    ...playRoutes,
    { path: '', component: PlayComponent, redirectTo: 'create' }
  ] }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];