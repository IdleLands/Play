import * as _ from 'lodash';

import { Component, EventEmitter, Input, Output, OnInit, OnChanges, OnDestroy, Pipe, PipeTransform, ViewChild } from '@angular/core';
// import { NavController, MenuController } from 'ionic-angular';

import { LocalStorage, LocalStorageService } from 'ng2-webstorage';
import linkify from 'linkifyjs/string';

import { AppState, Primus } from '../../services';

import { Player, ChatMessage } from '../../models';

const AUTOSCROLL_THRESHOLD = 200;

@Component({
  selector: 'chat-window',
  templateUrl: 'chatwindow.html'
})
export class ChatWindowComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public channel: { route: string, name: string };
  @Input() public player: Player = new Player();

  @Output() public channelUpdate = new EventEmitter();
  @Output() public removeChannel = new EventEmitter();

  @ViewChild('outputWindow') public outputWindow;
  public baseHeight: number = 200;

  public showScrollButton: boolean;

  @LocalStorage()
  public currentMessage: string = '';

  public chatMessages$: any;
  public chatLog: ChatMessage[] = [];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public storage: LocalStorageService
  ) {}

  ngOnInit() {
    this.chatMessages$ = this.appState.chatMessages.subscribe(data => this.receiveMessage(data));
    this.baseHeight = this.outputWindow.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    this.chatMessages$.unsubscribe();
  }

  ngOnChanges(changes) {
    if(changes.channel) {
      setTimeout(() => {
        this.scrollToBottom();
      });
    }
  }

  doChannelRemove(channel) {
    _.each(this.chatLog, message => {
      if(message.route !== channel.route) return;
      message.hidden = true;
    });

    this.saveLog();

    this.removeChannel.emit(channel);
  }

  channelName(channel) {
    if(_.includes(channel.route, ':pm:')) return this.getOtherPersonFromRoute(channel.route);
    return channel.name;
  }

  getOtherPersonFromRoute(route) {
    return _.reject(route.split(':')[2].split('|'), p => p === this.player.name)[0];
  }

  atBottomish() {
    return this.outputWindow.nativeElement.scrollTop >
           this.outputWindow.nativeElement.scrollHeight - this.baseHeight - AUTOSCROLL_THRESHOLD;
  }

  scrollToBottom() {
    this.showScrollButton = false;
    this.outputWindow.nativeElement.scrollTop = this.outputWindow.nativeElement.scrollHeight + AUTOSCROLL_THRESHOLD;
  }

  saveLog() {
    this.storage.store('chatLog', this.chatLog);
  }

  receiveMessage(message) {
    if(message.hidden) return;
    this.chatLog.push(message);

    while(this.chatLog.length > 200) {
      this.chatLog.shift();
    }

    this.channelUpdate.emit(message);

    this.saveLog();

    if(message.route !== this.channel.route) return;

    if(this.atBottomish()) {
      this.showScrollButton = false;
      setTimeout(() => this.scrollToBottom());
    } else {
      this.showScrollButton = true;
    }
  }

  sendMessage() {
    const message = this.currentMessage.trim();
    if(!message) {
      this.currentMessage = '';
      return;
    }

    this.primus.sendChatMessage({
      playerName: this.player.name,
      title: this.player.title,
      text: message,
      channel: this.channel.name,
      route: this.channel.route,
      isMod: this.player.isMod,
      ascensionLevel: this.player.ascensionLevel,
      ip: '[self]',
      timestamp: Date.now()
    });

    this.currentMessage = '';
  }
}

@Pipe({
  name: 'currentChannel',
  pure: false
})
export class CurrentChannelPipe implements PipeTransform {
  transform(items: ChatMessage[], checkRoute: string): any[] {
    if(!items) return [];
    return _.filter(items, it => it.route === checkRoute);
  }
}

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {
  transform(message: string): string {
    if(!message) return '';
    return linkify(message);
  }
}