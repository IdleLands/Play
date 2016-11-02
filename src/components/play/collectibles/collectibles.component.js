
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
    this.collectibles = _.sortBy(_.values(collectibleData), 'name');
  }

  ngOnInit() {
    this.collectibleSubscription = this.primus.contentUpdates.collectibles.subscribe(data => this.setCollectibles(data));
    this.primus.requestCollectibles();
  }

  ngOnDestroy() {
    this.collectibleSubscription.unsubscribe();
  }
}