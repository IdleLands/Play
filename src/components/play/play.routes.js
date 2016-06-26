
import { AuthGuard } from '../../services/auth';

import { CreateComponent } from './create/create.component';
import { OverviewComponent } from './overview/overview.component';
import { MapComponent } from './map/map.component';

export const routes = [
  { path: 'create',   canActivate: [AuthGuard], component: CreateComponent },
  { path: 'overview', canActivate: [AuthGuard], component: OverviewComponent },
  { path: 'map',      canActivate: [AuthGuard], component: MapComponent }
];