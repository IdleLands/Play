
// import _ from 'lodash';

import { PrimusWrapper } from '../../../services/primus';

import { ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';
import template from './combat.html';
import './combat.less';

@Component({
  template
})
export class CombatComponent {

  static get parameters() {
    return [[ActivatedRoute], [PrimusWrapper]];
  }

  constructor(route, primus) {
    this.route = route;
    this.primus = primus;
  }

  ngOnInit() {
    this.battleSubscription = this.primus.contentUpdates.battle.subscribe(data => this.battle = data);

    this.paramSub = this.route.params.subscribe(params => {
      this.battleName = params.name;
      this.primus.loadBattle(this.battleName);
    });

  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
    this.battleSubscription.unsubscribe();
  }
}