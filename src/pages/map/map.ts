// import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, PopoverController, ViewController } from 'ionic-angular';

import { AppState, Primus, Theme } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { ChatUser, Personalities } from '../../models';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage extends PlayComponent implements OnInit, OnDestroy {

  collectibles$: any;
  collectibleHash: any = {};

  otherPlayers$: any;
  otherPlayers: ChatUser[];

  public mapText: string;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public popCtrl: PopoverController,
    public theme: Theme
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.collectibles$ = this.appState.collectibles.subscribe(data => this.collectibleHash = data.orig.current);
    this.otherPlayers$ = this.appState.chatUsers.subscribe(data => this.otherPlayers = data);

    this.primus.requestCollectibles();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.collectibles$.unsubscribe();
    this.otherPlayers$.unsubscribe();
  }

  updateText(text) {
    this.mapText = text;
  }

  loadPersonalities($event) {
    this.popCtrl
      .create(PersonalityPopover, {}, { cssClass: `${this.theme.currentTheme} transparent-menu`, showBackdrop: false, enableBackdropDismiss: false })
      .present({ ev: $event });
  }

}

@Component({
  template: `
    <ion-list>
      <button ion-item icon-left (click)="dismiss()">
        <ion-icon name="close"></ion-icon> Close
      </button>
      <ion-item *ngFor="let personality of personalities.earned">
        <ion-label>{{ personality.name }}</ion-label>
        <ion-checkbox [checked]="personalities.active[personality.name]" (ionChange)="togglePersonality(personality.name)"></ion-checkbox>
      </ion-item>
    </ion-list>
  `
})
export class PersonalityPopover implements OnInit, OnDestroy {

  personalities$: any;
  personalities: Personalities;

  constructor(
    public viewCtrl: ViewController,
    public primus: Primus,
    public appState: AppState
  ) {}

  ngOnInit() {
    this.personalities$ = this.appState.personalities.subscribe(data => this.personalities = data);

    this.primus.requestPersonalities();
  }

  ngOnDestroy() {
    this.personalities$.unsubscribe();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  togglePersonality(personality) {
    this.primus.togglePersonality(personality);
  }
}