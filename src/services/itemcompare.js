import { Injectable } from '@angular/core';

import _ from 'lodash';

import { StorageService } from 'ng2-storage';
import { SweetAlertService } from 'ng2-sweetalert2';
import { ItemService } from './item';

@Injectable()
export class ItemCompareService {

  static get parameters() {
    return [[SweetAlertService], [StorageService]];
  }

  constructor(swal, storage) {
    this.swal = swal;
    this.storage = storage.local;
  }

  compare(currentItem, newItem, swalOpts = {}) {
    const choiceItemName = currentItem.enchantLevel > 0 ? `+${currentItem.enchantLevel} ${currentItem.name}` : currentItem.name;
    const playerItemName = newItem.enchantLevel > 0 ? `+${newItem.enchantLevel} ${newItem.name}` : newItem.name;

    const html = `
<div class="col-md-12 no-padding text-md-center">
  <h4>Type: ${currentItem.type}</h4>
</div>
<div class="col-md-12 no-padding text-md-center mb-1">
  <strong>${playerItemName}</strong> (Score: ${newItem._calcScore} [base ${newItem._baseScore}], ${Math.round(newItem._calcScore/newItem._baseScore*100)}%)
</div>
<div class="col-md-12 no-padding mb-1">
  <div class="col-md-2">${newItem.str}</div>
  <div class="col-md-2">${newItem.con}</div>
  <div class="col-md-2">${newItem.dex}</div>
  <div class="col-md-2">${newItem.agi}</div>
  <div class="col-md-2">${newItem.int}</div>
  <div class="col-md-2">${newItem.luk}</div>
</div>
<div class="col-md-12 no-padding mb-1">
  <div class="col-md-2">STR</div>
  <div class="col-md-2">CON</div>
  <div class="col-md-2">DEX</div>
  <div class="col-md-2">AGI</div>
  <div class="col-md-2">INT</div>
  <div class="col-md-2">LUK</div>
</div>
<div class="col-md-12 no-padding text-md-center mb-1">
  ${ItemService.getSpecialStatString(newItem)}
</div>
<div class="col-md-12 no-padding mb-1">
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
  <div class="col-md-2">&darr;</div>
</div>
<div class="col-md-12 no-padding text-md-center mb-1">
  <strong>${choiceItemName}</strong> (Score: ${currentItem._calcScore}, 100%)
</div>
<div class="col-md-12 no-padding mb-1">
  <div class="col-md-2">${currentItem.str} <span class="${newItem.str > currentItem.str ? 'negative' : 'positive'}-stat">(${newItem.str > currentItem.str ? '' : '+'}${currentItem.str - newItem.str})</span></div>
  <div class="col-md-2">${currentItem.con} <span class="${newItem.con > currentItem.con ? 'negative' : 'positive'}-stat">(${newItem.con > currentItem.con ? '' : '+'}${currentItem.con - newItem.con})</span></div>
  <div class="col-md-2">${currentItem.dex} <span class="${newItem.dex > currentItem.dex ? 'negative' : 'positive'}-stat">(${newItem.dex > currentItem.dex ? '' : '+'}${currentItem.dex - newItem.dex})</span></div>
  <div class="col-md-2">${currentItem.agi} <span class="${newItem.agi > currentItem.agi ? 'negative' : 'positive'}-stat">(${newItem.agi > currentItem.agi ? '' : '+'}${currentItem.agi - newItem.agi})</span></div>
  <div class="col-md-2">${currentItem.int} <span class="${newItem.int > currentItem.int ? 'negative' : 'positive'}-stat">(${newItem.int > currentItem.int ? '' : '+'}${currentItem.int - newItem.int})</span></div>
  <div class="col-md-2">${currentItem.luk} <span class="${newItem.luk > currentItem.luk ? 'negative' : 'positive'}-stat">(${newItem.luk > currentItem.luk ? '' : '+'}${currentItem.luk - newItem.luk})</span></div>
</div>
<div class="col-md-12 no-padding text-md-center mb-1">
  ${ItemService.getSpecialStatString(currentItem)}
</div>
`;

    const baseOpts = {
      title: 'Item Information',
      customClass: this.storage.theme,
      html
    };

    this.swal.swal(_.extend(baseOpts, swalOpts));
  }
}