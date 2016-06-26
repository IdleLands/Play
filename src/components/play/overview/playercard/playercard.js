
import { Component } from '@angular/core';
import template from './playercard.html';

@Component({
  template,
  selector: 'playercard',
  inputs: ['player']
})
export class PlayerCardComponent {
  constructor() {}
}