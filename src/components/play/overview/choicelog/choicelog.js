
import { Component } from '@angular/core';
import template from './choicelog.html';
import './choicelog.less';

import { PrimusWrapper } from '../../../../services/primus';

@Component({
  template,
  selector: 'choicelog',
  inputs: ['player']
})
export class ChoiceLogComponent {
  static get parameters() {
    return [[PrimusWrapper]];
  }

  constructor(primus) {
    this.primus = primus;
  }

  makeChoice(id, choice) {
    this.primus.makeChoice(id, choice);
  }
}