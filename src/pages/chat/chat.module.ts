import { NgModule } from '@angular/core';
import { ChatPage } from './chat';
import { IonicPageModule } from 'ionic-angular';

import { MomentModule } from 'angular2-moment';
import { GlobalComponentsModule } from '../../components/components.module';
import { ChatWindowComponent, CurrentChannelPipe, LinkifyPipe } from './chatwindow.component';

@NgModule({
  declarations: [ChatPage, ChatWindowComponent, CurrentChannelPipe, LinkifyPipe],
  imports: [MomentModule, GlobalComponentsModule, IonicPageModule.forChild(ChatPage)],
})
export class ChatPageModule {}