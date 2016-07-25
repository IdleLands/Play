
import _ from 'lodash';

const StatIcons = {
  str: 'stat-str',
  dex: 'stat-dex',
  int: 'stat-int',
  agi: 'stat-agi',
  con: 'stat-con',
  luk: 'stat-luk',
  hp:  'stat-hp',
  mp:  'stat-mp',
  gold: 'stat-gold'
};

const AdventureLogIcons = {
  Meta: 'symbol-meta',
  Explore: 'symbol-explore',
  Levelup: 'symbol-levelup',
  Achievement: 'symbol-achievement',
  Combat: 'symbol-combat',
  Pet: 'symbol-pet',
  Party: 'symbol-party',
  Guild: 'symbol-guild',
  Towncrier: 'symbol-towncrier',
  Item: 'symbol-item',
  Gold: 'symbol-gold',
  Profession: 'symbol-profession',
  Xp: 'symbol-xp'
};

const AchievementIcons = {
  Progress: 'symbol-progress',
  Explore: 'symbol-explore',
  Combat: 'symbol-combat',
  Special: 'symbol-special',
  Event: 'symbol-event'
};

export const AllIcons = _.extend(StatIcons, AdventureLogIcons, AchievementIcons);