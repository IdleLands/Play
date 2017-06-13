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
      return _.includes(baseIgnores, key) || _.includes(key, 'Percent') || _.includes(key, 'item') || !_.isNumber(val) || key === 'vector' || _.includes(key, 'Req');
    });
    return _(newItem)
      .keys()
      .filter(key => newItem[key] !== 0)
      .map(key => `${key}(${newItem[key]})`)
      .join(' ');
  }

  static getItemRequirementsString(item) {
    const newItem = _.pickBy(item, (val, key) => {
      return _.includes(key, 'Req') && val > 0;
    });
    return _(newItem)
      .map(ItemInfo.parseRequirement)
      .join('\n');
  }

  private static parseRequirement(val, req) {
    if (req.startsWith('a')) {
      return 'Achievement Required:  ' + _(req).trimStart().replace('aReq', '').replace(/_/g, ' ') + ((val > 1) ? ' tier ' + val : '');
    }
    else if (req.startsWith('c')) {
      return `Collectible Required:  ${_(req).trimStart().replace('cReq', '').replace(/_/g, ' ')} (x${val})`;
    }
    else if (req.startsWith('s')) {
      return 'Statistic Required:  ' + _(req).trimStart().replace('sReq', '').split('*').join('.').replace(/_/g, ' ') + ' (' + val + ')';
    }
  }
}