import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [HomePage],
  imports: [ComponentsModule, IonicPageModule.forChild(HomePage)],
})
export class HomePageModule {}