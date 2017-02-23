
import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { Player } from '../models';

export class AppState {
  loggedIn:       BehaviorSubject<boolean> = new BehaviorSubject(false);
  player:         BehaviorSubject<Player> = new BehaviorSubject(new Player());
  chatMessages:   ReplaySubject<any> = new ReplaySubject(200);
}