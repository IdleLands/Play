// import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage extends PlayComponent implements OnInit, OnDestroy {

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController
  ) {
    super(appState, primus, navCtrl);
  }

}
