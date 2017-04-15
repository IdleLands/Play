import { NgModule } from '@angular/core';
import { MapPage } from './map';
import { MapRendererComponent } from './map-renderer.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [MapPage, MapRendererComponent],
  imports: [IonicPageModule.forChild(MapPage)],
})
export class MapPageModule {}