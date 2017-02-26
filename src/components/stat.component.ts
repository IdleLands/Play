
import { Component, Input } from '@angular/core';

@Component({
  selector: 'stat',
  styles: [`
    :host .invisible {
      font-size: 0;
      color: rgba(0, 0, 0, 0);
    }
  `],
  template: `<game-icon [icon]="'stat-'+stat"></game-icon><span class="invisible">{{ stat }}</span> {{ value | number }}`
})
export class StatComponent {

  @Input() public stat: string;
  @Input() public value: number;
}