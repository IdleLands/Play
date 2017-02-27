
import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, ViewController, NavController, NavParams } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Achievement } from '../../models';

@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html'
})
export class AchievementsPage extends PlayComponent implements OnInit, OnDestroy {

  achievements$: any;
  public achievements: Achievement[] = [];
  public totalTiers: number = 0;

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
    });

    this.primus.requestAchievements();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.achievements$.unsubscribe();
  }

  setAchievements(achievements: Achievement[]) {
    this.achievements = achievements;
    this.totalTiers = _.sumBy(this.achievements, 'tier');
  }

  viewRewards(achievement) {
    this.modalCtrl.create(AchievementModal, { achievement }).present();
  }

}

@Component({
  template: `
<ion-header>
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

<ion-content>
  <ion-grid text-center>
    <ion-row>
      <ion-col>{{ achievement.desc }}</ion-col>
    </ion-row>
    <ion-row *ngFor="let reward of rewards">
      <ion-col text-right class="bold">{{ reward.type }}</ion-col> 
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
    public navParams: NavParams
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