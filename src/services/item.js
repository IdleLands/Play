
import _ from 'lodash';

const baseIgnores = [
  'piety',
  'enchantLevel',
  'uid',
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

export class ItemService {
  static getSpecialStatString(item) {
    const newItem = _.omitBy(item, (val, key) => {
      return _.includes(baseIgnores, key) || _.includes(key, 'Percent') || _.includes(key, 'item');
    });

    return _(newItem)
      .keys()
      .map(key => `${key}(${newItem[key]})`)
      .join(' ');
  }
}