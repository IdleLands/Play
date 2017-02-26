
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../services';

import { Player } from '../models';

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
  selector: 'player-card',
  styles: [`
    :host [img-container] {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :host img {
      width: 16px;
      height: 16px;
      object-fit: none;
      transform: scale(2, 2);
    }
  `],
  template: `
  <ion-grid>
    <ion-row>
      <ion-col width-20 img-container>
        <img src="http://game.idle.land/maps/img/tiles.png" [style.object-position]="imgStyleFit()">
      </ion-col>
     
      <ion-col>
        <div>
          <h1>{{ player.name }}</h1>
          <h2 *ngIf="player.title">The {{ player.title }}</h2>
        </div>
        <div>
          <h3>The {{ player.gender }} level {{ player._level.__current }}/{{ player._level.maximum }} {{ player.professionName }}</h3>
        </div>
        <div>
          <h3><stat stat="gold" [value]="player.gold"></stat> Gold</h3>
        </div>
      </ion-col>
    </ion-row> 
  </ion-grid>
  `
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  private player$: any;
  public player: Player;

  constructor(public appState: AppState) {}

  imgStyleFit() {
    const pos = genderPositions[this.player.gender] || { x: 0, y: 0 };
    console.log(this.player.gender);
    return `-${pos.x*16}px -${pos.y*16}px`;
  }

  ngOnInit() {
    this.player$ = this.appState.player.subscribe(player => {
      this.player = player;
    });
  }

  ngOnDestroy() {
    this.player$.unsubscribe();
  }
}