
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ascension-level',
  styles:[`
    :host .ascension-container {
      position: relative;
      width: 32px;
      
      margin-left: 10px;
      margin-right: 14px;
    }
    
    :host .ascension-level {
      font-size: 60%;
      text-align: center;
      width: 18px;
    }
    
    :host .ascension-level {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      
      border-width: 2px;
      border-style: dotted;
    }
  `],
  template: `
    <span class="ascension-container" *ngIf="level > 0">
      <span class="ascension-level">{{ level }}</span>
    </span>
  `
})
export class AscensionLevelComponent {

  @Input() public level: number;

  constructor() {}
}