
import { Component } from '@angular/core';
import template from './playercard.html';
import './playercard.less';

@Component({
  template,
  selector: 'playercard',
  inputs: ['player']
})
export class PlayerCardComponent {
  constructor() {}
}