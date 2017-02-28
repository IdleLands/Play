
import { RestrictedNumber, Item } from './';

export class PetBuy {

}

export class PetActive {
  name: string = '';

  attr: string;
  $petId: string = '';

  nextItemFind: number;

  professionName: string = '???';
  gender: string = 'unknown';

  smart: any;

  equipment: any;
  inventory: Item[];

  $scale: any;
  $scaleCost: any;
  scaleLevel: any;

  _hp: RestrictedNumber = new RestrictedNumber();
  _mp: RestrictedNumber = new RestrictedNumber();
  _xp: RestrictedNumber = new RestrictedNumber();
  _level: RestrictedNumber = new RestrictedNumber();
  gold: RestrictedNumber = new RestrictedNumber();

  statCache: any = { str: 0, con: 0, dex: 0, agi: 0, int: 0, luk: 0, itemFindRange: 0, hp: 0, mp: 0 };
}

export class PetBasic {
  name: string;
  bought: boolean;

  petName: string;
  level: number;
  profession: string;
}