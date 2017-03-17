
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

  private chatLog: ChatMessage[] = [];
  private advLog: AdventureLog[] = [];

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

  saveAdventureLog() {
    if(this.advLog.length > 50) {
      this.advLog.length = 50;
    }
    this.storage.store('adventureLog', this.advLog);
  }

  saveChatLog() {
    const overLength = this.chatLog.length - 200;
    const overMessages = this.chatLog.slice(0, overLength);
    const removeMessages = _.filter(overMessages, msg => {
      return msg.hidden || !_.includes(msg.route, ':pm:');
    });

    this.chatLog = _.difference(this.chatLog, removeMessages);
    this.storage.store('chatLog', this.chatLog);
  }

  loadAdventureLog() {
    const advLog = this.storage.retrieve('adventureLog') || [];
    _.each(advLog.reverse(), item => {
      this.appState.adventureLog.next(item);
      this.advLog.unshift(item);
    });
  }

  loadChatMessages() {
    const chatLog = this.storage.retrieve('chatLog') || [];
    this.appState._chatLength.next(chatLog.length);
    _.each(chatLog, item => {
      this.appState.chatMessages.next(item);
      this.chatLog.push(item);
    });
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

    (<any>window).socket = this.socket;

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
        let userList = this.appState.chatUsers.getValue();
        const player = _.find(userList, { name: data.data.name });
        if(player) {
          _.extend(player, data.data);
        } else {
          userList.push(data.data);
          userList = _.sortBy(userList, 'name');
        }
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

    this.chatLog.push(message);
    this.saveChatLog();
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

    this.advLog.unshift(object);
    this.saveAdventureLog();
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

  requestParty(): void {
    this.loggedIn$.subscribe(() => {
      this._emit('plugin:player:request:party');
    });
  }

  requestBossTimers(): void {
    this.loggedIn$.subscribe(() => {
      this._emit('plugin:player:request:bosstimers');
    })
  }

  loadBattle(battleName): void {
    this._emit('plugin:combat:retrieve', { battleName });
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

  login(registerArgs: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const isLoggedIn = this.appState.loggedIn.getValue();
      if(isLoggedIn) return reject(new Error('Already logged in'));

      const profile = this.storage.retrieve('profile');
      if(!profile) return reject(new Error('No profile to login'));

      return this.auth.renew()
        .then(() => {
          registerArgs.userId = profile.user_id;
          this._emit('plugin:player:login', registerArgs, res => {
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

  register(args) {
    return this.login(args);
  }

  // PLAYER
  makeChoice(id, response) {
    this._emit('plugin:player:makechoice', {
      id,
      response
    });
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

  leaveParty() {
    this._emit('plugin:player:partyleave');
  }

  ascend() {
    this._emit('plugin:player:ascend');
  }

  // PREMIUM
  buyIlp(ilpBuy) {
    this._emit('plugin:premium:buyilp', { ilpBuy });
  }

  buyIlpItem(itemName) {
    this._emit('plugin:premium:buyilpitem', { itemName });
  }

  // PET
  sellItemFromPet(itemId) {
    this._emit('plugin:pet:sell', { itemId });
  }

  sellAllItemsFromPet() {
    this._emit('plugin:pet:sellall');
  }

  equipItemOnPet(itemId) {
    this._emit('plugin:pet:equip', { itemId });
  }

  unequipItemFromPet(itemId) {
    this._emit('plugin:pet:unequip', { itemId });
  }

  giveItemToPet(itemId) {
    this._emit('plugin:pet:giveitem', { itemId });
  }

  giveItemToPlayer(itemId) {
    this._emit('plugin:pet:takeitem', { itemId });
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

  feedMax() {
    this._emit('plugin:pet:feedmax');
  }

  upgradePetAttr(upgradeAttr) {
    this._emit('plugin:pet:upgrade', { upgradeAttr });
  }

  togglePetSmart(setting) {
    this._emit('plugin:pet:smart', { setting });
  }

  renamePet(petId, newName) {
    this._emit('plugin:pet:rename', { petId, newName });
  }

  giveItemToOtherPet(itemId, petId) {
    this._emit('plugin:pet:pass', { itemId, petId });
  }

  // GM
  mute(targetName) {
    this._emit('plugin:chat:togglemute', { targetName });
  }

  ban(targetName) {
    this._emit('plugin:chat:toggleban', { targetName });
  }

  pardon(targetName) {
    this._emit('plugin:chat:togglepardon', { targetName });
  }

  toggleModerator(targetName) {
    this._emit('plugin:gm:togglemod', { targetName });
  }

  rename(targetName, newName) {
    this._emit('plugin:player:changename', { targetName, newName });
  }

  relevel(targetName, targetLevel) {
    this._emit('plugin:gm:setlevel', { targetName, targetLevel });
  }

  restat(targetName, targetStat, targetValue) {
    this._emit('plugin:gm:setstat', { targetName, targetStat, targetValue });
  }

  giveItem(targetName, targetItemString) {
    this._emit('plugin:gm:giveitem', { targetName, targetItemString });
  }

  giveGold(targetName, bonusGold) {
    this._emit('plugin:gm:givegold', { targetName, bonusGold });
  }

  giveILP(targetName, bonusIlp) {
    this._emit('plugin:gm:giveilp', { targetName, bonusIlp });
  }

  teleport(targetName, teleData) {
    this._emit('plugin:gm:teleport', { targetName, teleData });
  }

  toggleAchievement(targetName, achievement) {
    this._emit('plugin:gm:toggleachievement', { targetName, achievement });
  }

  event(targetName, targetEvent) {
    this._emit('plugin:gm:giveevent', { targetName, targetEvent });
  }

  createFestival(targetFestivalString) {
    this._emit('plugin:festival:create', { targetFestivalString });
  }

  cancelFestival(festivalId) {
    this._emit('plugin:festival:cancel', { festivalId });
  }
}