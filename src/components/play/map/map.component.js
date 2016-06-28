
import _ from 'lodash';

import { Http } from '@angular/http';
import { Component } from '@angular/core';
import template from './map.html';
import './map.less';

window.PIXI = require('pixi.js');
window.p2 = require('p2');
window.Phaser = require('phaser');

import { PrimusWrapper, settings } from '../../../services/primus';

const baseUrl = `${settings.protocol}://${settings.hostname}:${settings.port}`;

class Game {

  constructor({ mapName, playerData }) {
    this.mapName = mapName;
    this.playerData = playerData;

    this.player = null;
    this.text = null;
    this.itemText = '';
  }

  cacheMap(mapName, mapData) {
    this.game.load.tilemap(mapName, null, mapData, window.Phaser.Tilemap.TILED_JSON);
  }

  createPlayer() {
    const genders = {
      male: 12,
      female: 13
    };
    this.player = this.game.add.sprite(this.playerData.x*16, this.playerData.y*16, 'interactables', genders[this.playerData.gender]);
  }

  hoverText() {
    const x = Math.floor((this.game.camera.x + this.game.input.x) / 16);
    const y = Math.floor((this.game.camera.y + this.game.input.y) / 16);
    return `Hovering (${x}, ${y})\n${this.itemText}`;
  }

  textForPlayer() {
    return `${this.playerData.map} (${this.playerData.mapRegion})\n${this.playerData.x}, ${this.playerData.y}\n\n${this.hoverText()}`;
  }

  setObjectData(mapName, map) {
    if(!map || !map.data.layers[2]) return;
    _.each(map.data.layers[2].objects, object => {
      object.properties = {
        realtype:           object.type,
        teleportX: parseInt(object.properties.destx || 0),
        teleportY: parseInt(object.properties.desty || 0),
        teleportMap:        object.properties.map,
        teleportLocation:   object.properties.toLoc,
        requireBoss:        object.properties.requireBoss,
        requireCollectible: object.properties.requireCollectible,
        requireAchievement: object.properties.requireAchievement,
        requireClass:       object.properties.requireClass,
        requireRegion:      object.properties.requireRegion,
        requireMap:         object.properties.requireMap,
        flavorText:         object.properties.flavorText,
        requireHoliday:     object.properties.holiday
      };
    });

    // re-cache the tilemap with the new data
    this.game.cache.removeTilemap(mapName);
    this.cacheMap(mapName, map.data);
  }

  createObjectData() {

    _.each(this.objectGroup.children, child => {

      child.inputEnabled = true;

      child.events.onInputOver.add(() => {

        this.itemText = '';

        const nameKey = child.teleportMap ? 'teleportMap' : 'name';

        if(child.realtype && child.realtype !== 'Door') this.itemText = `${child.realtype}: ${child[nameKey]}`;

        if(child.flavorText) this.itemText += `\n\"${child.flavorText}\"`;

        let requires = false;
        let requirementText = '\nRequirements\n-------------------';
        if(child.requireAchievement) requires=true;requirementText += `\nAchievement: ${child.requireAchievement}`;
        if(child.requireBoss)        requires=true;requirementText += `\nBoss Kill: ${child.requireBoss}`;
        if(child.requireClass)       requires=true;requirementText += `\nClass: ${child.requireClass}`;
        if(child.requireCollectible) requires=true;requirementText += `\nCollectible: ${child.requireCollectible}`;
        if(child.requireHoliday)     requires=true;requirementText += `\nHoliday: ${child.requireHoliday}`;
        if(child.requireRegion)      requires=true;requirementText += `\nRegion Visited: ${child.requireHoliday}`;
        if(child.requireMap)         requires=true;requirementText += `\nMap Visited: ${child.requireHoliday}`;

        if(requires) this.itemText = `${this.itemText}\n${requirementText}`;

        child.events.onInputOut.add(() => this.itemText = '');
      });
    });

  }

  createMap() {
    if(!this.game.cache.checkTilemapKey(this.mapName)) return;
    this.setObjectData(this.mapName, this.game.cache.getTilemapData(this.mapName));
    const map = this.game.add.tilemap(this.mapName);
    map.addTilesetImage('tiles', 'tiles');

    const terrain = map.createLayer('Terrain');
    terrain.resizeWorld();
    map.createLayer('Blocking');

    this.objectGroup = this.game.add.group();

    for(let i = 1; i <=100; i++) {
      map.createFromObjects('Interactables', i, 'interactables', i-1, true, false, this.objectGroup);
    }

    this.createObjectData();

    this.createPlayer();
    this.game.camera.follow(this.player);

    const textOptions = { font: '15px Arial', fill: '#fff', stroke: '#000', strokeThickness: 3, wordWrap: true, wordWrapWidth: 500 };
    this.text = this.game.add.text(10, 10, this.textForPlayer(), textOptions);
    this.text.fixedToCamera = true;
  }

  preload() {
    this.game.load.image('tiles', `${baseUrl}/maps/img/tiles.png`, 16, 16);
    this.game.load.spritesheet('interactables', `${baseUrl}/maps/img/tiles.png`, 16, 16);
    this.game.load.tilemap(this.mapName, `${baseUrl}/maps/world-maps/${this.playerData.mapPath}`, null, window.Phaser.Tilemap.TILED_JSON);
  }

  create() {
    this.createMap();
  }

  render() {
    this.game.debug.spriteBounds(this.player, '#000', false);
  }

  update() {
    if(this._currentMapName !== this.mapName) {
      this.game.state.restart();
      this.createMap();
      this.itemText = '';
    }

    this._currentMapName = this.mapName;

    this.player.x = this.playerData.x*16;
    this.player.y = this.playerData.y*16;

    this.text.text = this.textForPlayer();
  }
}

@Component({
  template
})
export class MapComponent {

  static get parameters() {
    return [[PrimusWrapper], [Http]];
  }

  constructor(primus, http) {
    this.primus = primus;
    this.http = http;

    this.playerData = primus._contentUpdates.player.getValue();
  }

  loadMap(mapName, mapPath) {
    return this.http.get(`${baseUrl}/maps/world-maps/${mapPath}`)
      .map(res => res.json())
      .subscribe(data => this.setMapData(mapName, data));
  }

  setPlayerData(data) {
    this.playerData = data;

    if(this.mapName !== this.playerData.map) {
      this.mapName = this.playerData.map;
      this.loadMap(this.mapName, this.playerData.mapPath);
    }

    if(this._gameObj) {
      this._gameObj.mapName = this.mapName;
      this._gameObj.playerData = this.playerData;
    }
  }

  setMapData(mapName, mapData) {
    if(!this.game) {
      this._gameObj = new Game({ playerData: this.playerData, mapName: this.mapName });
      this.game = new window.Phaser.Game('100%', window.innerHeight - 54, window.Phaser.CANVAS, 'map', this._gameObj);
      this._gameObj.game = this.game;
    } else {
      this._gameObj.cacheMap(mapName, mapData);
    }
  }

  ngOnInit() {
    this.playerSubscription = this.primus.contentUpdates.player.subscribe(data => this.setPlayerData(data));
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }
}