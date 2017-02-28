
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../services';

import { PetActive } from '../models';

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
  selector: 'pet-card',
  styles: [`
    :host round-progress {
      position: absolute;
    }
    
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
        <round-progress class="xp-circle" [radius]="25" [stroke]="5" [current]="pet._xp.__current" [max]="pet._xp.maximum"></round-progress>
        <img src="http://game.idle.land/maps/img/tiles.png" [style.object-position]="imgStyleFit()">
      </ion-col>
     
      <ion-col width-80>
        <div>
          <h1>{{ pet.name }}</h1>
          <h2 *ngIf="pet.attr">With {{ pet.attr }}</h2>
        </div>
        <div>
          <h3>The level {{ pet._level.__current }}/{{ pet._level.maximum }} {{ pet.professionName }} {{ pet.$petId }}</h3>
        </div>
        <div *ngIf="pet.nextItemFind">
          <h3><game-icon icon="symbol-special"></game-icon> Next item find {{ pet.nextItemFind | amTimeAgo }}</h3>
        </div>
        <div>
          <h3><game-icon icon="stat-gold"></game-icon> {{ pet.gold.__current | number }}/{{ pet.gold.maximum | number }} Gold</h3>
        </div>
        <div>
          <h3><game-icon icon="symbol-item"></game-icon> {{ pet.statCache.itemFindRange | number }} Max Item Score</h3>
        </div>
      </ion-col>
    </ion-row> 
  </ion-grid>
  `
})
export class PetCardComponent implements OnInit, OnDestroy {

  private pet$: any;
  public pet: PetActive = new PetActive();

  constructor(public appState: AppState) {}

  currentXp(): number {
    return ~~(this.pet._xp.__current / this.pet._xp.maximum);
  }

  imgStyleFit(): string {
    const pos = genderPositions[this.pet.gender] || { x: 5, y: 1 };
    return `-${pos.x*16}px -${pos.y*16}px`;
  }

  ngOnInit() {
    this.pet$ = this.appState.petactive.subscribe(pet => {
      this.pet = pet;
    });
  }

  ngOnDestroy() {
    this.pet$.unsubscribe();
  }
}