import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocalStorage } from 'ng2-webstorage';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Personalities } from '../../models';

declare var COMMITHASH: string;
declare var VERSION: string;

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage extends PlayComponent implements OnInit, OnDestroy {

  personalities$: any;
  personalities: Personalities;

  genders$: any;
  genders: string[] = [];

  achievements$: any;
  titles: string[] = [];

  @LocalStorage()
  theme: string;

  themes = [
    { name: 'Default',        val: 'default' },
    { name: 'AMOLED Black',   val: 'amoled' },
    { name: 'Black & White',  val: 'blackwhite' },
    { name: 'Dark',           val: 'dark' },
    { name: 'Dim Ocean',      val: 'dimocean' },
    { name: 'Green Machine',  val: 'greenmachine' },
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

  get commitHash() {
    return COMMITHASH;
  }

  ngOnInit() {
    super.ngOnInit();

    if(!this.theme) this.theme = 'default';

    this.personalities$ = this.appState.personalities.subscribe(data => this.personalities = data);
    this.genders$ = this.appState.genders.subscribe(data => this.genders = data);
    this.achievements$ = this.appState.achievements.subscribe(data => this.parseTitles(data));

    this.primus.requestPersonalities();
    this.primus.requestAchievements();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.personalities$.unsubscribe();
  }

  parseTitles(achievements) {
    this.titles = _(achievements)
      .map('rewards')
      .flattenDeep()
      .filter(reward => reward.type === 'title')
      .map('title')
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
