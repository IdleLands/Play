
import _ from 'lodash';

import { SweetAlertService } from 'ng2-sweetalert2';

import { StorageService } from 'ng2-storage';

import { PrimusWrapper } from '../../../services/primus';

import { Component } from '@angular/core';
import template from './achievements.html';
import './achievements.less';

@Component({
  template
})
export class AchievementsComponent {

  static get parameters() {
    return [[PrimusWrapper], [SweetAlertService], [StorageService]];
  }

  constructor(primus, swal, storage) {
    this.primus = primus;
    this.swal = swal;
    this.storage = storage.local;
  }

  setAchievements(achievementData) {
    this.achievements = _.values(achievementData);
  }

  moreInfo(achievement) {

    let html = '';

    _.each(achievement.rewards, reward => {
      if(reward.type === 'stats') {
        _.each(reward, (val, key) => {
          if(key === 'type') return;
          html += `<div><strong>${key.split('Display').join('').toUpperCase()}</strong> ${val || reward[`${key}Display`]}</div>`;
        });

      } else if(reward.type === 'pet') {
        html += `<div><strong>Pet</strong> ${reward.pet}</div>`;

      } else if(reward.type === 'title') {
        html += `<div><strong>Title</strong> ${reward.title}</div>`;

      } else if(reward.type === 'personality') {
        html += `<div><strong>Personality</strong> ${reward.personality}</div>`;
      }
    });

    this.swal.swal({
      customClass: this.storage.theme,
      title: 'Achievement Rewards',
      html
    });
  }

  ngOnInit() {
    this.achievementSubscription = this.primus.contentUpdates.achievements.subscribe(data => this.setAchievements(data));
    this.primus.requestAchievements();
  }

  ngOnDestroy() {
    this.achievementSubscription.unsubscribe();
  }
}