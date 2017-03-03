
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ascension-level',
  styles:[`
    :host .ascension-container {
      position: relative;
    }
    
    :host .ascension-level {
      position: absolute;
      left: 0;
      height: 100%;
      width: 1.25rem;
      margin: 3px 0 3px 0;
      font-size: 60%;
      text-align: center;
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