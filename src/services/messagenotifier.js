
import _ from 'lodash';

import Favico from 'favico.js';

import { PrimusWrapper } from './primus';
import { PNotifyService } from 'ng2-pnotify';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class MessageNotifier {

  static get parameters() {
    return [[PrimusWrapper], [PNotifyService]];
  }

  constructor(primus, pnotify) {
    this.primus = primus;
    this.pnotify = pnotify;
    this._blockMessages = false;
    this._messagesAvailable = new BehaviorSubject(0);
    this.messagesAvailable = this._messagesAvailable.asObservable();
    this.primus.contentUpdates.chatMessage.subscribe(data => this.possiblyDisplayMessages(data));
    this.favicon = new Favico({ animation: 'none' });
  }

  clearIndicators() {
    this._messagesAvailable.next(0);
    this.favicon.badge(0);
  }

  possiblyDisplayMessages(messageData) {

    if(!messageData || messageData.length === 0) return;

    const currentMessages = _(messageData)
      .reject(msg => msg.channel === 'Global Events')
      .size();

    if(!this._blockMessages) {
      this._messagesAvailable.next(currentMessages);
    }
    if(!this._blockMessages || document.hidden) {
      this.favicon.badge(currentMessages);
    }
  }
}