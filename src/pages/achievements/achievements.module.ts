import { NgModule } from '@angular/core';
import { AchievementsPage } from './achievements';
import { GlobalComponentsModule } from '../../components/components.module';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [AchievementsPage],
  imports: [GlobalComponentsModule, IonicPageModule.forChild(AchievementsPage)],
})
export class AchievementsPageModule {}