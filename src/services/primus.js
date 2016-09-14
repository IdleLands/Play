
import _ from 'lodash';

import Primus from '../../primus.gen';
import { StorageService } from 'ng2-storage';
import { PNotifyService } from 'ng2-pnotify';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const settings = window.location.hostname === 'idle.land' ?
  { port: 80,   protocol: 'http', hostname: 'game.idle.land', cdn: 'd24x6kjuc2wq9m.cloudfront.net' } :
  { port: 8080, protocol: 'http', hostname: window.location.hostname };

export class PrimusWrapper {

  static get parameters() {
    return [[StorageService], [PNotifyService]];
  }

  constructor(storage, pnotify) {
    this.hasRealUser = new BehaviorSubject(false);
    this.storage = storage.local;
    this.pnotify = pnotify;
    this.outstandingCallbacks = {};

    this._contentUpdates = {
      isOnline: new BehaviorSubject('offline'),
      onlineUsers: new BehaviorSubject([]),
      chatMessage: new BehaviorSubject([]),
      adventureLog: new BehaviorSubject(this.storage.adventureLog || []),
      statistics: new BehaviorSubject({}),
      achievements: new BehaviorSubject({}),
      collectibles: new BehaviorSubject({}),
      equipment: new BehaviorSubject({}),
      personalities: new BehaviorSubject({ earned: [], active: {} }),
      player: new BehaviorSubject({}),
      party: new BehaviorSubject({}),
      gmdata: new BehaviorSubject({}),
      battle: new BehaviorSubject({}),
      petbasic: new BehaviorSubject([]),
      petbuy: new BehaviorSubject({}),
      petactive: new BehaviorSubject({})
    };

    this.contentUpdates = {
      isOnline: this._contentUpdates.isOnline.asObservable(),
      onlineUsers: this._contentUpdates.onlineUsers.asObservable(),
      chatMessage: this._contentUpdates.chatMessage.asObservable(),
      adventureLog: this._contentUpdates.adventureLog.asObservable(),
      statistics: this._contentUpdates.statistics.asObservable(),
      achievements: this._contentUpdates.achievements.asObservable(),
      personalities: this._contentUpdates.personalities.asObservable(),
      collectibles: this._contentUpdates.collectibles.asObservable(),
      equipment: this._contentUpdates.equipment.asObservable(),
      player: this._contentUpdates.player.asObservable(),
      party: this._contentUpdates.party.asObservable(),
      gmdata: this._contentUpdates.gmdata.asObservable(),
      battle: this._contentUpdates.battle.asObservable(),
      petbasic: this._contentUpdates.petbasic.asObservable(),
      petbuy: this._contentUpdates.petbuy.asObservable(),
      petactive: this._contentUpdates.petactive.asObservable()
    };

    this._playerName = new Promise(resolve => {
      const sub = this.contentUpdates.player.subscribe(x => {
        if(!x.name) return;
        resolve(x.name);
        sub.unsubscribe();
      });
    });
  }

