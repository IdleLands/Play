
import { Component, Input } from '@angular/core';

@Component({
  selector: 'stat',
  styles: [`
    :host .invisible {
      font-size: 0;
      color: rgba(0, 0, 0, 0);
    }
  `],
  template: `
    <span [class.positive]="showColor && value > 0" [class.negative]="showColor && value < 0">
      <game-icon [icon]="'stat-'+stat"></game-icon><span class="invisible">{{ stat.toUpperCase() }}</span> {{ value | number }}
    </span>
  `
})
export class StatComponent {
  @Input() public stat: string;
  @Input() public value: number;
  @Input() public showColor: boolean;
  @Input() public showValue: boolean = true;
}