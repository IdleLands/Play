
import { Component, Input } from '@angular/core';

@Component({
  selector: 'statistics-tree',
  styles: [`
    :host ul {
      list-style-type: none;
    }
    
    :host ul:not(.is-first) {
      margin-left: -20px;
    }
    
    :host ul.is-first {
      padding-left: 0;
    }
  `],
  template: `
    <ul [class.is-first]="isFirst">
      <li *ngFor="let node of treeData">
        <strong>{{ node.name }}</strong> {{ node.val | number }}
        <statistics-tree [treeData]="node.children"></statistics-tree>
      </li>
    </ul>
  `
})
export class StatisticsTreeComponent {
  @Input() public treeData: any = [];
  @Input() public isFirst: boolean;
}