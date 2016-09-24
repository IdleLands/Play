
import _ from 'lodash';

import { PrimusWrapper } from '../../../services/primus';

import { SweetAlertService } from 'ng2-sweetalert2';

import { ItemComponent } from '../_shared/item/item.component';

import { Component } from '@angular/core';
import template from './pets.html';
import './pets.less';

@Component({
  directives: [ItemComponent],
  template
})
export class PetsComponent {

  static get parameters() {
    return [[PrimusWrapper], [SweetAlertService]];
  }

  constructor(primus, swal) {
    this.primus = primus;
    this.swal = swal;
  }

  ngOnInit() {
    this.petbasicSubscription = this.primus.contentUpdates.petbasic.subscribe(data => this.petbasic = data);
    this.petbuySubscription = this.primus.contentUpdates.petbuy.subscribe(data => this.petbuy = data);
    this.petactiveSubscription = this.primus.contentUpdates.petactive.subscribe(data => this.setActivePet(data));
    this.playerSubscription = this.primus.contentUpdates.player.subscribe(data => this.player = data);
    this.statSubscription = this.primus.contentUpdates.statistics.subscribe(data => this.setStatistics(data));
    this.achievementSubscription = this.primus.contentUpdates.achievements.subscribe(data => this.parsePetAttrs(data));

    this.primus.requestAchievements();
    this.primus.requestPets();
    this.primus.requestStatistics();

    this.validPetAttributes = [
      'a top hat',
      'a monocle',
      'a fedora',
      'a bag of chips',
      'a giant keychain',
      'a rubber duck',
      'a glowing leek',
      'a YBox controller',
      'a Gandum minifig',
      'a pocket watch',
      'a cumberbund',
      'a funky tie',
      'a doily',
      'a polka-dot pillowcase',
      'a giant stack of sticky notes',
      'a miniature replica of the worlds biggest roller-coaster',
      'a spork with a knife on the other side',
      'a shiny medallion',
      'a used drinking straw',
      'a popping filter',
      'a giant rock used to stop doors dead in their tracks',
      'a tab formerly attached to a Dosa Can'
    ];

    this.formattedStats = [
      { name: 'Combat Aid Chance', stat: 'battleJoinPercent',       tooltip: (val) => `Battle join chance is ${val}%` },
      { name: 'Gold Storage',      stat: 'goldStorage',             tooltip: (val) => `Gold storage is ${val}` },
      { name: 'Inventory Size',    stat: 'inventory',               tooltip: (val) => `Inventory size is ${val}` },
      { name: 'Item Quality Bonus',stat: 'itemFindBonus',           tooltip: (val) => `Bonus to item quality is +${val}` },
      { name: 'Item Find Time',    stat: 'itemFindTimeDuration',    tooltip: (val) => `New item every ${val}s` },
      { name: 'Item Equip Bonus',  stat: 'itemFindRangeMultiplier', tooltip: (val) => `Bonus to item equip is ${val*100}%` },
      { name: 'Item Sell Bonus',   stat: 'itemSellMultiplier',      tooltip: (val) => `Bonus to item sell value is ${(val*100).toFixed(0)}%` },
      { name: 'Max Item Score',    stat: 'maxItemScore',            tooltip: (val) => `Max equippable item score bonus is +${val}` },
      { name: 'Max Level',         stat: 'maxLevel',                tooltip: (val) => `Max level is ${val}` },
      { name: 'XP / Gold',         stat: 'xpPerGold',               tooltip: (val) => `${val} xp gained per gold eaten` }
    ];

    this.equippedItemButtons = [
      { tooltip: 'Unequip Item', name: 'Gold', callback: (item) => this.primus.unequipItemFromPet(item.id) }
    ];

    this.inventoryButtons = [
      { tooltip: 'Sell Item', name: 'gold', callback: (item) => this.primus.sellItemFromPet(item.id) },
      { tooltip: 'Equip Item (Pet)', name: 'Item', callback: (item) => this.primus.equipItemOnPet(item.id) },
      { tooltip: 'Equip Item (Player)', name: 'Profession', callback: (item) => this.primus.giveItemToPlayer(item.id) }
    ];
  }

  ngOnDestroy() {
    this.petbasicSubscription.unsubscribe();
    this.petbuySubscription.unsubscribe();
    this.petactiveSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
    this.statSubscription.unsubscribe();
    this.achievementSubscription.unsubscribe();
  }

  setActivePet(data) {
    this.petactive = data;
    this.equipment = _.flatten(_.values(data.equipment));
  }

  parsePetAttrs(achievementData) {
    this.validPetAttrs = _(achievementData)
      .values()
      .map(achi => achi.rewards)
      .flattenDeep()
      .filter(reward => reward.type === 'petattr')
      .map(reward => reward.petattr)
      .value().concat(this.validPetAttributes);
  }

  setStatistics(data) {
    this.validClasses = _.uniq(['Monster'].concat(_.keys(_.get(data, 'Character.Professions', {}))));
  }

  buyPet(petType) {
    this.swal.swal({
      title: `Name your new pet ${petType}`,
      input: 'text',
      inputValidator: (value) => {
        return new Promise((resolve, reject) => {
          if(!value || !value.trim() || value.length > 20) reject('Invalid name. Must be <20 chars.');
          resolve();
        });
      }
    }).then(val => {
      this.primus.buyPet(petType, val);
    });
  }

  swapPet(petType) {
    this.primus.swapPet(petType);
  }

  toggleSmart(smart) {
    this.primus.togglePetSmart(smart);
  }

  changePetClass($event) {
    const newClass = $event.target.value;
    this.primus.changePetClass(newClass);
  }

  changePetAttr($event) {
    const newAttr = $event.target.value;
    this.primus.changePetAttr(newAttr);
  }

  upgradePetAttr(attr) {
    this.primus.upgradePetAttr(attr);
  }

  feed() {
    const neededXp = this.petactive._xp.maximum - this.petactive._xp.__current;
    const totalGold = this.player.gold;
    const xpPerGold = this.petactive.$scale.xpPerGold[this.petactive.scaleLevel.xpPerGold];

    const maxGold = Math.min(Math.ceil(neededXp / xpPerGold), totalGold);

    this.swal.swal({
      title: 'Feed your pet',
      text: `Your pet gains ${xpPerGold} xp per gold spent and needs ${neededXp} xp to level up. You have ${totalGold} gold and can spend ${maxGold} gold maximum.`,
      input: 'text',
      inputPlaceholder: 'Gold to feed to pet',
      inputValue: maxGold,
      inputValidator: (value) => {
        value = Math.round(+value);
        return new Promise((resolve, reject) => {
          if(value <= 0 || _.isNaN(value)) return reject('Must feed a positive value.');
          if(value > maxGold) return reject('Cannot overfeed gold.');
          resolve();
        });
      }
    }).then(value => {
      if(!value) return;
      value = Math.round(+value);
      this.primus.feedPet(value);
    });
  }

  takeGold() {
    this.primus.takeGoldFromPet();
  }
}