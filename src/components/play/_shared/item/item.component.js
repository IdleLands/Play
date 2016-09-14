
import _ from 'lodash';

import { Component } from '@angular/core';

import { ItemService } from '../../../../services/item';

import template from './item.html';
import './item.less';

@Component({
  selector: 'item',
  inputs: ['item', 'buttons'],
  template
})
export class ItemComponent {

  constructor() {
    this.stats = ['str', 'con', 'dex', 'agi', 'int', 'luk'];
  }

  extraItemStats(item) {
    return ItemService.getSpecialStatString(item);
  }

  scoreRating(item) {
    const base = Math.round(item._calcScore/item._baseScore*100);
    return _.isNaN(base) ? 100 : base;
  }
}