
import { Component } from '@angular/core';
import template from './playercard.html';
import './playercard.less';

import { SweetAlertService } from 'ng2-sweetalert2';
import { StorageService } from 'ng2-storage';
import { PrimusWrapper } from '../../../../services/primus';

@Component({
  template,
  selector: 'playercard',
  inputs: ['player', 'party', 'pet']
})
export class PlayerCardComponent {

  static get parameters() {
    return [[PrimusWrapper], [StorageService], [SweetAlertService]];
  }

  constructor(primus, storage, swal) {
    this.primus = primus;
    this.storage = storage.local;
    this.swal = swal;
  }

  ascend() {
    this.swal.confirm({
      customClass: this.storage.theme,
      title: 'Do you want to ascend?',
      text: 'This will reset your collectibles, gold, level, equipment, and personality selections. Unbought pets will be lost. It will also increase your max level and the speed at which you gain levels. Certain Ascension levels carry permanent bonuses, as well.',
      type: 'warning',
      showCancelButton: true
    }).then(res => {
      if(!res) return;
      this.primus.ascend();
    });
  }
}