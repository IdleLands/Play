import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { GlobalComponentsModule } from '../../components/components.module';
import { OverviewPage } from './overview';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [OverviewPage],
  imports: [GlobalComponentsModule, MomentModule, IonicPageModule.forChild(OverviewPage)]
})
export class OverviewPageModule {}