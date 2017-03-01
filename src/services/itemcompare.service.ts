
import { Injectable, Component, OnInit } from '@angular/core';
import { ModalController, ViewController, NavParams } from 'ionic-angular';

import { ItemInfo } from './';

@Component({
  template: `
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      Item Compare ({{ newItem.type }})
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <ion-icon name="close"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-grid text-center>
    
    <ion-row margin-bottom>
      <ion-col>
        <strong>{{ currentItemName }} (Score: {{ currentItem._calcScore }} [base {{ currentItem._baseScore }}], {{ itemPercent(currentItem) }}%)</strong>
      </ion-col>
    </ion-row>
    
    <ion-row>
      <ion-col *ngFor="let stat of stats">
        {{ currentItem[stat] | number }}
      </ion-col>
    </ion-row>
    
    <ion-row>
      <ion-col *ngFor="let stat of stats">
        {{ stat.toUpperCase() }}
      </ion-col>
    </ion-row>
    
    <ion-row margin-bottom>
      <ion-col>{{ itemStatString(currentItem) }}</ion-col>  
    </ion-row>
    
    <ion-row margin-bottom>
      <ion-col *ngFor="let stat of stats">
        &darr;
      </ion-col>
    </ion-row>
    
    <ion-row margin-bottom>
      <ion-col>
        <strong [class.positive]="newItem._calcScore > currentItem._calcScore"
                [class.negative]="newItem._calcScore < currentItem._calcScore">{{ newItemName }} (Score: {{ newItem._calcScore }}, 100%)</strong>
      </ion-col>
    </ion-row>
    
    <ion-row>
      <ion-col *ngFor="let stat of stats">
        <span [class.positive]="newItem[stat] > currentItem[stat]" [class.negative]="newItem[stat] < currentItem[stat]">{{ newItem[stat] | number }}</span>
      </ion-col>
    </ion-row>
    
    <ion-row>
      <ion-col *ngFor="let stat of stats">
        <span [class.positive]="newItem[stat] > currentItem[stat]" [class.negative]="newItem[stat] < currentItem[stat]">{{ stat.toUpperCase() }}</span>
      </ion-col>
    </ion-row>
    
    <ion-row>
      <ion-col>{{ itemStatString(newItem) }}</ion-col>  
    </ion-row>
    
    <ion-row>
      <ion-col *ngFor="let button of buttons"><button ion-button (click)="dismiss(button)" [color]="button.color">{{ button.text }}</button></ion-col>
    </ion-row>
    
  </ion-grid>
</ion-content>
`
})
export class ItemCompareModal implements OnInit {

  public stats = [];

  public currentItem: any;
  public newItem: any;
  public buttons: any[];

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {}

  dismiss(button) {
    this.viewCtrl.dismiss(button);
  }

  ngOnInit() {
    this.stats = ItemInfo.statOrder;

    this.currentItem = this.navParams.get('currentItem');
    this.newItem = this.navParams.get('newItem');
    this.buttons = this.navParams.get('buttons');
  }

  itemStatString(item): string {
    return ItemInfo.getSpecialStatString(item);
  }

  itemPercent(item): number {
    return Math.round(item._calcScore / item._baseScore * 100);
  }

  get currentItemName(): string {
    return this.currentItem.enchantLevel > 0 ? `+${this.currentItem.enchantLevel} ${this.currentItem.name}` : this.currentItem.name;
  }

  get newItemName(): string {
    return this.newItem.enchantLevel > 0 ? `+${this.newItem.enchantLevel} ${this.newItem.name}` : this.newItem.name;
  }
}

@Injectable()
export class ItemCompare {

  constructor(public modalCtrl: ModalController) {}

  compare(currentItem, newItem, buttons): Promise<any> {
    return new Promise(resolve => {
      const icmp = this.modalCtrl.create(ItemCompareModal, { currentItem, newItem, buttons });

      icmp.onDidDismiss(button => {
        resolve(button);
      });

      icmp.present();
    });
  }
}