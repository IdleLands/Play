
import * as _ from 'lodash';

import { Player, ChatUser } from '../../models';

import { settings } from '../../services/primus.service';

import * as moment from 'moment';

class GameText {
  static hoverText(phaser) {
    if(!phaser) return '';
    const x = Math.floor((phaser.camera.x + phaser.input.x) / 16);
    const y = Math.floor((phaser.camera.y + phaser.input.y) / 16);
    return `Hovering ${x}, ${y}`;
  }

  static playerText(player) {
    return `Currently in ${player.map} (${player.mapRegion}) @ ${player.x}, ${player.y}`;
  }

  static otherPlayerText(otherPlayer) {
    const base = [
      `Player: ${otherPlayer.nameEdit || otherPlayer.name}`,
      `Level ${otherPlayer.level || otherPlayer._level.__current} ${otherPlayer.professionName}`
    ];

    if(otherPlayer.guildName) {
      base.push(`Guild: ${otherPlayer.guildName} [${otherPlayer.guildTag}]`);
    }

    return base.join('<br>');
  }

  static itemText(item, collectibleHash = {}, bossTimers = {}) {
    let string = '';

    const nameKey = item.teleportMap ? 'teleportMap' : 'name';

    if(item.realtype) {
      const nameValue = item[nameKey];
      string += `${item.realtype}${nameValue ? ': ' + nameValue : ''}`;

      if(item.realtype === 'Collectible' && collectibleHash[item[nameKey]]) {
        string = `${string} (Owned)`;
      }

      if(item.realtype === 'Boss' && bossTimers[item[nameKey]]) {
        const aliveOrDead = Date.now() > bossTimers[item[nameKey]] ? '(Alive)' : `(Dead; respawns ${moment(bossTimers[item[nameKey]]).fromNow()})`;
        string = `${string} ${aliveOrDead}`
      }

      string += '<br>';
    }

    if(item.flavorText) {
      string += `"${item.flavorText}"`;
      string += '<br>';
    }

    const baseRequirements = [
      { key: 'Achievement' },
      { key: 'Boss', display: 'Boss Kill' },
      { key: 'Class' },
      { key: 'Collectible' },
      { key: 'Holiday' },
      { key: 'Region', display: 'Region Visited' },
      { key: 'Map', display: 'Map Visited' },
      { key: 'Ascension', display: 'Ascension Level' }
    ];

    const requirements = _.compact(_.map(baseRequirements, ({ key, display }) => {
      const req = item[`require${key}`];
      if(!req) return null;

      return `${display || key}: ${req}`;
    }));

    if(requirements.length > 0) {
      requirements.unshift('------------------------');
      requirements.unshift('Requirements');

      string += requirements.join('<br>');
    }

    return string;
  }
}

export class Game {
  public phaser;

  private updateText: Function;
  private player: Player;
  private otherPlayers: ChatUser[];
  private otherPlayerHash = {};
  private map: string;
  private mapPath: string;

  private afterText = '';

  private objectGroup: any;
  private spritePlayer: any;

  private collectibleHash: any;

  private bossTimers: any;

  private needsMapUpdate: boolean;

  constructor(player, updateText) {
    this.setPlayer(player);
    this.updateText = updateText;
    this.needsMapUpdate = false;
  }

  get baseUrl() {
    return `${settings.protocol}://${settings.hostname}:${settings.port}`;
  }

  setPlayer(player: Player) {
    this.player = player;

    if(this.player.map !== this.map) {
      let restart = false;
      if(!this.map) restart = true;

      this.setMap(this.player.map, this.player.mapPath);

      if(restart && this.phaser) {
        this.phaser.state.restart();
      }
    }
  }

  setCollectibleHash(hash) {
    this.collectibleHash = hash;
  }

  setMap(map: string, mapPath: string) {
    this.map = map;
    this.mapPath = mapPath;
    this.needsMapUpdate = true;
  }

  setOtherPlayers(otherPlayers) {
    const drawPlayers = _.filter(otherPlayers, player => player.map === this.map || player.name === this.player.name);
    this.otherPlayers = drawPlayers;
  }

  setBossTimers(bossTimers) {
    this.bossTimers = bossTimers;
  }

