
import { Component } from '@angular/core';
import template from './choicelog.html';
import './choicelog.less';

import { SweetAlertService } from 'ng2-sweetalert2';

import { PrimusWrapper } from '../../../../services/primus';

@Component({
  template,
  selector: 'choicelog',
  inputs: ['player']
})
export class ChoiceLogComponent {
  static get parameters() {
    return [[PrimusWrapper], [SweetAlertService]];
  }

  constructor(primus, swal) {
    this.primus = primus;
    this.swal = swal;
  }

  makeChoice(id, choice) {
    this.primus.makeChoice(id, choice);
  }

  showMoreInfo(choice) {
    const choiceItem = choice.extraData.item;
    const player = this.primus._contentUpdates.player.getValue();
    const playerItem = player.equipment[choiceItem.type];

    const html = `
<div class="col-md-12 no-padding text-md-center">
  <h4>Type: ${playerItem.type}</h4>
</div>
<div class="col-md-12 no-padding text-md-center m-b-1">
  <strong>${playerItem.name}</strong> (Score: ${playerItem._calcScore}, ${Math.round(playerItem._calcScore/playerItem._baseScore*100)}%)
</div>
<div class="col-md-12 no-padding m-b-1">
  <div class="col-md-2">${playerItem.str}</div>
  <div class="col-md-2">${playerItem.con}</div>
  <div class="col-md-2">${playerItem.dex}</div>
  <div class="col-md-2">${playerItem.agi}</div>
  <div class="col-md-2">${playerItem.int}</div>
  <div class="col-md-2">${playerItem.luk}</div>
</div>
<div class="col-md-12 no-padding m-b-1">
  <div class="col-md-2">STR</div>
  <div class="col-md-2">CON</div>
  <div class="col-md-2">DEX</div>
  <div class="col-md-2">AGI</div>
  <div class="col-md-2">INT</div>
  <div class="col-md-2">LUK</div>
</div>
<div class="col-md-12 no-padding m-b-1">
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
</div>
<div class="col-md-12 no-padding text-md-center m-b-1">
  <strong>${choiceItem.name}</strong> (Score: ${choiceItem._calcScore}, 100%)
</div>
<div class="col-md-12 no-padding m-b-1">
  <div class="col-md-2 ${playerItem.str > choiceItem.str ? 'negative' : 'positive'}-stat">${choiceItem.str}</div>
  <div class="col-md-2 ${playerItem.con > choiceItem.con ? 'negative' : 'positive'}-stat">${choiceItem.con}</div>
  <div class="col-md-2 ${playerItem.dex > choiceItem.dex ? 'negative' : 'positive'}-stat">${choiceItem.dex}</div>
  <div class="col-md-2 ${playerItem.agi > choiceItem.agi ? 'negative' : 'positive'}-stat">${choiceItem.agi}</div>
  <div class="col-md-2 ${playerItem.int > choiceItem.int ? 'negative' : 'positive'}-stat">${choiceItem.int}</div>
  <div class="col-md-2 ${playerItem.luk > choiceItem.luk ? 'negative' : 'positive'}-stat">${choiceItem.luk}</div>
</div>
`;

    this.swal.swal({
      title: 'New Item Information',
      html
    });
  }
}