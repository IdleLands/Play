import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Statistics } from '../../models';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsPage extends PlayComponent implements OnInit, OnDestroy {

  statistics$: any;
  statistics: Statistics;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.statistics$ = this.appState.statistics.subscribe(data => {
      this.setStatistics(data);
    });

    this.primus.requestStatistics();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.statistics$.unsubscribe();
  }

  setStatistics(data: Statistics) {
    let value = 0;

    const recurse = (obj) => {
      return _.map(obj, (val, key) => {
        const baseObj: any = {};

        baseObj.name = key;

        if(_.isObject(val)) {
          baseObj.children = recurse(val);
        } else {
          value += val;
          baseObj.val = val;
        }

        return baseObj;
      });
    };

    const sortAll = (data) => {
      _.each(data, obj => {
        if(!obj.children) return;

        obj.children = sortAll(obj.children);
      });

      return _.sortBy(data, 'name');
    };

    this.statistics = _.reject(sortAll(recurse(data)), item => item.val);
    this.updatePageData(`Total Statistics: ${value.toLocaleString()}`);
  }

}