  updateOtherPlayers() {
    _.each(this.otherPlayers, otherPlayer => {
      const prevSprite = this.otherPlayerHash[otherPlayer.name];

      if(!prevSprite) {
        if(this.map !== otherPlayer.map) return;

        const newSprite = this.createSpritePlayer(otherPlayer);
        this.otherPlayerHash[otherPlayer.name] = newSprite;

      } else {

        if(otherPlayer.map !== this.map) {
          prevSprite.destroy();
          delete this.otherPlayerHash[otherPlayer.name];
          return;
        }

        prevSprite.x = otherPlayer.x * 16;
        prevSprite.y = otherPlayer.y * 16;

        if(prevSprite.gender !== otherPlayer.gender) {
          prevSprite.gender = otherPlayer.gender;
          prevSprite.frame = this.getGenderById(otherPlayer.gender);
        }

      }
    });
  }

  getGenderById(gender: string) {
    switch(gender) {
      case 'male':                  return 12;
      case 'female':                return 13;
      case 'not a bear':            return 72;
      case 'glowcloud':             return 62;
      case 'astronomical entity':   return 73;
      case 'boss monster':          return 25;
      case 'blue':                  return 11;

      case 'Fighter-blue':          return 88;
      case 'Fighter-red':           return 89;
      case 'Fighter-green':         return 90;
      case 'Fighter-gold':          return 91;
      case 'Mage-blue':             return 92;
      case 'Mage-red':              return 93;
      case 'Mage-green':            return 94;
      case 'Mage-gold':             return 95;
      case 'Cleric-blue':           return 96;
      case 'Cleric-red':            return 97;
      case 'Cleric-green':          return 98;
      case 'Cleric-gold':           return 99;
      case 'Jester-blue':           return 100;
      case 'Jester-red':            return 101;
      case 'Jester-green':          return 102;
      case 'Jester-gold':           return 103;
      case 'Rogue-blue':            return 104;
      case 'Rogue-red':             return 105;
      case 'Rogue-green':           return 106;
      case 'Rogue-gold':            return 107;
      case 'Generalist-blue':       return 108;
      case 'Generalist-red':        return 109;
      case 'Generalist-green':      return 110;
      case 'Generalist-gold':       return 111;
      case 'Archer-blue':           return 112;
      case 'Archer-red':            return 113;
      case 'Archer-green':          return 114;
      case 'Archer-gold':           return 115;
      case 'Pirate-blue':           return 116;
      case 'Pirate-red':            return 117;
      case 'Pirate-green':          return 118;
      case 'Pirate-gold':           return 119;
      case 'MagicalMonster-blue':   return 120;
      case 'MagicalMonster-red':    return 121;
      case 'MagicalMonster-green':  return 122;
      case 'MagicalMonster-gold':   return 123;
      case 'Monster-blue':          return 124;
      case 'Monster-red':           return 125;
      case 'Monster-green':         return 126;
      case 'Monster-gold':          return 127;
      case 'Barbarian-blue':        return 128;
      case 'Barbarian-red':         return 129;
      case 'Barbarian-green':       return 130;
      case 'Barbarian-gold':        return 131;
      case 'Bard-blue':             return 132;
      case 'Bard-red':              return 133;
      case 'Bard-green':            return 134;
      case 'Bard-gold':             return 135;
      case 'SandwichArtist-blue':   return 136;
      case 'SandwichArtist-red':    return 137;
      case 'SandwichArtist-green':  return 138;
      case 'SandwichArtist-gold':   return 139;
      case 'Necromancer-blue':      return 140;
      case 'Necromancer-red':       return 141;
      case 'Necromancer-green':     return 142;
      case 'Necromancer-gold':      return 143;
      case 'Bitomancer-blue':       return 144;
      case 'Bitomancer-red':        return 145;
      case 'Bitomancer-green':      return 146;
      case 'Bitomancer-gold':       return 147;
      case 'Boss-green':            return 149;
      case 'Boss-blue':             return 150;
      case 'Boss-gold':             return 151;

      default:                      return 14;
    }
  }

  createSpritePlayer(player: Player) {
    const spriteGender = this.getGenderById(player.gender);
    const sprite = this.phaser.add.sprite(player.x * 16, player.y * 16, 'interactables', spriteGender);
    sprite.gender = player.gender;
    sprite.inputEnabled = true;

    sprite.events.onInputOver.add(() => {
      this.setAfterText(GameText.otherPlayerText(player));
    });

    sprite.events.onInputOut.add(() => {
      this.setAfterText('');
    });

    return sprite;
  }

