
export class AchievementReward {
  type: string;
}

export type AchievementType =
  'Progress' | 'Explore' | 'Combat' | 'Special' | 'Event';

export class Achievement {
  tier: number;
  desc: string;
  name: string;
  rewards: AchievementReward[];
  type: AchievementType;
}