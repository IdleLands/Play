
import _ from 'lodash';

import { Component } from '@angular/core';
import template from './play.html';
import { PlayBarComponent } from './playbar/playbar.component';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { StorageService } from 'ng2-storage';

import { PrimusWrapper } from '../../services/primus';

@Component({
  directives: [PlayBarComponent, ROUTER_DIRECTIVES],
  template
})
export class PlayComponent {
  static get parameters() {
    return [[PrimusWrapper], [Router], [StorageService]];
  }

  constructor(socketCluster, router, storage) {
    this.sc = socketCluster;
    this.router = router;
    this.storage = storage.local;

    this.needsCreate = !this.sc.doesUserExistForThisId;
  }

  ngOnInit() {
    this.subscription = this.sc.hasRealUser.subscribe(res => {
      this.needsCreate = !res;
      if(this.needsCreate) return;

      this.sc.registerPlayer({ userId: this.storage.profile.user_id, token: this.storage.idToken }, () => {
        if(_.includes(window.location.href, '/play/(')) return;
        this.router.navigate(['/play/overview']);
      });
    });

    this.sc.checkIfExists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}