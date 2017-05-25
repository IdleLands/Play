import * as _ from 'lodash';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, ViewController, AlertController, NavParams, PopoverController } from 'ionic-angular';

import { LocalStorage } from 'ng2-webstorage';

import { AppState, Primus, Theme } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { ChatUser, ChatMessage } from '../../models';

@IonicPage({
  segment: 'chat'
})
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

  @ViewChild('chatPageContent')
  public chatPageContent;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popCtrl: PopoverController,
    public theme: Theme
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

    this.primus.requestGuild();

    this.timeoutId = setInterval(() => {
      if(document.hidden) return;
      this.lastMessageSeen = Date.now();
    }, 1000);

    this.menuCtrl.enable(true, 'chat');
    this.menuCtrl.enable(false, 'pets');
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.chatUsers$.unsubscribe();
    this.onlineStatus$.unsubscribe();

    clearInterval(this.timeoutId);
  }

  setPlayer(player) {
    super.setPlayer(player);

    const guildChannel = _.find(this.channels, ch => _.includes(ch.route, 'chat:channel:Guild:'));
    const me = _.find(this.chatUsers, { name: player.name });

    if(guildChannel && guildChannel.route !== `chat:channel:Guild:${player.guildName}`) {
      this.channels = _.without(this.channels, guildChannel);
    }

    if(me && player.guildName && !guildChannel) {
      this.tryToAddChannel({ name: `[${me.guildTag}] Guild Chat`, route: `chat:channel:Guild:${player.guildName}` });

    } else if(!player.guildName && guildChannel) {
      this.channels = _.without(this.channels, guildChannel);

    }
  }

  get shouldShowChatUsers() {
    return this.chatPageContent._elementRef.nativeElement.offsetWidth > 768;
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

    const isActive = this.isChannelActive(channel);

    if(!isActive
    && !message.hidden
    && !message.seen
    && (this.player.name && message.playerName !== this.player.name)) {
      this.incrementMissedMessages(message.route);

      if(isPm) {
        this.missedMessagesCount++;
      }
    }

    if(isActive) {
      message.seen = true;
    }
  }

  switchChannel(channel) {
    if(this.isChannelActive(channel)) return;
    this.activeChannel = channel;
    this.missedMessagesCount -= this.missedMessagesHash[channel.route] || 0;
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

  openGMCommands(player, $event) {
    $event.preventDefault();

    this.popCtrl
      .create(GMCommandsPopover, { player }, { cssClass: this.theme.currentTheme })
      .present({ ev: $event });
  }

}

@Component({
  template: `
    <ion-list>
      <ion-item>{{ player.nameEdit || player.name }}</ion-item>
      <ion-row>
        <ion-col no-padding>
          <button ion-item detail-none (click)="toggleMute()">{{ player.isMuted ? 'Unmute' : 'Mute' }}</button>
        </ion-col>
        <ion-col no-padding>
          <button ion-item detail-none (click)="ban()">Ban</button>
        </ion-col>
        <ion-col no-padding>
          <button ion-item detail-none (click)="pardon()">Pardon</button>
        </ion-col>
      </ion-row>
      
      <button ion-item (click)="toggleMod()">{{ player.isMod ? 'Take' : 'Make' }} Moderator</button>
      
      <button ion-item (click)="teleport()">Teleport To...</button>
      
      <button ion-item (click)="toggleAchievement()">Toggle Achievement</button>
      
      <button ion-item (click)="statistics()">Set Statistic</button>
      
      <ion-row>
        <ion-col no-padding>
          <button ion-item detail-none (click)="name()">Name</button>
        </ion-col>
        <ion-col no-padding>
          <button ion-item detail-none (click)="level()">Level</button>
        </ion-col>
      </ion-row>
      
      <ion-row>
        <ion-col no-padding>
          <button ion-item detail-none (click)="event()">Event</button>
        </ion-col>
        <ion-col no-padding>
          <button ion-item detail-none (click)="item()">Item</button>
        </ion-col>
      </ion-row>
      
      <ion-row>
        <ion-col no-padding>
          <button ion-item detail-none (click)="gold()">Gold</button>
        </ion-col>
        <ion-col no-padding>
          <button ion-item detail-none (click)="ilp()">ILP</button>
        </ion-col>
      </ion-row>
      
      <ion-item class="hidden">
        <ion-label>Teleport Location</ion-label>
        <ion-select #teleports (ionChange)="_chooseTeleport($event)">
          <ion-option *ngFor="let teleport of gm.teleNames">{{ teleport }}</ion-option>
        </ion-select>
      </ion-item>
      
      <ion-item class="hidden">
        <ion-label>Permanent Achievements</ion-label>
        <ion-select #achievements (ionChange)="_chooseAchievement($event)">
          <ion-option *ngFor="let achievement of gm.permAchs" [value]="achievement.property">{{ achievement.name }}</ion-option>
        </ion-select>
      </ion-item>
      
      <ion-item class="hidden">
        <ion-label>Events</ion-label>
        <ion-select #events (ionChange)="_chooseEvent($event)">
          <ion-option *ngFor="let event of gm.allEvents">{{ event }}</ion-option>
        </ion-select>
      </ion-item>
    </ion-list>
  `
})
export class GMCommandsPopover implements OnInit, OnDestroy {

