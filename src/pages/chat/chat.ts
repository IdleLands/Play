import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { LocalStorage } from 'ng2-webstorage';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { ChatUser } from '../../models';
import {ChatMessage} from "../../models/chat";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage extends PlayComponent implements OnInit, OnDestroy {

  chatUsers$: any;
  chatUsers: ChatUser[] = [];

  onlineStatus$: any;
  onlineStatus: string;

  public activeChannel;

  public missedMessagesHash = {};
  public missedMessagesCount: number = 0;

  @LocalStorage()
  public lastMessageSeen: number;

  public timeoutId;

  channels = [
    { name: 'General', route: 'chat:channel:General' }
  ];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public menuCtrl: MenuController
  ) {
    super(appState, primus, navCtrl);
  }

  toggleChatMenu() {
    this.missedMessagesCount = 0;
    this.menuCtrl.toggle('right');
  }

  ngOnInit() {
    super.ngOnInit();

    if(!this.activeChannel) this.activeChannel = this.channels[0];

    this.chatUsers$ = this.appState.chatUsers.subscribe(data => this.chatUsers = _.sortBy(data, p => p.name.toLowerCase()));
    this.onlineStatus$ = this.appState.onlineStatus.subscribe(data => this.onlineStatus = data);

    this.timeoutId = setInterval(() => {
      if(document.hidden) return;
      this.lastMessageSeen = Date.now();
    }, 1000);
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.chatUsers$.unsubscribe();
    this.onlineStatus$.unsubscribe();

    clearInterval(this.timeoutId);
  }

  removeChannel(channel) {
    this.channels = _.reject(this.channels, chan => chan.route === channel.route);
    this.switchChannel(this.channels[0]);
  }

  channelName(channel) {
    if(_.includes(channel.route, ':pm:')) return this.getOtherPersonFromRoute(channel.route);
    return channel.name;
  }

  getOtherPersonFromRoute(route) {
    return _.reject(route.split(':')[2].split('|'), p => p === this.player.name)[0];
  }

  closeMenu() {
    this.menuCtrl.close('chat');
  }

  isChannelActive(channel) {
    return channel.route === this.activeChannel.route;
  }

  tryToAddChannel(channelObject) {
    if(!_.find(this.channels, { route: channelObject.route })) {
      this.channels.push(channelObject);
    }
  }

  incrementMissedMessages(route) {
    if(!this.missedMessagesHash[route]) this.missedMessagesHash[route] = 0;
    this.missedMessagesHash[route]++;
  }

  channelReceivedMessage(message: ChatMessage) {
    const channel = { route: message.route, name: message.channel };
    this.tryToAddChannel(channel);

    const isPm = _.includes(message.route, ':pm:');

    if(!this.isChannelActive(channel)
    && !message.hidden
    && (this.player.name && message.playerName !== this.player.name)
    && (isPm || message.timestamp > this.lastMessageSeen)) {
      this.incrementMissedMessages(message.route);

      if(isPm) {
        this.missedMessagesCount++;
      }
    }
  }

  switchChannel(channel) {
    if(this.isChannelActive(channel)) return;
    this.activeChannel = channel;
    this.missedMessagesHash[channel.route] = 0;

    this.closeMenu();
  }

  messageUser(user) {
    if(this.onlineStatus !== 'online') {
      this.primus._handleNotification({ message: 'You are not currently connected! '});
      return;
    }

    const routeNameOrder = [this.player.name, user.name].sort().join('|');
    const channelObj = { name: routeNameOrder, route: `channel:pm:${routeNameOrder}` };

    this.tryToAddChannel(channelObj);
    this.switchChannel(channelObj);

    this.closeMenu();
  }

}
