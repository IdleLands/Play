
import _ from 'lodash';

import { SweetAlertService } from 'ng2-sweetalert2';

import { PrimusWrapper } from '../../../services/primus';

import { Component } from '@angular/core';
import template from './achievements.html';
import './achievements.less';

@Component({
  template
})
export class AchievementsComponent {

  static get parameters() {
    return [[PrimusWrapper], [SweetAlertService]];
  }

  constructor(primus, swal) {
    this.primus = primus;
    this.swal = swal;
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
          html += `<div><strong>${key.toUpperCase()}</strong> ${val}</div>`;
        });

      } else if(reward.type === 'title') {
        html += `<div><strong>Title</strong> ${reward.title}</div>`;

      }
    });

    this.swal.swal({
      title: 'Achievement Rewards',
      html
    });
  }

  ngOnInit() {
    this.achievementSubscription = this.primus.contentUpdates.achievements.subscribe(data => this.setAchievements(data));
  }

  ngOnDestroy() {
    this.achievementSubscription.unsubscribe();
  }
}