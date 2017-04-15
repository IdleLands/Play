import { NgModule } from '@angular/core';
import { EquipmentPage } from './equipment';
import { GlobalComponentsModule } from '../../components/components.module';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [EquipmentPage],
  imports: [GlobalComponentsModule, IonicPageModule.forChild(EquipmentPage)],
})
export class EquipmentPageModule {}