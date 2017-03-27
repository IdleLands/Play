
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ascension-level',
  styles:[`
    :host .ascension-container {
      position: relative;
      width: 32px;
      margin-right: 10px;
      margin-left: 10px;
    }
    
    :host .ascension-level {
      font-size: 60%;
      text-align: center;
    }
    
    :host .ascension-level, :host .ascension-container ion-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  `],
  template: `
    <span class="ascension-container" *ngIf="level > 0">
      <ion-icon name="qr-scanner"></ion-icon>
      <span class="ascension-level">{{ level }}</span>
    </span>
  `
})
export class AscensionLevelComponent {

  @Input() public level: number;

  constructor() {}
}