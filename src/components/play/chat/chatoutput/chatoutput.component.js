
import { Component, ElementRef } from '@angular/core';
import template from './chatoutput.html';
import './chatoutput.less';

@Component({
  template,
  selector: 'chatoutput',
  inputs: ['messages']
})
export class ChatOutputComponent {
  static get parameters() {
    return [[ElementRef]];
  }
  constructor(elementRef) {
    this.elementRef = elementRef;
  }

  scrollToBottom() {
    this.elementRef.nativeElement.parentElement.scrollTop = this.elementRef.nativeElement.parentElement.scrollHeight + 100;
    this.showScrollButton = false;
  }

  atBottomish() {
    return this.elementRef.nativeElement.parentElement.scrollTop > this.elementRef.nativeElement.parentElement.scrollHeight - 500;
  }

  ngOnInit() {
    this.subscription = this.messages.subscribe(data => {
      const atBottom = this.atBottomish();
      this.allMessages = data;
      if(atBottom) setTimeout(() => this.scrollToBottom());
      else         this.showScrollButton = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}