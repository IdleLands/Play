
import _ from 'lodash';

export class ItemService {
  static getSpecialStatString(item) {
    const newItem = _.omit(item, [
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
    ]);

    return _(newItem)
      .keys()
      .map(key => `${key}(${newItem[key]})`)
      .join(' ');
  }
}