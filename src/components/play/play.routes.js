
import { AuthGuard } from '../../services/auth';

import { CreateComponent } from './create/create.component';
import { OverviewComponent } from './overview/overview.component';
import { MapComponent } from './map/map.component';
import { ChatComponent } from './chat/chat.component';
import { SettingsComponent } from './settings/settings.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { CollectiblesComponent } from './collectibles/collectibles.component';
import { CombatComponent } from './combat/combat.component';
import { PetsComponent } from './pets/pets.component';

export const routes = [
  { path: 'create',       canActivate: [AuthGuard], component: CreateComponent },
  { path: 'overview',     canActivate: [AuthGuard], component: OverviewComponent },
  { path: 'map',          canActivate: [AuthGuard], component: MapComponent },
  { path: 'chat',         canActivate: [AuthGuard], component: ChatComponent },
  { path: 'equipment',    canActivate: [AuthGuard], component: EquipmentComponent },
  { path: 'statistics',   canActivate: [AuthGuard], component: StatisticsComponent },
  { path: 'achievements', canActivate: [AuthGuard], component: AchievementsComponent },
  { path: 'collectibles', canActivate: [AuthGuard], component: CollectiblesComponent },
  { path: 'settings',     canActivate: [AuthGuard], component: SettingsComponent },
  { path: 'combat',       canActivate: [AuthGuard], component: CombatComponent },
  { path: 'pets',         canActivate: [AuthGuard], component: PetsComponent }
];