  initSocket() {
    if(this.socket) return;
    this.socket = Primus.connect(`${settings.protocol}://${settings.hostname}:${settings.port}`, {
      reconnect: {
        min: 500,
        retries: 30,
        factor: 2
      }
    });

    window.socket = this.socket;

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
      if(data.route && data.channel && data.text) return this.handleChatMessage(data, true);

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
        if(_.find(userList, { name: data.data.name })) return;
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

  handleChatMessage(message, fromPrimus = false) {
    const player = this._contentUpdates.player.getValue();
    const playerName = player.nameEdit ? player.nameEdit : player.name;
    if(fromPrimus && message.playerName === playerName) return;
    if(!message.timestamp) message.timestamp = Date.now();
    const currentMessages = this._contentUpdates.chatMessage.getValue() || [];
    currentMessages.push(message);
    this._contentUpdates.chatMessage.next(currentMessages);
  }

  sendChatMessage(message) {
    this.emit('plugin:chat:sendmessage', message);

    const player = this._contentUpdates.player.getValue();
    message.playerName = player.nameEdit ? player.nameEdit : player.name;
    message.title = player.title;
    this.handleChatMessage(message);
  }

  handleContentUpdate(content) {
    if(!content.update) return;
    this._contentUpdates[content.update].next(content.data);
  }

  handleNotification(object) {
    object.text = object.notify;
    object.nonblock = {
      nonblock: true,
      nonblock_opacity: .2
    };
    object.delay = 3000;
    this.pnotify.pnotify(object);
  }

  convertAdventureLogToChat(object) {
    const targets = object.targetsDisplay ? object.targetsDisplay : object.targets;
    const playerName = object.type === 'Global' ? '[Global]' : `[${targets.join(', ')}]`;
    const channel = 'Global Events';
    const route = 'chat:channel:Global Events';
    this.handleChatMessage({ text: object.text, playerName, channel, route });
  }

  handleAdventureLog(object) {
    // this.convertAdventureLogToChat(object);
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

  get playerName() {
    const player = this._contentUpdates.player.getValue();
    return player.nameEdit ? player.nameEdit : player.name;
  }

  changeGender(newGender) {
    const playerName = this._contentUpdates.player.getValue().name;
    this.emit('plugin:player:changegender', { playerName, gender: newGender });
  }

  changeTitle(newTitle) {
    const playerName = this._contentUpdates.player.getValue().name;
    this.emit('plugin:player:changetitle', { playerName, title: newTitle });
  }

  togglePersonality(personality) {
    const playerName = this._contentUpdates.player.getValue().name;
    this.emit('plugin:player:togglepersonality', { playerName, personality });
  }

  loadBattle(battleName) {
    this.emit('plugin:combat:retrieve', {
      playerName: this._contentUpdates.player.getValue().name,
      battleName
    });
  }

  mute(muter, mutee) {
    this.emit('plugin:chat:togglemute', { playerName: muter, targetName: mutee });
  }

  changeName(changer, changee, newName) {
    this.emit('plugin:player:changename', { playerName: changer, targetName: changee, newName });
  }

  makeChoice(id, response) {
    this.emit('plugin:player:makechoice', {
      playerName: this._contentUpdates.player.getValue().name,
      id,
      response
    });
  }

  teleport(targetName, location) {
    this.emit('plugin:gm:teleport', {
      targetName,
      teleData: {
        toLoc: location
      }
    });
  }

  toggleMod(targetName) {
    this.emit('plugin:gm:togglemod', {
      targetName
    });
  }

  toggleAchievement(targetName, achievement) {
    this.emit('plugin:gm:toggleachievement', {
      targetName,
      achievement
    });
  }

  banUser(playerName, targetName) {
    this.emit('plugin:chat:toggleban', {
      playerName,
      targetName
    });
  }

  requestStatistics() {
    this._playerName.then(name => {
      this.emit('plugin:player:request:statistics', { playerName: name });
    });
  }

  requestCollectibles() {
    this._playerName.then(name => {
      this.emit('plugin:player:request:collectibles', { playerName: name });
    });
  }

  requestAchievements() {
    this._playerName.then(name => {
      this.emit('plugin:player:request:achievements', { playerName: name });
    });
  }

  requestEquipment() {
    this._playerName.then(name => {
      this.emit('plugin:player:request:equipment', { playerName: name });
    });
  }

  requestPersonalities() {
    this._playerName.then(name => {
      this.emit('plugin:player:request:personalities', { playerName: name });
    });
  }

  requestPets() {
    this._playerName.then(() => {
      this.emit('plugin:player:request:pets');
    });
  }

  requestNoKill() {
    this.emit('plugin:player:imregisteringrightnowdontkillme');
  }

  buyPet(petType, petName) {
    this.emit('plugin:pet:buy', { petType, petName });
  }

  swapPet(petType) {
    this.emit('plugin:pet:swap', { petType });
  }

  togglePetSmart(setting) {
    this.emit('plugin:pet:smart', { setting });
  }

  changePetClass(newProfession) {
    this.emit('plugin:pet:profession', { newProfession });
  }

  changePetAttr(newAttr) {
    this.emit('plugin:pet:attr', { newAttr });
  }

  upgradePetAttr(upgradeAttr) {
    this.emit('plugin:pet:upgrade', { upgradeAttr });
  }

  feedPet(gold) {
    this.emit('plugin:pet:feed', { gold });
  }

  takeGoldFromPet() {
    this.emit('plugin:pet:takegold');
  }

  sellItemFromPet(itemId) {
    this.emit('plugin:pet:sell', { itemId });
  }

  equipItemOnPet(itemId) {
    this.emit('plugin:pet:equip', { itemId });
  }

  unequipItemFromPet(itemId) {
    this.emit('plugin:pet:unequip', { itemId });
  }

  giveItemToPet(itemId) {
    this.emit('plugin:pet:giveitem', { itemId });
  }

  giveItemToPlayer(itemId) {
    this.emit('plugin:pet:takeitem', { itemId });
  }
}