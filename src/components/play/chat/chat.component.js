
import _ from 'lodash';

import { SweetAlertService } from 'ng2-sweetalert2';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';
import { StorageService } from 'ng2-storage';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PrimusWrapper } from '../../../services/primus';
import { MessageNotifier } from '../../../services/messagenotifier';
import template from './chat.html';
import './chat.less';

import { ChatOutputComponent } from './chatoutput/chatoutput.component';

const chatData = {
  General: { unread: 0, route: 'chat:channel:General', messages: [], canHide: false },
  'Global Events': { unread: 0, route: 'chat:channel:Global Events', messages: [], canHide: false }
};

@Component({
  directives: [ChatOutputComponent, DROPDOWN_DIRECTIVES],
  template
})
export class ChatComponent {
  static get parameters() {
    return [[PrimusWrapper], [StorageService], [MessageNotifier], [SweetAlertService]];
  }

  constructor(primus, storage, notifier, swal) {
    this.storage = storage.local;
    this.primus = primus;
    this.notifier = notifier;
    this.swal = swal;
    this.isVisible = {};
    this._activeChannelMessages = new BehaviorSubject([]);
    this.activeChannelMessages = this._activeChannelMessages.asObservable();
    const newChatData = this.storage.chatData || chatData;

    // adding new global channels will set their hideable status
    _.each(chatData, (data, channel) => {
      if(!newChatData[channel]) newChatData[channel] = _.cloneDeep(data);
      newChatData[channel].canHide = data.canHide;
    });

    this.chatData = newChatData;
    this.channels = _.keys(this.chatData);
    this.changeChannel('General');
  }

  ngOnInit() {
    this.chatMessageSubscription = this.primus.contentUpdates.chatMessage.subscribe(data => this.addChatMessage(data));
    this.userSubscription = this.primus.contentUpdates.onlineUsers.subscribe(data => this.setOnlineUsers(data));
    this.nameSubscription = this.primus.contentUpdates.player.subscribe(data => this.retrievePlayerData(data));
    this.gmSubscription = this.primus.contentUpdates.gmdata.subscribe(data => this.gmData = data);
    this.notifier._blockMessages = true;

    setTimeout(() => {
      this.notifier.clearIndicators();
    });
  }

  ngOnDestroy() {
    this.chatMessageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.nameSubscription.unsubscribe();
    this.gmSubscription.unsubscribe();
    this.notifier._blockMessages = false;
  }

  muteUser(otherUser) {
    this.primus.mute(this.playerName, otherUser);
  }

  retrievePlayerData(player) {
    this.playerName = player.name;
    this.isMod = player.isMod;
    this.isMuted = player.isMuted;
  }

  hideChannel(channel) {
    this.chatData[channel].hidden = true;

    if(channel === this.activeChannel) {
      setTimeout(() => {
        this.changeChannel('General');
        this.formatChatDataForLocalSave(this.chatData);
      });
    }

  }

  setOnlineUsers(data) {
    this.onlineUsers = _.sortBy(data, p => p.name.toLowerCase());
  }

  getOtherPersonFromRoute(route) {
    return _.reject(route.split(':')[2].split('|'), p => p === this.playerName)[0];
  }

  addChatMessage(chatMessages) {
    if(!chatMessages || chatMessages.length === 0) return;

    _.each(chatMessages, chatMessage => {

      let channelName = chatMessage.channel;

      if(_.startsWith(chatMessage.route, 'channel:pm:')) {
        channelName = this.getOtherPersonFromRoute(chatMessage.route);
        chatMessage.channel = channelName;
      }

      if(!channelName) return;
      if(!this.chatData[channelName]) this.addChannel(channelName, chatMessage.route);

      const channel = this.chatData[channelName].messages;
      channel.push(chatMessage);
      channel.hidden = false;
      while(channel.length > 200) channel.shift();

      if(channelName !== this.activeChannel) {
        this.chatData[channelName].unread++;
      } else {
        this._activeChannelMessages.next(channel);
      }
    });

    // prevent the next load from grabbing a new message accidentally
    this.primus._contentUpdates.chatMessage.next(null);

    this.formatChatDataForLocalSave(_.cloneDeep(this.chatData));
  }

  openPM(withPlayer) {
    const sortedUsers = [withPlayer, this.playerName].sort();
    const channelName = `channel:pm:${sortedUsers.join('|')}`;
    const myChannelName = withPlayer;

    if(!this.chatData[myChannelName]) {
      this.addChannel(myChannelName, channelName);
    } else {
      this.chatData[myChannelName].hidden = false;
    }
    this.changeChannel(myChannelName);

  }

  addChannel(newChannel, route) {
    if(!newChannel) return;
    this.chatData[newChannel] = { unread: 0, route: route, messages: [], canHide: true };
    this.channels.push(newChannel);
  }

  changeChannel(newChannel) {
    this.activeChannel = newChannel;
    this.chatData[newChannel].unread = 0;
    this._activeChannelMessages.next(this.chatData[newChannel].messages);
  }

  sendMessage(message) {
    message = message.trim();
    if(!message) return;
    this.primus.emit('plugin:chat:sendmessage', {
      playerName: this.playerName,
      text: message,
      channel: this.activeChannel,
      route: this.chatData[this.activeChannel].route
    });
    this.chatMessage = '';
  }

  formatChatDataForLocalSave(data) {
    _.each(data, (val, key) => {
      if(val.hidden) {
        delete data[key];
        this.channels = _.without(this.channels, key);
        return;
      }

      while(val.messages.length > 10) val.messages.shift();
      if(val.unread > 10) val.unread = 10;
    });

    this.storage.chatData = data;
  }

  gmTeleport(targetName) {
    this.swal.swal({
      title: 'Select a Teleport Location',
      input: 'select',
      inputOptions: _(this.gmData.teleNames).reduce((prev, cur) => {
        prev[cur] = cur;
        return prev;
      }, {}),
      inputPlaceholder: 'Select location...',
      showCancelButton: true
    }).then(loc => {
      if(!loc) return;
      this.primus.teleport(targetName, loc);
    });
  }

  gmToggleMod(targetName) {
    this.primus.toggleMod(targetName);
  }

  gmToggleAchievement(targetName) {
    this.swal.swal({
      title: 'Select an achievement',
      input: 'select',
      inputOptions: _(this.gmData.permAchs).reduce((prev, cur) => {
        prev[cur.property] = cur.name;
        return prev;
      }, {}),
      inputPlaceholder: 'Select achievement...',
      showCancelButton: true
    }).then(achievement => {
      if(!achievement) return;
      this.primus.toggleAchievement(targetName, achievement);
    });
  }

  gmNameChange(targetName) {
    this.swal.swal({
      title: 'Choose a new name',
      input: 'text',
      inputPlaceholder: 'Enter name...',
      inputValue: targetName,
      showCancelButton: true
    }).then(name => {
      if(!name) return;
      this.primus.changeName(this.playerName, targetName, name);
    });
  }

  gmBan(targetName) {
    this.swal.confirm({
      title: 'Are you sure you want to ban this user?',
      text: 'This is really annoying to revert!',
      type: 'warning',
      showCancelButton: true
    }).then(res => {
      if(!res) return;
      this.primus.banUser(this.playerName, targetName);
    });
  }

}