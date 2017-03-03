
import { Component, Input } from '@angular/core';
import { AppState } from '../services';


const genderPositions = {
  blue:                   { x: 2,   y: 1 },
  male:                   { x: 3,   y: 1 },
  female:                 { x: 4,   y: 1 },
  glowcloud:              { x: 8,   y: 6 },
  'not a bear':           { x: 0,   y: 8 },
  'astronomical entity':  { x: 1,   y: 8 },
  'boss monster':         { x: 7,   y: 2 }
};

@Component({
  selector: 'gendervatar',
  styles:[`
    :host img {
      width: 16px;
      height: 15px;
      object-fit: none;
      transform: scale(2, 2);
    }
  `],
  template: `
    <img src="http://game.idle.land/maps/img/tiles.png" [style.object-position]="imgStyleFit()" [style.transform]="scaleStyle()">
  `
})
export class GendervatarComponent {

  @Input() public gender: string;
  @Input() public scale: number = 2;

  constructor(public appState: AppState) {}

  get genderPositions() {
    return genderPositions;
  }

  scaleStyle(): string {
    return `scale(${this.scale}, ${this.scale})`
  }

  imgStyleFit(): string {
    const pos = genderPositions[this.gender] || { x: 5, y: 1 };
    return `-${pos.x*16}px -${(pos.y*16)+1}px`;
  }
}