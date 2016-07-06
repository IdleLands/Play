
import { Component, forwardRef } from '@angular/core';

@Component({
  selector: 'statistics-tree',
  directives: [forwardRef(() => StatisticsTree)],
  inputs: ['treeData'],
  template: `
  <ul>
    <li *ngFor="let node of treeData">
      <strong>{{node.name}}</strong> {{node.val}}
      <statistics-tree [treeData]="node.children"></statistics-tree>
    </li>
  </ul>
  `
})
export class StatisticsTree {}