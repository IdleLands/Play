
import { EventEmitter } from '@angular/core';
import Primus from '../../primus.gen';
import { StorageService } from 'ng2-storage';
import { PNotifyService } from 'ng2-pnotify';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const settings = window.location.hostname !== 'localhost' ?
  { port: 80,   protocol: 'http', hostname: 'game.idle.land' } :
  { port: 8080, protocol: 'http', hostname: 'localhost' };

export class PrimusWrapper {

  static get parameters() {
    return [[StorageService], [PNotifyService]];
  }

  constructor(storage, pnotify) {
    this.hasRealUser = new EventEmitter();
    this.storage = storage.local;
    this.pnotify = pnotify;
    this.initSocket();
    this.outstandingCallbacks = {};

    this._adventureLog = [];

    this._contentUpdates = {
      adventureLog: new BehaviorSubject([]),
      player: new BehaviorSubject({})
    };

    this.contentUpdates = {
      adventureLog: this._contentUpdates.adventureLog.asObservable(),
      player: this._contentUpdates.player.asObservable()
    };
  }

  handleContentUpdate(content) {
    if(!content.update) return;
    this._contentUpdates[content.update].next(content.data);
  }

  initSocket() {
    if(this.socket) return;
    this.socket = Primus.connect(`${settings.protocol}://${settings.hostname}:${settings.port}`);

    this.socket.on('reconnect', () => {
      if(!this._cachedOpts || this._reconnecting) return;
      this._reconnecting = true;
      this.registerPlayer(this._cachedOpts, () => this._reconnecting = false);
    });

    this.socket.on('data', data => {
      if(data.update) return this.handleContentUpdate(data);
      if(data.event === 'adventurelog') return this.handleMessage(data);
      if(!data.event) console.error('No event specified', data);
      if(data.notify) this.handleNotification(data);
      if(!this.outstandingCallbacks[data.event]) return;
      this.outstandingCallbacks[data.event](data);
      this.outstandingCallbacks[data.event] = null;
    });
  }

  handleNotification(object) {
    object.text = object.notify;
    this.pnotify.pnotify(object);
  }

  handleMessage(object) {
    object.timestamp = Date.now();
    this._adventureLog.unshift(object);
    if(this._adventureLog.length > 100) this._adventureLog.length = 100;
    this._contentUpdates.adventureLog.next(this._adventureLog);
  }

  emit(event, data, callback) {
    this.outstandingCallbacks[event] = callback;
    this.socket.emit(event, data);
  }

  checkIfExists() {
    if(!this.storage.profile) {
      return this.hasRealUser.next(false);
    }

    this.emit('plugin:player:exists', { userId: this.storage.profile.user_id }, data => {
      this.doesUserExistForThisId = data.exists;
      this.hasRealUser.next(data.exists);
    });
  }

  disconnect() {
    if(!this.socket) return;
    this.socket.emit('plugin:player:logout', {});
  }

  registerPlayer(opts, doNext = () => {}) {
    this.emit('plugin:player:login', opts, res => {
      if(!res.ok) return;
      doNext();
      this._cachedOpts = opts;
    });
  }
}