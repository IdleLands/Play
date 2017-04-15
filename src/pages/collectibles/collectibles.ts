import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { Collectible, Collectibles } from '../../models';

@IonicPage({
  segment: 'collectibles'
})
@Component({
  selector: 'page-collectibles',
  templateUrl: 'collectibles.html'
})
export class CollectiblesPage extends PlayComponent implements OnInit, OnDestroy {

  public collectibles$: any;
  public collectibles: Collectible[] = [];

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.collectibles$ = this.appState.collectibles.subscribe(data => {
      this.parseCollectibleData(data);
    });

    this.primus.requestCollectibles();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.collectibles$.unsubscribe();
  }

  parseCollectibleData(data: Collectibles) {
    const { current, prior } = data;

    this.collectibles = _(current)
      .sortBy('name')
      .each(coll => coll.count = 1);

    _(prior)
      .values()
      .sortBy('name')
      .each(coll => {
        const prev = _.find(this.collectibles, { name: coll.name });
        if(prev) {
          prev.count += coll.count;
        } else {
          this.collectibles.push(coll);
          coll._faded = true;
        }
      });

    const sum = _.sumBy(this.collectibles, 'count');

    let string = `Current Collectibles: ${current.length}`;
    if(current.length !== this.collectibles.length) {
      string += `<br>Total Collectibles: ${this.collectibles.length}<br>Collectible Sum: ${sum}`;
    }
    this.updatePageData(string);
  }

}
