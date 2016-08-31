

import { Directive, ElementRef, EventEmitter, Renderer } from '@angular/core';

@Directive({
  selector: '[draggable]',
  inputs: ['x', 'y'],
  outputs: ['mouseup', 'mousedown', 'mousemove'],
  host: {
    '(dragstart)': 'onDragStart($event)',
    '(dragend)': 'onDragEnd($event)',
    '(drag)': 'onDrag($event)'
  }
})
export class Draggable {

  static get parameters() {
    return [[ElementRef], [Renderer]];
  }

  constructor(elementRef, renderer) {
    this.elementRef = elementRef;
    this.renderer = renderer;

    this.mouseup = new EventEmitter();
    this.mousedown = new EventEmitter();
    this.mousemove = new EventEmitter();
  }

  onDragStart($event) {
    this.mousedown.next($event);

    this.Δx = event.x - this.elementRef.nativeElement.offsetLeft;
    this.Δy = event.y - this.elementRef.nativeElement.offsetTop;
  }

  onDrag($event) {
    const { x, y } = $event;
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'top', (y - this.Δy) + 'px');
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'left', (x - this.Δx) + 'px');
    this.setPos(x - this.Δx, y - this.Δy);

    this.mousemove.next($event);
  }

  onDragEnd($event) {
    const { x, y } = this._lastPos;
    this.setPos(x, y);

    this.Δx = 0;
    this.Δy = 0;

    this.mouseup.next({ $event, pos: this._lastPos });
  }

  setPos(x, y) {
    if(x < 0) x = 0;
    if(y < 54) y = 54;
    if(x !== 0 && y !== 54) {
      this._lastPos = { x, y };
    }
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'top', `${y}px`);
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'left', `${x}px`);
  }

  ngOnInit() {
    this.elementRef.nativeElement.draggable = true;
    this.elementRef.nativeElement.style.cursor = 'pointer';
    this.setPos(this.x, this.y);
  }
}
