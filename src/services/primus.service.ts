
import PrimusSocket from '../../primus.gen';

import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from 'ng2-webstorage';

import { AppState, Auth, Logger } from './';

import { AdventureLog, ChatMessage } from '../models';

export const settings = _.includes(window.location.hostname, 'idle.land') ?
  { port: 80, protocol: 'http', hostname: 'game.idle.land' } :
  { port: 8080, protocol: 'http', hostname: window.location.hostname };

@Injectable()
export class Primus {

  private callbacks = {};
  private socket: any;

  private _reconnecting: boolean;
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private storage: LocalStorageService,
    private appState: AppState,
    private auth: Auth,
    private toastCtrl: ToastController
  ) {
    this.loadAdventureLog();
    this.loadChatMessages();
    this.watchForLogins();
  }

  get theme() {
    return `theme-${this.storage.retrieve('theme')}`;
  }

  get playerName() {
    const player = this.appState.player.getValue();
    return player.nameEdit || player.name;
  }

  watchForLogins() {
    this.appState.loggedIn.subscribe(data => {
      if(!data) return;
      this.loggedIn$.next(true);
    });
  }

  loadAdventureLog() {
    const advLog = this.storage.retrieve('adventureLog') || [];
    _.each(advLog.reverse(), item => this.appState.adventureLog.next(item));
  }

  loadChatMessages() {
    const chatLog = this.storage.retrieve('chatLog') || [];
    _.each(chatLog, item => this.appState.chatMessages.next(item));
  }

  _handleNotification({ message }): void {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      showCloseButton: true
    }).present();
  }

  _emit(event: string, data?: any, callback?: Function): void {
    if(!this.socket) return;

    this.callbacks[event] = callback;

    if(!data) data = {};

    const next = () => {
      data.token = this.storage.retrieve('idToken');
      this.socket.emit(event, data);
    };

    if(!data.skipRenew && !this.auth.authenticated) {
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
        this.appState.loggedIn.next(false);
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
          return this.login();
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

  handleChatMessage(message: ChatMessage, fromPrimus = false) {
    const playerName = this.playerName;
    if(fromPrimus && message.playerName === playerName) return;
    if(!message.timestamp) message.timestamp = Date.now();
    this.appState.chatMessages.next(message);
  }

  sendChatMessage(messageObject: ChatMessage) {
    this._emit('plugin:chat:sendmessage', messageObject);

    messageObject.playerName = this.playerName;
    this.handleChatMessage(messageObject);
  }

  handleContentUpdate(content) {
    if(!content.update || !this.appState[content.update]) return;

    let value = content.data;
    if(content.update === 'achievements') {
      value = _.sortBy(_.values(value), 'name');
    }

    if(content.update === 'collectibles') {
      value = { orig: value, current: _.sortBy(_.values(value.current), 'name'), prior: value.prior };
    }

    if(content.update === 'petbasic') {
      value = _.sortBy(value, 'bought').reverse();
    }

    this.appState[content.update].next(value);
  }

  handleAdventureLog(object: AdventureLog) {
    if(!_.includes(object.targets, this.appState.player.getValue().name)) return;
    object.timestamp = Date.now();
    this.appState.adventureLog.next(object);
  }

  disconnectSocket(): void {
    if(!this.socket) return;

    this._emit('plugin:player:logout', { skipRenew: true });
    this.socket = null;
  }

  requestNoKill(): void {
    this._emit('plugin:player:imregisteringrightnowdontkillme');
  }

  requestEquipment(): void {
    this.loggedIn$.subscribe(() => {
      this._emit('plugin:player:request:equipment');
    });
  }

  requestAchievements(): void {
    this.loggedIn$.subscribe(() => {
      this._emit('plugin:player:request:achievements');
    });
  }

  requestCollectibles(): void {
    this.loggedIn$.subscribe(() => {
      this._emit('plugin:player:request:collectibles');
    });
  }

  requestStatistics(): void {
    this.loggedIn$.subscribe(() => {
      this._emit('plugin:player:request:statistics');
    });
  }

  requestPets(): void {
    this.loggedIn$.subscribe(() => {
      this._emit('plugin:player:request:pets');
    });
  }

  requestPersonalities(): void {
    this.loggedIn$.subscribe(() => {
      this._emit('plugin:player:request:personalities');
    });
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

      return this.auth.renew()
        .then(() => {
          this._emit('plugin:player:login', { userId: profile.user_id }, res => {
            if(!res.ok) return;
            this.appState.loggedIn.next(true);
            resolve(res);
          });
        })
        .catch(e => {
          if(e.error === 'too_many_requests') {
            this._handleNotification({ message: 'Too many login requests - take a break and refresh in a bit.' });
            return;
          }
          reject(e);
        });
    })
  }

  makeChoice(id, response) {
    this._emit('plugin:player:makechoice', {
      id,
      response
    });
  }

  buyPet(petType, petName) {
    if(!petName || !petName.trim()) {
      this._handleNotification({ message: 'Invalid pet name! '});
      return;
    }

    if(petName.length > 20) {
      this._handleNotification({ message: 'Your pet name is too long! '});
      return;
    }

    this._emit('plugin:pet:buy', { petType, petName });
  }

  makePetActive(petType) {
    this._emit('plugin:pet:swap', { petType });
  }

  changePetClass(newProfession) {
    this._emit('plugin:pet:profession', { newProfession });
  }

  changePetAttr(newAttr) {
    this._emit('plugin:pet:attr', { newAttr });
  }

  takePetGold() {
    this._emit('plugin:pet:takegold');
  }

  feedPetGold(gold, maxGold) {
    if(gold < 0 || _.isNaN(gold)) {
      this._handleNotification({ message: 'Invalid gold value! '});
      return;
    }

    if(gold > maxGold) {
      this._handleNotification({ message: 'Cannot overfeed gold! '});
      return;
    }

    this._emit('plugin:pet:feed', { gold });
  }

  upgradePetAttr(upgradeAttr) {
    this._emit('plugin:pet:upgrade', { upgradeAttr });
  }

  togglePersonality(personality) {
    this._emit('plugin:player:togglepersonality', { personality });
  }

  changeGender(gender) {
    this._emit('plugin:player:changegender', { gender });
  }

  changeTitle(title) {
    this._emit('plugin:player:changetitle', { title });
  }

  buyIlp(ilpBuy) {
    this._emit('plugin:premium:buyilp', { ilpBuy });
  }

  buyIlpItem(itemName) {
    this._emit('plugin:premium:buyilpitem', { itemName });
  }
}