
import { Component } from '@angular/core';

@Component({
  selector: 'ascension-level',
  inputs: ['lvl'],
  template: `
    <span class="ascension-container" tooltipPlacement="right" [tooltip]="'Ascension #' + lvl">
      <i fa [icon]="'square-o'"></i> 
      <span class="lvl">{{ lvl }}</span>
    </span>
  `,
  styles: [`
    .ascension-container { position: relative; }
    .ascension-container .lvl { 
      position: absolute; 
      left: 0; 
      padding: 3px 0 3px 0; 
      width: 100%; 
      height: 100%; 
      font-size: 60%; 
      text-align: center;
    }
  `]
})
export class AscensionLevelComponent {
}