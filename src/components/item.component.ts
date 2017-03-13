
import * as _ from 'lodash';

import { Component, Input, OnInit } from '@angular/core';
import { ViewController, NavParams, PopoverController } from 'ionic-angular';

import { ItemInfo, Theme } from '../services';
import { Item } from '../models';

@Component({
  selector: 'item',
  template: `
    <ion-row margin-bottom>
      <ion-col width-20 text-center no-padding>
        <div class="class-{{ item.itemClass }}">{{ item.type }}</div>
        <button ion-button icon-only outline color="primary" small *ngIf="buttons && buttons.length > 0 && item.name !== 'nothing'" (click)="openItemPopover($event)">
          <ion-icon name="more"></ion-icon>
        </button>
      </ion-col>
      
      <ion-col no-padding>
        <ion-row no-padding>
          <ion-col no-padding padding-left>
            <strong>
              <span *ngIf="item.enchantLevel > 0">+{{ item.enchantLevel }}</span>
              <span>{{ item.name }}</span>
            </strong>
            <ion-note>
              <span *ngIf="item.foundAt">Found {{ item.foundAt | date:'medium' }}; </span>Score: {{ item._calcScore | number }} ({{ scoreRating(item) | number }}%)
            </ion-note>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col *ngFor="let stat of stats" padding-left col-6 col-sm-4 col-md-2>
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

  constructor(
    public popCtrl: PopoverController,
    public theme: Theme
  ) {}

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

  public openItemPopover($event) {
    this.popCtrl
      .create(ItemPopover, { buttons: this.buttons, item: this.item }, { cssClass: this.theme.currentTheme })
      .present({ ev: $event });
  }
}

@Component({
  template: `
    <ion-list>
      <button ion-item *ngFor="let button of buttons" (click)="doCallback(button)">
        <ion-label>{{ button.name }}</ion-label>
      </button>
    </ion-list>
  `
})
export class ItemPopover implements OnInit {

  buttons: any[] = [];
  item: Item;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {}

  doCallback(button) {
    button.callback(this.item);
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    this.buttons = this.navParams.get('buttons');
    this.item = this.navParams.get('item');
  }
}