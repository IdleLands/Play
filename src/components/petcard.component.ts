
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../services';

import { PetActive } from '../models';

@Component({
  selector: 'pet-card',
  styles: [`
    :host round-progress {
      position: absolute;
      left: 1rem;
      top: 3.5rem;
    }
  `],
  template: `
  <ion-grid>
    <ion-row>
      <ion-col width-20 class="true-center">
        <round-progress class="xp-circle" [radius]="25" [stroke]="5" [current]="pet._xp.__current" [max]="pet._xp.maximum"></round-progress>
        <gendervatar [gender]="pet.gender"></gendervatar>
      </ion-col>
     
      <ion-col width-80>
        <div>
          <h1>{{ pet.name }}</h1>
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
          <h3><game-icon icon="symbol-item"></game-icon> {{ pet.inventory.length }}/{{ pet.$scale.inventory[pet.scaleLevel.inventory] }} Items</h3>
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

  ngOnInit() {
    this.pet$ = this.appState.petactive.subscribe(pet => {
      this.pet = pet;
    });
  }

  ngOnDestroy() {
    this.pet$.unsubscribe();
  }
}