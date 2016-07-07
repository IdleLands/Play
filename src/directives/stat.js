
import { Component } from '@angular/core';
import { AllIcons } from '../services/iconmap';

@Component({
  selector: 'stat',
  inputs: ['name', 'size'],
  template: `
  <span class="icon-{{size}}">
    <i gi [icon]="iconMap[name]" [tooltip]="name"></i>
  </span>
  `
})
export class StatComponent {
  constructor() {
    this.iconMap = AllIcons;
  }
}
