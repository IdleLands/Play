
const AdventureLogIcons = {
  Meta: 'symbol-meta',
  Explore: 'symbol-explore',
  Levelup: 'symbol-levelup',
  Achievement: 'symbol-achievement',
  Combat: 'symbol-combat',
  Pet: 'symbol-pet',
  Party: 'symbol-party',
  Guild: 'symbol-guild',
  Towncrier: 'symbol-towncrier',
  Item: 'symbol-item',
  Gold: 'symbol-gold',
  Profession: 'symbol-profession',
  Xp: 'symbol-xp'
};

import { Component, Input } from '@angular/core';

@Component({
  selector: 'advlog-icon',
  template: `<game-icon [icon]="realIcon"></game-icon>`
})
export class AdventureLogIconComponent {

  @Input() public icon: string;

  get realIcon() {
    return AdventureLogIcons[this.icon];
  }
}