
import PrimusSocket from '../../primus.gen';

import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { LocalStorageService } from 'ng2-webstorage';

import { AppState, Auth, Logger } from './';

const settings = window.location.hostname === 'idle.land' ?
  { port: 80, protocol: 'http', hostname: 'game.idle.land' } :
  { port: 8080, protocol: 'http', hostname: window.location.hostname };

@Injectable()
export class Primus {

  private callbacks = {};
  private socket: any;

  private _reconnecting: boolean;

  constructor(
    private storage: LocalStorageService,
    private appState: AppState,
    private auth: Auth,
    private toastCtrl: ToastController
  ) {}

  _handleNotification({ message }): void {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    }).present();
  }

  _emit(event: string, data?: any, callback?: Function): void {
    this.callbacks[event] = callback;

    if(!data) data = {};

    const next = () => {
      data.token = this.storage.retrieve('idToken');
      this.socket.emit(event, data);
    };

    if(!this.auth.authenticated) {
      this.auth.renew().then(next);
      return;
    }

    next();
  }

  initSocket(): void {
    if(this.socket) return;

    this.socket = PrimusSocket.connect(`${settings.protocol}://${settings.hostname}:${settings.port}`, {
      reconnect: {
        min: 500,
        retries: 100,
        factor: 1.7
      }
    });

    this.socket.on('error', e => { Logger.error(e); });

    this.socket.on('close', () => {
      if(this.appState.onlineStatus.getValue() !== 'offline') {
        this.appState.onlineStatus.next('offline');
      }
    });

    this.socket.on('reconnect scheduled', () => {
      if(this.appState.onlineStatus.getValue() !== 'connecting') {
        this.appState.onlineStatus.next('connecting');
      }
    });

    this.socket.on('reconnected', () => {
      this._reconnecting = true;
    });

    this.socket.on('open', () => {
      if(this.appState.onlineStatus.getValue() !== 'online') {
        this.appState.onlineStatus.next('online');
      }

      this.checkIfExists()
        .then(exists => {
          if(!exists) {
            this.appState.hasCharacter.next(false);
            return;
          }

          this.appState.hasCharacter.next(true);
          this.login();
        })
        .catch((e) => {
          Logger.error(e);
        });
    });

    this.socket.on('data', data => {
      if(data.playerListOperation) return this.handleUserListUpdate(data);

      if(data.route && data.channel && data.text) return this.handleChatMessage(data, true);

      if(data.update) return this.handleContentUpdate(data);

      if(data.event === 'adventurelog') return this.handleAdventureLog(data);

      if(!data.event) {
        Logger.error(new Error('no event specified' + JSON.parse(data)));
        return;
      }

      if(data.notify) {
        this._handleNotification({ message: data.notify });
      }

      if(!this.callbacks[data.event]) return;
      this.callbacks[data.event](data);
      delete this.callbacks[data.event];
    });
  }

  handleUserListUpdate(data) {
    const operations = {
      add: () => {
        let userList = this.appState.chatUsers.getValue();
        if(_.find(userList, { name: data.data.name })) return;
        userList.push(data.data);
        userList = _.sortBy(userList, 'name');
        this.appState.chatUsers.next(userList);
      },
      del: () => {
        let userList = this.appState.chatUsers.getValue();
        userList = _.reject(userList, p => p.name === data.data);
        this.appState.chatUsers.next(userList);
      },
      set: () => {
        this.appState.chatUsers.next(data.data);
      },
      update: () => {
        const userList = this.appState.chatUsers.getValue();
        const player = _.find(userList, { name: data.data.name });
        _.extend(player, data.data);
        this.appState.chatUsers.next(userList);
      },
      updateMass: () => {
        const userList = this.appState.chatUsers.getValue();
        _.each(data.data, player => {
          const playerRef = _.find(userList, { name: player.name });
          _.extend(playerRef, player);
        });
        this.appState.chatUsers.next(userList);
      }
    };

    operations[data.playerListOperation]();
  }

  handleChatMessage(message, fromPrimus = false) {
    const player = this.appState.player.getValue();
    const playerName = player.nameEdit ? player.nameEdit : player.name;
    if(fromPrimus && message.playerName === playerName) return;
    if(!message.timestamp) message.timestamp = Date.now();
    this.appState.chatMessages.next(message);
  }

  handleContentUpdate(content) {
    if(!content.update || !this.appState[content.update]) return;
    this.appState[content.update].next(content.data);
  }

  handleAdventureLog(object) {
    if(object.type === 'Global' || !_.includes(object.targets, this.appState.player.getValue().name)) return;
    object.timestamp = Date.now();
    this.appState.adventureLog.next(object);

    const subscription = this.appState.adventureLog.subscribe(data => {
      this.storage.store('adventureLog', data);
    });

    subscription.unsubscribe();
  }

  disconnectSocket(): void {
    if(!this.socket) return;

    this._emit('plugin:player:logout');
  }

  requestNoKill(): void {
    this._emit('plugin:player:imregisteringrightnowdontkillme');
  }

  checkIfExists(): Promise<any> {
    return new Promise((resolve, reject) => {
      const profile = this.storage.retrieve('profile');
      if(!profile) return reject(new Error('No profile to check against'));

      this._emit('plugin:player:exists', { userId: profile.user_id }, data => {
        resolve(data.exists);
      });
    });
  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      const isLoggedIn = this.appState.loggedIn.getValue();
      if(isLoggedIn) return reject(new Error('Already logged in'));

      const profile = this.storage.retrieve('profile');
      if(!profile) return reject(new Error('No profile to login'));

      this.auth.renew()
        .then(() => {
          this._emit('plugin:player:login', { userId: profile.user_id }, res => {
            if(!res.ok) return;
            this.appState.loggedIn.next(true);
            resolve(res);
          });
        })
        .catch(reject);
    })
  }
}