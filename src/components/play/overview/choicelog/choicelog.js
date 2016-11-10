
import { Component } from '@angular/core';
import template from './choicelog.html';
import './choicelog.less';

import { PrimusWrapper } from '../../../../services/primus';
import { ItemCompareService } from '../../../../services/itemcompare';

@Component({
  template,
  selector: 'choicelog',
  providers: [ItemCompareService],
  inputs: ['player']
})
export class ChoiceLogComponent {
  static get parameters() {
    return [[PrimusWrapper], [ItemCompareService]];
  }

  constructor(primus, icomp) {
    this.primus = primus;
    this.icomp = icomp;
  }

  makeChoice(id, choice) {
    this.primus.makeChoice(id, choice);

    if(choice === 'Yes') {
      this.primus.requestEquipment();
    }
  }

  showMoreInfo(choice) {
    const choiceItem = choice.extraData.item;
    const equipment = this.primus._contentUpdates.equipment.getValue();
    const playerItem = equipment[choiceItem.type] || { str: 0, dex: 0, con: 0, int: 0, agi: 0, luk: 0, _baseScore: 1, _calcScore: 1 };
    this.icomp.compare(choiceItem, playerItem);
  }
}