import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { BattlePage, HighlightPipe } from './battle';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [BattlePage, HighlightPipe],
  imports: [MomentModule, IonicPageModule.forChild(BattlePage)]
})
export class BattlePageModule {}