
import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, ViewController, NavController, NavParams } from 'ionic-angular';

import { LocalStorageService } from 'ng2-webstorage';

import { AppState, Primus, Theme } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Achievement } from '../../models';

@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html'
})
export class AchievementsPage extends PlayComponent implements OnInit, OnDestroy {

  achievements$: any;
  public achievements: Achievement[] = [];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.achievements$ = this.appState.achievements.subscribe(data => {
      this.setAchievements(data);
      const totalTiers = _.sumBy(data, 'tier');
      this.updatePageData(`Total Achievements: ${data.length}<br>Total Tiers: ${totalTiers}`);
    });

    this.primus.requestAchievements();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.achievements$.unsubscribe();
  }

  setAchievements(achievements: Achievement[]) {
    this.achievements = achievements;
  }

  viewRewards(achievement) {
    this.modalCtrl.create(AchievementModal, { achievement }).present();
  }

}

@Component({
  template: `
<ion-header class="modal {{ theme.currentTheme }}">
  <ion-toolbar color="primary">
    <ion-title>
      {{ achievement.name }} Rewards
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="viewCtrl.dismiss()">
        <ion-icon name="close"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="modal {{ theme.currentTheme }}">
  <ion-grid text-center>
    <ion-row>
      <ion-col>{{ achievement.desc }}</ion-col>
    </ion-row>
    <ion-row *ngFor="let reward of rewards">
      <ion-col text-right><strong>{{ reward.type }}</strong></ion-col> 
      <ion-col text-left>{{ reward.value }}</ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
`
})
export class AchievementModal implements OnInit {

  public rewards: Array<{ type, value }> = [];
  public achievement: Achievement;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public storage: LocalStorageService,
    public theme: Theme
  ) {}

  ngOnInit() {
    this.achievement = this.navParams.get('achievement');

    _.each(this.achievement.rewards, reward => {
      if(reward.type === 'stats') {
        _.each(reward, (val, key) => {
          if(key === 'type') return;

          const newReward = {
            type: key.split('Display').join('').toUpperCase(),
            value: val || reward[`${key}Display`]
          };

          this.rewards.push(newReward);
        });

      } else if(reward.type === 'pet') {
        this.rewards.push({ type: 'Pet', value: reward.pet });

      } else if(reward.type === 'petclass') {
        this.rewards.push({ type: 'Pet Class', value: reward.petclass });

      } else if(reward.type === 'petattr') {
        this.rewards.push({ type: 'Pet Attribute', value: reward.pet });

      } else if(reward.type === 'title') {
        this.rewards.push({ type: 'Title', value: reward.title });

      } else if(reward.type === 'personality') {
        this.rewards.push({ type: 'Personality', value: reward.personality });

      }
    });
  }
}