  createPropertiesForObject(object) {
    if(!object.properties) object.properties = {};
    if(!object.type) return;

    object.properties = {
      realtype:           object.type,
      teleportX:          parseInt(object.properties.destx || 0),
      teleportY:          parseInt(object.properties.desty || 0),
      teleportMap:        object.properties.map,
      teleportLocation:   object.properties.toLoc,
      flavorText:         object.properties.flavorText,

      requireBoss:        object.properties.requireBoss,
      requireCollectible: object.properties.requireCollectible,
      requireAchievement: object.properties.requireAchievement,
      requireClass:       object.properties.requireClass,
      requireRegion:      object.properties.requireRegion,
      requireMap:         object.properties.requireMap,
      requireHoliday:     object.properties.requireHoliday,
      requireAscension:   object.properties.requireAscension
    };
  }

  createObjectDataForMap(map) {
    if(!map || !map.data.layers[2]) return;

    _.each(map.data.layers[2].objects, object => {
      this.createPropertiesForObject(object);
    });
  }

  setAfterText(text = '') {
    this.afterText = text;
  }

  displayText() {
    const hoverText = GameText.hoverText(this.phaser);
    const playerText = GameText.playerText(this.player);
    this.updateText(`${playerText}<br><br>${hoverText}<br><br>${this.afterText}`);
  }

  attachEventsToObjects() {
    _.each(this.objectGroup.children, object => {
      object.inputEnabled = true;

      object.events.onInputOver.add(() => {
        this.setAfterText(GameText.itemText(object, this.collectibleHash, this.bossTimers));
      });

      object.events.onInputOut.add(() => {
        this.setAfterText('');
      });
    });
  }

  createPhaserMap() {
    const cacheMap = this.phaser.cache.getTilemapData(this.map);
    this.createObjectDataForMap(cacheMap);
    this.phaser.cache.removeTilemap(this.map);
    this.phaser.load.tilemap(this.map, null, cacheMap.data, (<any>window).Phaser.Tilemap.TILED_JSON);

    const map = this.phaser.add.tilemap(this.map);
    if(!map) return;

    map.addTilesetImage('tiles', 'tiles');

    const terrain = map.createLayer('Terrain');
    terrain.resizeWorld();
    map.createLayer('Blocking');

    this.objectGroup = this.phaser.add.group();

    for(let i = 1; i <= 300; i++) {
      map.createFromObjects('Interactables', i, 'interactables', i-1, true, false, this.objectGroup);
    }
    this.attachEventsToObjects();

    this.spritePlayer = this.createSpritePlayer(this.player);
    this.phaser.camera.follow(this.spritePlayer);
  }

  preload() {
    if(!this.map || !this.mapPath) return;
    this.phaser.stage.disableVisibilityChange = true;
    this.phaser.load.image('tiles', `${this.baseUrl}/maps/img/tiles.png`, 16, 16);
    this.phaser.load.spritesheet('interactables', `${this.baseUrl}/maps/img/tiles.png`, 16, 16);
    this.phaser.load.tilemap(this.map, `${this.baseUrl}/maps/world-maps/${this.mapPath}`, null, (<any>window).Phaser.Tilemap.TILED_JSON);
  }

  create() {
    if(!this.map || !this.mapPath) return;
    this.createPhaserMap();
  }

  render() {
    if(!this.spritePlayer) return;
    this.phaser.debug.spriteBounds(this.spritePlayer, '#000', false);
  }

  update() {
    if(this.needsMapUpdate) {
      this.needsMapUpdate = false;
      this.setAfterText('');
      this.phaser.state.restart();
    }

    if(!this.spritePlayer) return;
    this.spritePlayer.x = this.player.x * 16;
    this.spritePlayer.y = this.player.y * 16;

    if(this.spritePlayer.gender !== this.player.gender) {
      this.spritePlayer.gender = this.player.gender;
      this.spritePlayer.frame = this.getGenderById(this.player.gender);
    }

    this.displayText();
    this.updateOtherPlayers();
  }
}
