import { NgModule } from '@angular/core';
import { CollectiblesPage } from './collectibles';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [CollectiblesPage],
  imports: [IonicPageModule.forChild(CollectiblesPage)],
})
export class CollectiblesPageModule {}