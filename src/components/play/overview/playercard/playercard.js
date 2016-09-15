
import { Component } from '@angular/core';
import template from './playercard.html';
import './playercard.less';

@Component({
  template,
  selector: 'playercard',
  inputs: ['player', 'party', 'pet']
})
export class PlayerCardComponent {
  constructor() {}
}