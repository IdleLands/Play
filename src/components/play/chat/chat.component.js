
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
    this.channels = _.keys(chatData);
    this._activeChannelMessages = new BehaviorSubject([]);
    this.activeChannelMessages = this._activeChannelMessages.asObservable();
    this.chatData = chatData;
    this.changeChannel('General');
  }

  ngOnInit() {
    this.chatMessageSubscription = this.primus.contentUpdates.chatMessage.subscribe(data => this.addChatMessage(data));
    this.userSubscription = this.primus.contentUpdates.onlineUsers.subscribe(data => this.setOnlineUsers(data));
  }

  ngOnDestroy() {
    this.chatMessageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  setOnlineUsers(data) {
    this.onlineUsers = _.sortBy(data, 'playerName');
  }

  addChatMessage(chatMessage) {
    const channelName = chatMessage.channel;
    if(!channelName) return;
    if(!this.chatData[channelName]) this.addChannel(channelName, chatMessage.route);

    const channel = this.chatData[channelName].messages;
    channel.push(chatMessage);
    while(channel.length > 1000) channel.shift();

    if(channelName !== this.activeChannel) {
      this.chatData[channelName].unread++;
    } else {
      this._activeChannelMessages.next(channel);
    }
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
    const { name } = this.primus._contentUpdates.player.getValue();
    this.primus.emit('plugin:chat:sendmessage', {
      playerName: name,
      text: message,
      channel: this.activeChannel,
      route: this.chatData[this.activeChannel].route
    });
    this.chatMessage = '';
  }

}