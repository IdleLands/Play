import { NgModule } from '@angular/core';
import { StatisticsPage } from './statistics';
import { StatisticsTreeComponent } from './statistics-tree.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [StatisticsPage, StatisticsTreeComponent],
  imports: [IonicPageModule.forChild(StatisticsPage)],
})
export class SettingsPageModule {}