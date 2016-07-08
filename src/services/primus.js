
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
      isOnline: new BehaviorSubject('offline'),
      onlineUsers: new BehaviorSubject([]),
      chatMessage: new BehaviorSubject([]),
      adventureLog: new BehaviorSubject(this.storage.adventureLog || []),
      statistics: new BehaviorSubject({}),
      achievements: new BehaviorSubject({}),
      player: new BehaviorSubject({})
    };

    this.contentUpdates = {
      isOnline: this._contentUpdates.isOnline.asObservable(),
      onlineUsers: this._contentUpdates.onlineUsers.asObservable(),
      chatMessage: this._contentUpdates.chatMessage.asObservable(),
      adventureLog: this._contentUpdates.adventureLog.asObservable(),
      statistics: this._contentUpdates.statistics.asObservable(),
      achievements: this._contentUpdates.achievements.asObservable(),
      player: this._contentUpdates.player.asObservable()
    };
  }

  initSocket() {
    if(this.socket) return;
    this.socket = Primus.connect(`${settings.protocol}://${settings.hostname}:${settings.port}`, {
      reconnect: {
        min: 250,
        retries: 100,
        factor: 1.5
      }
    });

    this.socket.on('error', e => console.error('Socket error', e));

    this.socket.on('close', () => {
      this._contentUpdates.isOnline.next('offline');
    });

    this.socket.on('reconnect scheduled', () => {
      this._contentUpdates.isOnline.next('connecting');
    });

    this.socket.on('open', () => {
      this._contentUpdates.isOnline.next('online');
      if(!this._reconnecting || !this._cachedOpts) return;
      setTimeout(() => {
        this.registerPlayer(this._cachedOpts, () => this._reconnecting = false, true);
      }, 1000);
    });

    this.socket.on('reconnected', () => {
      if(!this._cachedOpts || this._reconnecting) return;
      this._reconnecting = true;
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
      },
      updateMass: () => {
        const userList = this._contentUpdates.onlineUsers.getValue();
        _.each(data.data, player => {
          const playerRef = _.find(userList, { name: player.name });
          _.extend(playerRef, player);
        });
        this._contentUpdates.onlineUsers.next(userList);
      }
    };
    operations[data.playerListOperation]();
  }

  handleChatMessage(message) {
    message.timestamp = Date.now();
    const currentMessages = this._contentUpdates.chatMessage.getValue() || [];
    currentMessages.push(message);
    this._contentUpdates.chatMessage.next(currentMessages);
  }

  handleContentUpdate(content) {
    if(!content.update) return;
    this._contentUpdates[content.update].next(content.data);
  }

  handleNotification(object) {
    object.text = object.notify;
    this.pnotify.pnotify(object);
  }

  convertAdventureLogToChat(object) {
    const playerName = object.type === 'Global' ? '[Global]' : `[${object.targets.join(', ')}]`;
    const channel = 'Global Events';
    const route = 'chat:channel:Global Events';
    this.handleChatMessage({ text: object.text, playerName, channel, route });
  }

  handleAdventureLog(object) {
    this.convertAdventureLogToChat(object);
    if(object.type === 'Global' || !_.includes(object.targets, this._contentUpdates.player.getValue().name)) return;
    object.timestamp = Date.now();
    const adventureLog = this._contentUpdates.adventureLog.getValue();
    adventureLog.unshift(object);
    if(adventureLog.length > 50) adventureLog.length = 50;
    this.storage.adventureLog = adventureLog;
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

  changeGender(newGender) {
    const playerName = this._contentUpdates.player.getValue().name;
    this.emit('plugin:player:changegender', { playerName, gender: newGender });
  }

  changeTitle(newTitle) {
    const playerName = this._contentUpdates.player.getValue().name;
    this.emit('plugin:player:changetitle', { playerName, title: newTitle });
  }

  mute(muter, mutee) {
    this.emit('plugin:chat:togglemute', { playerName: muter, targetName: mutee });
  }

  makeChoice(id, response) {
    this.emit('plugin:player:makechoice', {
      playerName: this._contentUpdates.player.getValue().name,
      id,
      response
    });
  }
}