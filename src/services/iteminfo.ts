import _ from 'lodash';

const baseIgnores = [
  'piety',
  'enchantLevel',
  'uid',
  'score',
  '_calcScore',
  '_baseScore',
  'name',
  'id',
  'itemClass',
  'type',
  'foundAt',
  'str',
  'dex',
  'con',
  'int',
  'agi',
  'luk'
];

export class ItemInfo {
  static get statOrder() {
    return ['str', 'con', 'dex', 'agi', 'int', 'luk'];
  }

  static getSpecialStatString(item) {
    const newItem = _.omitBy(item, (val, key) => {
      return _.includes(baseIgnores, key) || _.includes(key, 'Percent') || _.includes(key, 'item') || !_.isNumber(val) || key === 'vector';
    });

    return _(newItem)
      .keys()
      .map(key => `${key}(${newItem[key]})`)
      .join(' ');
  }
}