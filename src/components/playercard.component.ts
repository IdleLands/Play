
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../services';

import { Player } from '../models';

@Component({
  selector: 'player-card',
  styles: [`
    :host round-progress {
      position: absolute;
      left: 1rem;
      top: 4rem;
    }
  `],
  template: `
  <ion-grid>
    <ion-row>
      <ion-col width-20 class="true-center">
        <round-progress class="xp-circle" [radius]="25" [stroke]="5" [current]="player._xp.__current" [max]="player._xp.maximum"></round-progress>
        <gendervatar [gender]="player.gender"></gendervatar>
      </ion-col>
     
      <ion-col width-80>
        <div>
          <h1>{{ player.nameEdit || player.name }}</h1>
          <h2 *ngIf="player.title">The {{ player.title }}</h2>
        </div>
        <div>
          <h3>The level {{ player._level.__current }}/{{ player._level.maximum }} {{ player.professionName }}</h3>
        </div>
        <div>
          <h3><game-icon icon="symbol-explore"></game-icon> {{ player.map }}: {{ player.mapRegion }}</h3>
        </div>
        <div>
          <h3><game-icon icon="stat-gold"></game-icon> {{ player.gold | number }} Gold</h3>
        </div>
        <div>
          <h3><game-icon icon="symbol-item"></game-icon> {{ player.statCache.itemFindRange | number }} Max Item Score</h3>
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

  currentXp(): number {
    return ~~(this.player._xp.__current / this.player._xp.maximum);
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