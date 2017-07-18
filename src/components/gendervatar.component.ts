
import { Component, Input } from '@angular/core';
import { AppState, settings } from '../services';

const genderPositions = {
  blue:                   { x: 2,   y: 1 },
  male:                   { x: 3,   y: 1 },
  female:                 { x: 4,   y: 1 },
  glowcloud:              { x: 8,   y: 6 },
  'not a bear':           { x: 0,   y: 8 },
  'astronomical entity':  { x: 1,   y: 8 },
  'boss monster':         { x: 7,   y: 2 },

  'Fighter-blue':         { x: 7,   y: 7 },
  'Fighter-red':          { x: 8,   y: 7 },
  'Fighter-green':        { x: 0,   y: 8 },
  'Fighter-gold':         { x: 1,   y: 8 },

  'Mage-blue':            { x: 2,   y: 8 },
  'Mage-red':             { x: 3,   y: 8 },
  'Mage-green':           { x: 4,   y: 8 },
  'Mage-gold':            { x: 5,   y: 8 },

  'Cleric-blue':          { x: 6,   y: 8 },
  'Cleric-red':           { x: 7,   y: 8 },
  'Cleric-green':         { x: 8,   y: 8 },
  'Cleric-gold':          { x: 0,   y: 9 },

  'Jester-blue':          { x: 1,   y: 9 },
  'Jester-red':           { x: 2,   y: 9 },
  'Jester-green':         { x: 3,   y: 9 },
  'Jester-gold':          { x: 4,   y: 9 },

  'Rogue-blue':           { x: 5,   y: 9 },
  'Rogue-red':            { x: 6,   y: 9 },
  'Rogue-green':          { x: 7,   y: 9 },
  'Rogue-gold':           { x: 8,   y: 9 },

  'Generalist-blue':      { x: 0,   y: 10 },
  'Generalist-red':       { x: 1,   y: 10 },
  'Generalist-green':     { x: 2,   y: 10 },
  'Generalist-gold':      { x: 3,   y: 10 },

  'Archer-blue':          { x: 4,   y: 10 },
  'Archer-red':           { x: 5,   y: 10 },
  'Archer-green':         { x: 6,   y: 10 },
  'Archer-gold':          { x: 7,   y: 10 },

  'Pirate-blue':          { x: 8,   y: 11 },
  'Pirate-red':           { x: 0,   y: 11 },
  'Pirate-green':         { x: 1,   y: 11 },
  'Pirate-gold':          { x: 2,   y: 11 },

  'Monster-blue':         { x: 3,   y: 11 },
  'Monster-red':          { x: 4,   y: 11 },
  'Monster-green':        { x: 5,   y: 11 },
  'Monster-gold':         { x: 6,   y: 11 },

  'MagicalMonster-blue':  { x: 7,   y: 11 },
  'MagicalMonster-red':   { x: 8,   y: 11 },
  'MagicalMonster-green': { x: 0,   y: 12 },
  'MagicalMonster-gold':  { x: 1,   y: 12 },

  'Barbarian-blue':       { x: 2,   y: 12 },
  'Barbarian-red':        { x: 3,   y: 12 },
  'Barbarian-green':      { x: 4,   y: 12 },
  'Barbarian-gold':       { x: 5,   y: 12 },

  'Bard-blue':            { x: 6,   y: 12 },
  'Bard-red':             { x: 7,   y: 12 },
  'Bard-green':           { x: 8,   y: 12 },
  'Bard-gold':            { x: 0,   y: 13 },

  'SandwichArtist-blue':  { x: 1,   y: 13 },
  'SandwichArtist-red':   { x: 2,   y: 13 },
  'SandwichArtist-green': { x: 3,   y: 13 },
  'SandwichArtist-gold':  { x: 4,   y: 13 },

  'Necromancer-blue':     { x: 5,   y: 13 },
  'Necromancer-red':      { x: 6,   y: 13 },
  'Necromancer-green':    { x: 7,   y: 13 },
  'Necromancer-gold':     { x: 8,   y: 13 },

  'Bitomancer-blue':      { x: 0,   y: 14 },
  'Bitomancer-red':       { x: 1,   y: 14 },
  'Bitomancer-green':     { x: 2,   y: 14 },
  'Bitomancer-gold':      { x: 3,   y: 14 }

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
    <img [src]="baseUrl" [style.object-position]="imgStyleFit()" [style.transform]="scaleStyle()">
  `
})
export class GendervatarComponent {

  @Input() public gender: string;
  @Input() public scale: number = 2;

  constructor(public appState: AppState) {}

  get baseUrl() {
    return `${settings.protocol}://${settings.hostname}:${settings.port}/maps/img/tiles.png`;
  }

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