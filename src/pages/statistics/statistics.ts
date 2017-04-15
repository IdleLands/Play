import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Statistics } from '../../models';

@IonicPage({
  segment: 'statistics'
})
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsPage extends PlayComponent implements OnInit, OnDestroy {

  statistics$: any;
  statistics: Statistics;

  private ignoreRecurseKeys = ['BossKills', 'Maps', 'Regions'];

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
    const BossKills = _.get(data, 'Character.BossKills', {});
    const Maps = _.get(data, 'Character.Maps', {});
    const Regions = _.get(data, 'Character.Regions', {});

    (<any>data).BossKills = BossKills;
    (<any>data).Maps = Maps;
    (<any>data).Regions = Regions;

    const recurse = (obj, isRoot = false) => {
      return _.map(obj, (val, key) => {
        const baseObj: any = {};

        if(!isRoot && _.includes(this.ignoreRecurseKeys, key)) return {};

        baseObj.name = key;

        if(_.isObject(val)) {
          baseObj.children = recurse(val);
        } else {
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

    this.statistics = _.reduce(_.reject(sortAll(recurse(data, true)), item => item.val), (prev, item) => {
      prev[item.name] = item;
      return prev;
    }, {});
  }

}
