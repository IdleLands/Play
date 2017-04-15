import { NgModule } from '@angular/core';
import { PremiumPage } from './premium';
import { MomentModule } from 'angular2-moment';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [PremiumPage],
  imports: [MomentModule, IonicPageModule.forChild(PremiumPage)],
})
export class PremiumPageModule {}