  player: any;
  gm$: any;
  gm: any;

  @ViewChild('teleports')
  public teleports;

  @ViewChild('achievements')
  public achievements;

  @ViewChild('events')
  public events;

  constructor(
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public appState: AppState,
    public primus: Primus,
    public theme: Theme
  ) {}

  ngOnInit() {
    this.player = this.navParams.get('player');
    this.gm$ = this.appState.gmdata.subscribe(data => {
      this.gm = data;
    });

    this.teleports.selectOptions = { cssClass: this.theme.currentTheme };
    this.achievements.selectOptions = { cssClass: this.theme.currentTheme };
    this.events.selectOptions = { cssClass: this.theme.currentTheme };
  }

  ngOnDestroy() {
    this.gm$.unsubscribe();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  toggleMute() {
    this.primus.mute(this.player.name);
    this.dismiss();
  }

  ban() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Ban ${this.player.name}?`,
      message: 'This is really annoying to revert!',
      buttons: [
        { text: 'Cancel' },
        { text: 'Yes, Ban Player', handler: () => {
          this.primus.ban(this.player.name);
          this.dismiss();
        } }
      ]
    }).present();
  }

  pardon() {
    this.primus.pardon(this.player.name);
    this.dismiss();
  }

  toggleMod() {
    this.primus.toggleModerator(this.player.name);
    this.dismiss();
  }

  name() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Change ${this.player.name}'s Name`,
      message: 'Enter a new name for this player.',
      inputs: [
        { type: 'text', name: 'newName', placeholder: 'New name', value: this.player.name }
      ],
      buttons: [
        { text: 'Cancel' },
        { text: 'Rename Player', handler: (data) => {
          this.primus.rename(this.player.name, data.newName);
          this.dismiss();
        } }
      ]
    }).present();
  }

  level() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Change ${this.player.name}'s Level`,
      message: 'Enter a new level for this player.',
      inputs: [
        { type: 'number', name: 'newLevel', placeholder: 'New level', value: this.player.level }
      ],
      buttons: [
        { text: 'Cancel' },
        { text: 'Relevel Player', handler: (data) => {
          this.primus.relevel(this.player.name, data.newLevel);
          this.dismiss();
        } }
      ]
    }).present();
  }

  _chooseTeleport(data) {
    this.primus.teleport(this.player.name, { toLoc: data });
  }

  teleport() {
    this.teleports.open();
  }

  statistics() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Change ${this.player.name}'s Statistics`,
      message: 'Enter a stat and a value.',
      inputs: [
        { type: 'string', name: 'stat',  placeholder: 'Statistic' },
        { type: 'number', name: 'value', placeholder: 'Value' }
      ],
      buttons: [
        { text: 'Cancel' },
        { text: 'Restat Player', handler: (data) => {
          this.primus.restat(this.player.name, data.stat, +data.value);
          this.dismiss();
        } }
      ]
    }).present();
  }

  _chooseAchievement(data) {
    this.primus.toggleAchievement(this.player.name, data);
  }

  toggleAchievement() {
    this.achievements.open();
  }

  _chooseEvent(data) {
    this.primus.event(this.player.name, data);
  }

  event() {
    this.events.open({ selectOptions: { cssClass: this.theme.currentTheme } });
  }

  item() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Give ${this.player.name} and Item`,
      message: 'Enter the item text here. Don\'t forget the type!',
      inputs: [
        { type: 'text', name: 'item', placeholder: '"Item Name" type=mainhand dex=1' }
      ],
      buttons: [
        { text: 'Cancel' },
        { text: 'Give Item', handler: (data) => {
          this.primus.giveItem(this.player.name, data.item);
          this.dismiss();
        } }
      ]
    }).present();
  }

  gold() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Give ${this.player.name} Gold`,
      inputs: [
        { type: 'number', name: 'bonusGold', placeholder: 'Gold bonus' }
      ],
      buttons: [
        { text: 'Cancel' },
        { text: 'Give Gold', handler: (data) => {
          this.primus.giveGold(this.player.name, data.bonusGold);
          this.dismiss();
        } }
      ]
    }).present();
  }

  ilp() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: `Give ${this.player.name} ILP`,
      inputs: [
        { type: 'number', name: 'bonusIlp', placeholder: 'ILP bonus' }
      ],
      buttons: [
        { text: 'Cancel' },
        { text: 'Give ILP', handler: (data) => {
          this.primus.giveILP(this.player.name, data.bonusIlp);
          this.dismiss();
        } }
      ]
    }).present();
  }
}