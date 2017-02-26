
export class RestrictedNumber {
  __current: number;
  maximum: number;
  minimum: number;
}

export class Choice {
  id: string;
  message: string;
  extraData: any;
  choices: string[];
}

export class Player {
  name: string;
  nameEdit: string;

  title: string;

  professionName: string;
  gender: string;
  isMod: boolean;

  joinDate: number;
  gold: number = 0;
  ascensionLevel: number;
  mapPath: string;
  map: string;
  region: string;

  _hp: RestrictedNumber = new RestrictedNumber();
  _mp: RestrictedNumber = new RestrictedNumber();
  _xp: RestrictedNumber = new RestrictedNumber();
  _level: RestrictedNumber = new RestrictedNumber();

  _premiumTier: number;
  _choiceLimit: number;

  statCache: any = {};

  choices: Choice[] = [];
}