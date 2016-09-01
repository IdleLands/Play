import { Pipe } from '@angular/core';

@Pipe({ name: 'highlightPipe' })
export class HighlightPipe {

  transform(text, filter) {

    if(filter) {
      text = text.replace(new RegExp('('+filter+')', 'gi'), '<span class="highlighted">$1</span>');
    }

    return text;
  }
}
