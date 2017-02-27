
export class RestrictedNumber {
  __current: number = 1;
  maximum: number = 100;
  minimum: number = 0;
}

export class Choice {
  id: string;
  message: string;
  extraData: any;
  choices: string[];
}

export class Player {
  name: string = '???';
  nameEdit: string;

  title: string;

  professionName: string = '???';
  gender: string = 'unknown';
  isMod: boolean;

  joinDate: number;
  gold: number = 0;
  ascensionLevel: number;
  mapPath: string;
  map: string = 'Norkos';
  region: string = 'Wilderness';

  _hp: RestrictedNumber = new RestrictedNumber();
  _mp: RestrictedNumber = new RestrictedNumber();
  _xp: RestrictedNumber = new RestrictedNumber();
  _level: RestrictedNumber = new RestrictedNumber();

  _premiumTier: number;
  _choiceLimit: number;

  statCache: any = { str: 0, con: 0, dex: 0, agi: 0, int: 0, luk: 0, itemFindRange: 0, hp: 0, mp: 0 };

  choices: Choice[] = [];
}