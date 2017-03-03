
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';

@Injectable()
export class Theme {
  constructor(
    private storage: LocalStorageService
  ) {}

  get currentTheme(): string {
    return `theme-${this.storage.retrieve('theme') || 'default'}`;
  }
}