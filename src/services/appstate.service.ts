
import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { Player } from '../models';

type OnlineStatus = 'online' | 'offline' | 'connecting';

export class AppState {
  onlineStatus:   BehaviorSubject<OnlineStatus> = new BehaviorSubject<OnlineStatus>('offline');
  loggedIn:       BehaviorSubject<boolean> = new BehaviorSubject(false);
  player:         BehaviorSubject<Player> = new BehaviorSubject(new Player());
  chatMessages:   ReplaySubject<any> = new ReplaySubject(200);

  reset() {
    this.onlineStatus.next('offline');
    this.loggedIn.next(false);
  }
}