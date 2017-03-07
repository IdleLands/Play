
export type AdventureLogCategory =
  'Meta' | 'Explore' | 'Levelup' | 'Achievement' | 'Combat' | 'Pet' |
  'Party' | 'Guild' | 'Towncrier' | 'Item' | 'Gold' | 'Profession' | 'Xp'

export class AdventureLog {
  timestamp: number;
  text: string;
  category: AdventureLogCategory;
  extraData?: any;
  targets: string[];
}