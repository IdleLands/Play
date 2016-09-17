
import _ from 'lodash';

import Favico from 'favico.js';

import { PrimusWrapper } from './primus';
import { PNotifyService } from 'ng2-pnotify';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService } from 'ng2-storage';

export class MessageNotifier {

  static get parameters() {
    return [[PrimusWrapper], [PNotifyService], [StorageService]];
  }

  constructor(primus, pnotify, storage) {
    this.primus = primus;
    this.pnotify = pnotify;
    this.storage = storage.local;

    this._blockMessages = false;
    this._messagesAvailable = new BehaviorSubject(0);
    this.messagesAvailable = this._messagesAvailable.asObservable();
    this.primus.contentUpdates.chatMessage.subscribe(data => this.possiblyDisplayMessages(data));
    this.favicon = new Favico({ animation: 'none' });

    this._currentMessages = 0;
  }

  clearIndicators() {
    this._messagesAvailable.next(0);
    if(this.favicon) {
      this.favicon.badge(0);
    }
  }

  possiblyDisplayMessages(messageData) {

    if(!messageData || messageData.length === 0) return;
    if(this.storage.noFaviconNotifications) {
      this.clearIndicators();
      return;
    }

    const currentMessages = _(messageData)
      .reject(msg => msg.channel === 'Global Events')
      .size();

    if(!this._blockMessages) {
      this._messagesAvailable.next(currentMessages);
    } else {
      this.clearIndicators();
    }

    if(this.favicon && !this._blockMessages || document.hidden) {
      this.favicon.badge(++this._currentMessages);
    }
  }
}