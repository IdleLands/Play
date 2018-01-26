import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { LocalStorage } from 'ng2-webstorage';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Personalities } from '../../models';

declare var VERSION: string;

@IonicPage({
  segment: 'settings'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage extends PlayComponent implements OnInit, OnDestroy {

  personalities$: any;
  personalities: Personalities;

  genders$: any;
  baseGenders: string[] = [];
  achievementGenders: string[] = [];

  achievements$: any;
  titles: string[] = [];

  @LocalStorage()
  theme: string;

  @LocalStorage()
  faviconNotifications: boolean;

  @LocalStorage()
  compressChat: boolean;

  themes = [
    { name: 'Default',        val: 'default' },
    { name: 'AMOLED Black',   val: 'amoled' },
    { name: 'Black & White',  val: 'blackwhite' },
    { name: 'Dark',           val: 'dark' },
    { name: 'Dim Ocean',      val: 'dimocean' },
    { name: 'Green Machine',  val: 'greenmachine' },
    { name: 'l33t h4x0r',     val: 'hacker' },
    { name: 'Majestic',       val: 'majestic' },
    { name: 'Orangina',       val: 'orangina' }
  ];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
  ) {
    super(appState, primus, navCtrl);
  }

  get version() {
    return VERSION;
  }

  get thanks() {
    return [
      { name: 'Darkblizer', reason: 'Art' },
      { name: 'Sedgwick', reason: 'Development, Donation, Art' },
      { name: 'Yngvildr', reason: 'Development' },
      { name: 'Therealtahu', reason: 'Support, Development, Stability' },
      { name: 'Ascended', reason: 'Content, Development, Donation' },
      { name: 'Anexes', reason: 'Development' },
      { name: 'Kookie', reason: 'Development' },
      { name: 'Juke Dragh', reason: 'Support, Content' }
    ];
  }

  get genders() {
    return this.baseGenders;
  }

  ngOnInit() {
    super.ngOnInit();

    if(!this.theme) this.theme = 'default';

    this.personalities$ = this.appState.personalities.subscribe(data => this.personalities = data);
    this.genders$ = this.appState.genders.subscribe(data => this.baseGenders = data);
    this.achievements$ = this.appState.achievements.subscribe(data => {
      this.parseTitles(data);
    });

    this.primus.requestPersonalities();
    this.primus.requestAchievements();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.personalities$.unsubscribe();
    this.genders$.unsubscribe();
    this.achievements$.unsubscribe();
  }

  parseTitles(achievements) {
    this.titles = _(achievements)
      .map('rewards')
      .flattenDeep()
      .filter(reward => reward.type === 'title')
      .map('title')
      .sortBy()
      .value();
  }

  changeGender(gender) {
    this.primus.changeGender(gender);
  }

  changeTitle(title) {
    this.primus.changeTitle(title);
  }

  togglePersonality(personality) {
    this.primus.togglePersonality(personality);
  }

}
