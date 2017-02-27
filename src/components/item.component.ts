
import * as _ from 'lodash';

import { Component, Input, OnInit } from '@angular/core';

import { ItemInfo } from '../services';
import { Item } from '../models';

@Component({
  selector: 'item',
  template: `
    <ion-row margin-bottom>
      <ion-col width-20 text-center no-padding>
        <div class="class-{{ item.itemClass }}">{{ item.type }}</div>
      </ion-col>
      
      <ion-col no-padding>
        <ion-row no-padding>
          <ion-col no-padding padding-left>
            <strong>
              <span *ngIf="item.enchantLevel > 0">+{{ item.enchantLevel }}</span>
              <span>{{ item.name }}</span>
            </strong>
            <ion-note>
              Found {{ item.foundAt | date:'medium' }}; Score: {{ item._calcScore | number }} ({{ scoreRating(item) | number }}%)
            </ion-note>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col *ngFor="let stat of stats" padding-left>
            <stat [stat]="stat" [value]="item[stat]" showColor="true"></stat>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col padding-left>
            {{ extraStats(item) }}
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>
  `
})
export class ItemComponent implements OnInit {

  public stats = [];

  @Input() public item: Item;
  @Input() public buttons: Array<{ icon: string, callback: Function }>;

  ngOnInit() {
    this.stats = ItemInfo.statOrder;
  }

  public scoreRating(item: Item) {
    const base = Math.round(item._calcScore / item._baseScore * 100);
    return _.isNaN(base) ? 100 : base;
  }

  public extraStats(item: Item) {
    return ItemInfo.getSpecialStatString(item);
  }
}