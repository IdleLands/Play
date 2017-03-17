
import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';

import { Player } from '../../models';

import { Game } from './game';

@Component({
  selector: 'map-renderer',
  styles: [`
    :host img {
      display: none;
    }
  `],
  template: `
    <div id="map"></div>
  `
})
export class MapRendererComponent implements OnDestroy, OnChanges {

  @Input() public player: Player = new Player();
  @Input() public collectibleHash: any = {};
  @Input() public otherPlayers = [];
  @Input() public bossTimers = {};

  @Output() public textUpdate = new EventEmitter();

  private phaser: any;
  private game: Game;

  initGame() {
    const element = document.getElementById('map');
    this.game = new Game(this.player, t => this.textUpdate.emit(t));
    this.phaser = new (<any>window).Phaser.Game(element.clientWidth, window.innerHeight - 56, (<any>window).Phaser.CANVAS, 'map', this.game);

    this.game.phaser = this.phaser;
  }

  ngOnDestroy() {
    if(this.phaser) {
      this.phaser.destroy();
    }

    const elements = document.getElementsByTagName('canvas');
    while(elements[0]) elements[0].parentNode.removeChild(elements[0]);
  }

  ngOnChanges() {
    if(!this.player || !this.player.mapPath) return;

    if(!this.game) {
      this.initGame();
      return;
    }

    this.game.setPlayer(this.player);
    this.game.setCollectibleHash(this.collectibleHash);
    this.game.setOtherPlayers(this.otherPlayers);
    this.game.setBossTimers(this.bossTimers);
  }
}