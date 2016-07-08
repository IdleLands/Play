
import _ from 'lodash';
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { PrimusWrapper } from '../../../services/primus';
import { MessageNotifier } from '../../../services/messagenotifier';
import template from './playbar.html';

@Component({
  selector: 'playbar',
  providers: [Auth],
  directives: [ROUTER_DIRECTIVES],
  inputs: ['hideTabs'],
  template
})
export class PlayBarComponent {
  static get parameters() {
    return [[Router], [Auth], [PrimusWrapper], [MessageNotifier]];
  }

  constructor(router, auth, primus, notifier) {
    this.router = router;
    this.auth = auth;
    this.primus = primus;
    this.notifier = notifier;
  }

  ngOnInit() {
    this.onlineSubscription = this.primus.contentUpdates.isOnline.subscribe(data => this.changeOnlineStatus(data));
    this.messageSubscription = this.notifier.messagesAvailable.subscribe(data => this.unreadMessages = data);
  }

  ngOnDestroy() {
    this.onlineSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
  }

  changeOnlineStatus(state) {
    const stateData = {
      online:     { icon: 'heart',      text: 'Online' },
      connecting: { icon: 'heartbeat',  text: 'Connecting' },
      offline:    { icon: 'heart-o',    text: 'Offline' }
    };
    this.onlineStatus = stateData[state];
  }

  logout() {
    this.auth.logout();
  }

  hasActiveRoute(fragment) {
    return _.includes(this.router.url, fragment);
  }
}