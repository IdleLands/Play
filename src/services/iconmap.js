
import _ from 'lodash';

const StatIcons = {
  str: 'strong',
  dex: 'crosshair-arrow',
  int: 'book-cover-2',
  agi: 'run',
  con: 'heart-organ',
  luk: 'clover-2',
  hp: 'nested-hearts',
  mp: 'drop',
  gold: 'cash'
};

const AdventureLogIcons = {
  Meta: 'abstract-010',
  Explore: 'world',
  Levelup: 'beams-aura',
  Achievement: 'ribbon-medal',
  Combat: 'crossed-swords',
  Pet: 'dove',
  Guild: 'backup',
  Towncrier: '',
  Item: 'battle-gear',
  Gold: 'profit',
  Profession: 'body-swapping',
  Xp: 'gift-of-knowledge'
};

export const AllIcons = _.extend(StatIcons, AdventureLogIcons);