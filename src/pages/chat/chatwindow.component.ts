import * as _ from 'lodash';

import { Component, EventEmitter, Input, Output, OnInit, OnChanges, AfterViewChecked, OnDestroy, Pipe, PipeTransform, ViewChild } from '@angular/core';

import { LocalStorage, LocalStorageService } from 'ng2-webstorage';
import linkify from 'linkifyjs/string';

import { AppState, Primus } from '../../services';

import { Player, ChatMessage } from '../../models';

const AUTOSCROLL_THRESHOLD = 200;

@Component({
  selector: 'chat-window',
  templateUrl: 'chatwindow.html'
})
export class ChatWindowComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {

  @Input() public channel: { route: string, name: string };
  @Input() public player: Player = new Player();

  @Output() public channelUpdate = new EventEmitter();
  @Output() public removeChannel = new EventEmitter();

  @ViewChild('outputWindow')
  public outputWindow;

  public baseHeight: number = 200;

  @ViewChild('typeHere')
  public textInput;

  public showScrollButton: boolean;

  @LocalStorage()
  public currentMessage: string;

  public chatMessages$: any;
  public chatLog: ChatMessage[] = [];

  chatLength$: any;
  private baseChatLength: number;

  private firstTime = true;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public storage: LocalStorageService
  ) {}

  ngOnInit() {
    this.chatMessages$ = this.appState.chatMessages.subscribe(data => this.receiveMessage(data));
    this.chatLength$ = this.appState._chatLength.subscribe(data => this.baseChatLength = data);
    this.setBaseHeight();

    setTimeout(() => this.scrollToBottom(), 1000);
  }

  ngOnDestroy() {
    this.chatMessages$.unsubscribe();
  }

  ngOnChanges(changes) {
    if(changes.channel) {
      this.scrollToBottom();
    }
  }

  ngAfterViewChecked() {
    if(this.firstTime) {
      this.firstTime = false;
      setTimeout(() => {
        this.textInput.setFocus();
      }, 150);
    }
    if(this.showScrollButton) return;

    if(this.atBottomish()) {
      this.scrollToBottom();
    }
  }

  setBaseHeight() {
    this.baseHeight = this.outputElement.scrollHeight;
  }

  get isCompressedChat() {
    return this.storage.retrieve('compressChat');
  }

  get outputElement() {
    return this.outputWindow.nativeElement;
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
    return this.outputElement.scrollTop >
           this.outputElement.scrollHeight - this.outputElement.offsetHeight - AUTOSCROLL_THRESHOLD;
  }

  scrollToBottom() {
    this.showScrollButton = false;
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
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

    if(message.route !== this.channel.route) return;

    this.showScrollButton = !this.atBottomish();
    this.setBaseHeight();
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