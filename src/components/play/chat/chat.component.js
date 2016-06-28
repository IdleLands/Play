
import _ from 'lodash';

import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PrimusWrapper } from '../../../services/primus';
import template from './chat.html';
import './chat.less';

import { ChatOutputComponent } from './chatoutput/chatoutput.component';

const chatData = {
  General: { unread: 0, route: 'chat:channel:General', messages: [], canHide: false }
};

@Component({
  directives: [ChatOutputComponent],
  template
})
export class ChatComponent {
  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
    this.isVisible = {};
    this._activeChannelMessages = new BehaviorSubject([]);
    this.activeChannelMessages = this._activeChannelMessages.asObservable();
    this.chatData = chatData;
    this.channels = _.keys(chatData);
    this.changeChannel('General');
  }

  ngOnInit() {
    this.chatMessageSubscription = this.primus.contentUpdates.chatMessage.subscribe(data => this.addChatMessage(data));
    this.userSubscription = this.primus.contentUpdates.onlineUsers.subscribe(data => this.setOnlineUsers(data));
    this.nameSubscription = this.primus.contentUpdates.player.subscribe(data => this.retrievePlayerData(data));
  }

  ngOnDestroy() {
    this.chatMessageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.nameSubscription.unsubscribe();
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
      setTimeout(() => this.changeChannel('General'));
    }
  }

  setOnlineUsers(data) {
    this.onlineUsers = _.sortBy(data, 'playerName');
  }

  getOtherPersonFromRoute(route) {
    return _.reject(route.split(':')[2].split('|'), p => p === this.playerName)[0];
  }

  addChatMessage(chatMessage) {
    if(!chatMessage) return;

    let channelName = chatMessage.channel;

    if(_.includes(chatMessage.route, ':pm:')) {
      channelName = this.getOtherPersonFromRoute(chatMessage.route);
    }

    if(!channelName) return;
    if(!this.chatData[channelName]) this.addChannel(channelName, chatMessage.route);

    const channel = this.chatData[channelName].messages;
    channel.push(chatMessage);
    channel.hidden = false;
    while(channel.length > 1000) channel.shift();

    if(channelName !== this.activeChannel) {
      this.chatData[channelName].unread++;
    } else {
      this._activeChannelMessages.next(channel);
    }

    // prevent the next load from grabbing a new message accidentally
    this.primus._contentUpdates.chatMessage.next(null);
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
    this.activeChannel = myChannelName;

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

}