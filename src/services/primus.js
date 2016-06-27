
import _ from 'lodash';

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
    this.hasRealUser = new BehaviorSubject(false);
    this.storage = storage.local;
    this.pnotify = pnotify;
    this.initSocket();
    this.outstandingCallbacks = {};

    this._contentUpdates = {
      onlineUsers: new BehaviorSubject([]),
      chatMessage: new BehaviorSubject({}),
      adventureLog: new BehaviorSubject([]),
      player: new BehaviorSubject({})
    };

    this.contentUpdates = {
      onlineUsers: this._contentUpdates.onlineUsers.asObservable(),
      chatMessage: this._contentUpdates.chatMessage.asObservable(),
      adventureLog: this._contentUpdates.adventureLog.asObservable(),
      player: this._contentUpdates.player.asObservable()
    };
  }

  initSocket() {
    if(this.socket) return;
    this.socket = Primus.connect(`${settings.protocol}://${settings.hostname}:${settings.port}`);

    this.socket.on('error', e => console.error('Socket error', e));

    this.socket.on('close', () => {
      // no connection
    });

    this.socket.on('reconnect scheduled', () => {}); // connecting

    this.socket.on('open', () => {
      if(!this._reconnecting || !this._cachedOpts) return;
      this.registerPlayer(this._cachedOpts, () => this._reconnecting = false, true);
      // connection
    });

    this.socket.on('reconnected', () => {
      if(!this._cachedOpts || this._reconnecting) return;
      this._reconnecting = true;
      this.socket.end();
      this.socket = null;
      this.initSocket();
    });

    this.socket.on('data', data => {

      if(data.playerListOperation) return this.handleUserListUpdate(data);

      // chat messages are handled differently
      if(data.route && data.channel && data.text) return this.handleChatMessage(data);

      // data updates are handled differently
      if(data.update) return this.handleContentUpdate(data);

      // adventure log is handled differently
      if(data.event === 'adventurelog') return this.handleAdventureLog(data);

      // no event means something is probably wrong
      if(!data.event) console.error('No event specified', data);

      // pnotify notifications
      if(data.notify) this.handleNotification(data);

      // generic event ping-pong
      if(!this.outstandingCallbacks[data.event]) return;
      this.outstandingCallbacks[data.event](data);
      this.outstandingCallbacks[data.event] = null;
    });
  }

  handleUserListUpdate(data) {
    const operations = {
      add: () => {
        let userList = this._contentUpdates.onlineUsers.getValue();
        userList.push(data.data);
        userList = _.sortBy(userList, 'name');
        this._contentUpdates.onlineUsers.next(userList);
      },
      del: () => {
        let userList = this._contentUpdates.onlineUsers.getValue();
        userList = _.reject(userList, p => p.name === data.data);
        this._contentUpdates.onlineUsers.next(userList);
      },
      set: () => {
        this._contentUpdates.onlineUsers.next(data.data);
      },
      update: () => {
        const userList = this._contentUpdates.onlineUsers.getValue();
        const player = _.find(userList, { name: data.data.name });
        _.extend(player, data.data);
        this._contentUpdates.onlineUsers.next(userList);
      }
    };
    operations[data.playerListOperation]();
  }

  handleChatMessage(message) {
    message.timestamp = Date.now();
    this._contentUpdates.chatMessage.next(message);
  }

  handleContentUpdate(content) {
    if(!content.update) return;
    this._contentUpdates[content.update].next(content.data);
  }

  handleNotification(object) {
    object.text = object.notify;
    this.pnotify.pnotify(object);
  }

  handleAdventureLog(object) {
    object.timestamp = Date.now();
    const adventureLog = this._contentUpdates.adventureLog.getValue();
    adventureLog.unshift(object);
    if(adventureLog.length > 100) adventureLog.length = 100;
    this._contentUpdates.adventureLog.next(adventureLog);
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
    this.emit('plugin:player:logout', {});
  }

  registerPlayer(opts, doNext = () => {}, force = false) {
    if(!force && this.hasRealUser.getValue() && this._cachedOpts) return;
    this.emit('plugin:player:login', opts, res => {
      if(!res.ok) return;
      doNext(res);
      this._cachedOpts = opts;
      this.hasRealUser.next(true);
    });
  }
}