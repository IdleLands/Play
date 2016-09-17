

import { ElementRef, Directive } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutoFocus {

  static get parameters() {
    return [[ElementRef]];
  }

  constructor(elementRef) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}
