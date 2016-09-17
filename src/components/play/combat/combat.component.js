
import _ from 'lodash';

import { PrimusWrapper } from '../../../services/primus';
import { HighlightPipe } from '../../../pipes/highlight';

import { ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';
import template from './combat.html';
import './combat.less';

import Clipboard from 'clipboard';

@Component({
  template,
  pipes: [HighlightPipe]
})
export class CombatComponent {

  static get parameters() {
    return [[ActivatedRoute], [PrimusWrapper]];
  }

  constructor(route, primus) {
    this.route = route;
    this.primus = primus;
  }

  setBattle(data) {
    this.battle = data;

    if(_.includes(window.location.href, 'opencombat')) {
      setTimeout(() => {
        this.primus._forceKill = true;
        this.primus.socket.end();
      }, 1000);
    }
  }

  openCombatRouteLink() {
    return window.location.href.split('combat').join('opencombat');
  }

  ngOnInit() {

    const clipboard = new Clipboard('.copy');
    clipboard.on('success', () => {
      this.primus.handleNotification({ type: 'success', notify: 'Copied url to clipboard!', title: 'Copy Success' });
    });

    this.battleSubscription = this.primus.contentUpdates.battle.subscribe(data => this.setBattle(data));

    this.paramSub = this.route.params.subscribe(params => {
      this.battleName = params.name;
      this.primus.loadBattle(this.battleName);
      this.playerName = this.primus.playerName;
    });

  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
    this.battleSubscription.unsubscribe();
  }
}