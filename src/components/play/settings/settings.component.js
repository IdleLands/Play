
import { SweetAlertService } from 'ng2-sweetalert2';
import { PrimusWrapper } from '../../../services/primus';

import _ from 'lodash';

import { Component } from '@angular/core';
import template from './settings.html';
import './settings.less';

import { StorageService } from 'ng2-storage';

const thanks = [
  { name: 'Darkblizer', reason: 'Art' },
  { name: 'Sedgwick', reason: 'Donation, Maps' },
  { name: 'Yngvildr', reason: 'Development' },
  { name: 'Therealtahu', reason: 'Support' }
];

const themes = [
  { name: 'Light Theme', val: '' },
  { name: 'Dark Theme', val: 'dark' },
  { name: 'AMOLED Black Theme', val: 'amoled' },
  { name: 'Orangina Theme', val: 'bright' },
  { name: 'Dim Ocean Theme', val: 'dimocean' },
  { name: 'Black & White Theme', val: 'blackwhite' },
  { name: 'Green Machine Theme', val: 'greenmachine' },
  { name: 'Majestic Theme', val: 'majestic' },
  { name: 'Simple Theme', val: 'simple' }
];

@Component({
  template
})
export class SettingsComponent {

  static get parameters() {
    return [[SweetAlertService], [PrimusWrapper], [StorageService]];
  }

  constructor(swal, primus, storage) {
    this.swal = swal;
    this.primus = primus;

    this.storage = storage.local;

    this.personalities = [];
    this.activePersonalities = {};
  }

  thanksHtml() {
    return `
<p>If you're interested in helping design content for the game, let Seiyria know.</p>

<p><strong>Contributions:</strong></p>
${_.map(thanks, t => `<div>${t.name} - ${t.reason}</div>`).join('')}

... and the many other donators, who are viewable in the Hall of Heroes! Thank you!

<p></p>
<p><strong>Want to help?</strong></p>
<p>All support goes directly to the game and servers! Thanks in advance!</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
  <input type="hidden" name="cmd" value="_s-xclick">
  <input type="hidden" name="hosted_button_id" value="TF5HJJLVYWMQU">
  <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
  <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
`;
  }

  showThanks() {
    this.swal.swal({
      title: 'Special Thanks',
      customClass: this.storage.theme,
      html: this.thanksHtml()
    });
  }

  parseTitles(achievementData) {
    this.validTitles = _(achievementData)
      .values()
      .map(achi => achi.rewards)
      .flattenDeep()
      .filter(reward => reward.type === 'title')
      .map(reward => reward.title)
      .value();
  }

  setPersonalities({ active, earned }) {
    this.personalities = earned;
    this.activePersonalities = active;
  }

  changeGender($event) {
    const newGender = $event.target.value;
    this.primus.changeGender(newGender);
  }

  changeTitle($event) {
    const newTitle = $event.target.value;
    this.primus.changeTitle(newTitle);
  }

  changeTheme($event) {
    const newTheme = $event.target.value;
    this.storage.theme = newTheme;
  }

  togglePersonality(personality) {
    this.primus.togglePersonality(personality);
  }

  ngOnInit() {
    this.validGenders = ['male', 'female', 'not a bear', 'glowcloud', 'astronomical entity'];
    this.themes = themes;

    const player = this.primus._contentUpdates.player.getValue();

    this._playerData = {
      gender: player.gender,
      title: player.title
    };

    this.achievementSubscription = this.primus.contentUpdates.achievements.subscribe(data => this.parseTitles(data));
    this.personalitySubscription = this.primus.contentUpdates.personalities.subscribe(data => this.setPersonalities(data));
    this.primus.requestAchievements();
    this.primus.requestPersonalities();
  }

  ngOnDestroy() {
    this.achievementSubscription.unsubscribe();
    this.personalitySubscription.unsubscribe();
  }
}