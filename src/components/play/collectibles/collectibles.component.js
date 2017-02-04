
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

  setCollectibles({ current, prior }) {
    this.collectibles = _(current)
      .sortBy('name')
      .each(coll => coll.count = 1);

    _.each(_.sortBy(_.values(prior), 'name'), coll => {
      const prev = _.find(this.collectibles, { name: coll.name });
      if(prev) {
        prev.count += coll.count;

      } else {
        this.collectibles.push(coll);
        coll.faded = true;

      }
    });

    this.totalCurrentCollectibles = _.size(current);
    this.totalCollectibleCount = _.sumBy(this.collectibles, 'count');
  }

  ngOnInit() {
    this.collectibleSubscription = this.primus.contentUpdates.collectibles.subscribe(data => this.setCollectibles(data));
    this.primus.requestCollectibles();
  }

  ngOnDestroy() {
    this.collectibleSubscription.unsubscribe();
  }
}