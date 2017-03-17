
import { BehaviorSubject, ReplaySubject } from 'rxjs';

import {
  Achievement,
  AdventureLog,
  Battle,
  ChatMessage,
  ChatUser,
  Collectibles,
  Equipment,
  Festival,
  GMData,
  Party,
  Player,
  Personalities,
  PetActive,
  PetBasic,
  PetBuy,
  Premium,
  Statistics
} from '../models';

type OnlineStatus = 'online' | 'offline' | 'connecting';

export class AppState {
  onlineStatus:   BehaviorSubject<OnlineStatus> = new BehaviorSubject<OnlineStatus>('offline');
  loggedIn:       BehaviorSubject<boolean> = new BehaviorSubject(undefined);
  hasCharacter:   BehaviorSubject<boolean> = new BehaviorSubject(undefined);
  showSideMenu:   BehaviorSubject<boolean> = new BehaviorSubject(false);
  activePageData: BehaviorSubject<{ page, data }> = new BehaviorSubject({ page: '', data: '' });
  chatUsers:      BehaviorSubject<ChatUser[]> = new BehaviorSubject([]);
  chatMessages:   ReplaySubject<ChatMessage> = new ReplaySubject<ChatMessage>(200);
  _chatLength:    BehaviorSubject<number> = new BehaviorSubject(0);
  adventureLog:   ReplaySubject<AdventureLog> = new ReplaySubject<AdventureLog>(50);

  player:         BehaviorSubject<Player> = new BehaviorSubject(new Player());
  statistics:     BehaviorSubject<Statistics> = new BehaviorSubject(new Statistics());
  achievements:   BehaviorSubject<Achievement[]> = new BehaviorSubject([]);
  collectibles:   BehaviorSubject<Collectibles> = new BehaviorSubject(new Collectibles());
  equipment:      BehaviorSubject<Equipment> = new BehaviorSubject(new Equipment());
  personalities:  BehaviorSubject<Personalities> = new BehaviorSubject(new Personalities());
  party:          BehaviorSubject<Party> = new BehaviorSubject(new Party());
  gmdata:         BehaviorSubject<GMData> = new BehaviorSubject(new GMData());
  battle:         BehaviorSubject<Battle> = new BehaviorSubject(new Battle());
  petbasic:       BehaviorSubject<PetBasic[]> = new BehaviorSubject([]);
  petbuy:         BehaviorSubject<PetBuy> = new BehaviorSubject(new PetBuy());
  petactive:      BehaviorSubject<PetActive> = new BehaviorSubject(new PetActive());
  festivals:      BehaviorSubject<Festival[]> = new BehaviorSubject([]);
  genders:        BehaviorSubject<string[]> = new BehaviorSubject([]);
  premium:        BehaviorSubject<Premium> = new BehaviorSubject(new Premium());

  reset() {
    this.onlineStatus.next('offline');
    this.loggedIn.next(undefined);
    this.hasCharacter.next(undefined);
    this.showSideMenu.next(false);
    this.chatUsers.next([]);

    this.player.next(new Player());
    this.statistics.next(new Statistics());
    this.achievements.next([]);
    this.collectibles.next(new Collectibles());
    this.equipment.next(new Equipment());
    this.personalities.next(new Personalities());
    this.party.next(new Party());
    this.gmdata.next(new GMData());
    this.petbasic.next([]);
    this.petbuy.next(new PetBuy());
    this.petactive.next(new PetActive());
    this.genders.next([]);
    this.premium.next(new Premium());
  }
}