
import _ from 'lodash';

import { Component } from '@angular/core';
import { PrimusWrapper } from '../../../services/primus';

import { StatisticsTree } from './statistics.tree.component';
import template from './statistics.html';
import './statistics.less';

@Component({
  directives: [StatisticsTree],
  template
})
export class StatisticsComponent {
  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
    this.statistics = [];
  }

  setStatistics(data) {

    const recurse = (obj) => {
      return _.map(obj, (val, key) => {
        const baseObject = {};

        baseObject.name = key;

        if(_.isObject(val)) {
          baseObject.children = recurse(val);
        } else {
          baseObject.val = val;
        }

        return baseObject;
      });
    };

    const sortAll = (data) => {
      _.each(data, obj => {
        if(obj.children) obj.children = sortAll(obj.children);
      });
      return _.sortBy(data, 'name');
    };

    this.statistics = sortAll(recurse(data));
  }

  ngOnInit() {
    this.statSubscription = this.primus.contentUpdates.statistics.subscribe(data => this.setStatistics(data));
    this.primus.requestStatistics();
  }

  ngOnDestroy() {
    this.statSubscription.unsubscribe();
  }
}