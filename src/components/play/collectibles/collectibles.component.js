
import _ from 'lodash';

import { PrimusWrapper } from '../../../services/primus';

import { Component } from '@angular/core';
import template from './collectibles.html';
import './collectibles.less';

@Component({
  template
})
export class CollectiblesComponent {

  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
  }

  setCollectibles(collectibleData) {
    this.collectibles = _.values(collectibleData);
  }

  ngOnInit() {
    this.collectibleSubscription = this.primus.contentUpdates.collectibles.subscribe(data => this.setCollectibles(data));
  }

  ngOnDestroy() {
    this.collectibleSubscription.unsubscribe();
  }
}