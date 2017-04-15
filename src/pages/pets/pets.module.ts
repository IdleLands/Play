import { NgModule } from '@angular/core';
import { PetsPage } from './pets';
import { GlobalComponentsModule } from '../../components/components.module';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [PetsPage],
  imports: [GlobalComponentsModule, IonicPageModule.forChild(PetsPage)]
})
export class PetsPageModule {}