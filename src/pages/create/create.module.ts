import { NgModule } from '@angular/core';
import { CreatePage } from './create';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [CreatePage],
  imports: [IonicPageModule.forChild(CreatePage)],
})
export class CreatePageModule {}