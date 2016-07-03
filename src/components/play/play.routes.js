
import { AuthGuard } from '../../services/auth';

import { CreateComponent } from './create/create.component';
import { OverviewComponent } from './overview/overview.component';
import { MapComponent } from './map/map.component';
import { ChatComponent } from './chat/chat.component';
import { SettingsComponent } from './settings/settings.component';
import { EquipmentComponent } from './equipment/equipment.component';

export const routes = [
  { path: 'create',   canActivate: [AuthGuard], component: CreateComponent },
  { path: 'overview', canActivate: [AuthGuard], component: OverviewComponent },
  { path: 'map',      canActivate: [AuthGuard], component: MapComponent },
  { path: 'chat',     canActivate: [AuthGuard], component: ChatComponent },
  { path: 'equipment',canActivate: [AuthGuard], component: EquipmentComponent },
  { path: 'settings', canActivate: [AuthGuard], component: SettingsComponent }
];