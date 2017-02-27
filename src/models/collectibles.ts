
export class Collectible {
  name: string;
  count: number;
  storyline: string;
  map: string;
  region: string;
  description: string;
  rarity: string;

  _faded: boolean;
}

export class Collectibles {
  current: Collectible[] = [];
  prior: any = {};
}