import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { RedditNewsComponent } from './reddit-news.component';
import { GameIconComponent } from './gameicon.component';
import { AdventureLogIconComponent } from './advlogicon.component';
import { StatComponent } from './stat.component';
import { ItemComponent } from './item.component';
import { AchievementIconComponent } from './achievementicon.component';
import { GendervatarComponent } from './gendervatar.component';
import { AscensionLevelComponent } from './ascensionlevel.component';

import { AchievementModal } from '../pages/achievements/achievements';

import { GMCommandsPopover } from '../pages/chat/chat';

import { PersonalityPopover } from '../pages/map/map';

import { ItemCompareModal } from '../services';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RedditNewsComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    RedditNewsComponent
  ]
})
export class ComponentsModule {}

@NgModule({
  declarations: [
    GameIconComponent,
    StatComponent,
    AdventureLogIconComponent,
    ItemComponent,
    GendervatarComponent,
    AscensionLevelComponent,
    AchievementIconComponent,

    ItemCompareModal,
    AchievementModal,
    GMCommandsPopover,
    PersonalityPopover
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  entryComponents: [
    ItemCompareModal,
    AchievementModal,
    GMCommandsPopover,
    PersonalityPopover
  ],
  exports: [
    IonicModule,
    CommonModule,
    GameIconComponent,
    StatComponent,
    AdventureLogIconComponent,
    ItemComponent,
    GendervatarComponent,
    AscensionLevelComponent,
    AchievementIconComponent
  ]
})
export class GlobalComponentsModule {}