
import { Component, Input } from '@angular/core';
import 'gameicons-font/dist/game-icons.css';

@Component({
  selector: 'game-icon',
  template: `<i class="game-icon game-icon-{{ icon }}"></i>`
})
export class GameIconComponent {

  @Input() public icon: string;
}