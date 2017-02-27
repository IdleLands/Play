
const AchievementIcons = {
  Progress: 'symbol-progress',
  Explore: 'symbol-explore',
  Combat: 'symbol-combat',
  Special: 'symbol-special',
  Event: 'symbol-event',
  Pet: 'symbol-pet'
};

import { Component, Input } from '@angular/core';

@Component({
  selector: 'achievement-icon',
  template: `<game-icon [icon]="realIcon"></game-icon>`
})
export class AchievementIconComponent {

  @Input() public icon: string;

  get realIcon() {
    return AchievementIcons[this.icon];
  }
}