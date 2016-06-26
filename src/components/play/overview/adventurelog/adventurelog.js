
import { Component } from '@angular/core';
import template from './adventurelog.html';
import './adventurelog.less';

@Component({
  template,
  selector: 'adventurelog',
  inputs: ['adventureLog']
})
export class AdventureLogComponent {
  constructor() {}
}