import { NgModule } from '@angular/core';
import { ConnectPage } from './connect';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ConnectPage],
  imports: [ComponentsModule, IonicPageModule.forChild(ConnectPage)],
})
export class ConnectPageModule {}