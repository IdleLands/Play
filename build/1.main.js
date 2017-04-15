webpackJsonp([1],{

/***/ 1327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map__ = __webpack_require__(1350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map_renderer_component__ = __webpack_require__(1349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapPageModule", function() { return MapPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MapPageModule = (function () {
    function MapPageModule() {
    }
    return MapPageModule;
}());
MapPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__map__["a" /* MapPage */], __WEBPACK_IMPORTED_MODULE_2__map_renderer_component__["a" /* MapRendererComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__map__["a" /* MapPage */])],
    })
], MapPageModule);

//# sourceMappingURL=map.module.js.map

/***/ }),

/***/ 1348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_primus_service__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });



var GameText = (function () {
    function GameText() {
    }
    GameText.hoverText = function (phaser) {
        if (!phaser)
            return '';
        var x = Math.floor((phaser.camera.x + phaser.input.x) / 16);
        var y = Math.floor((phaser.camera.y + phaser.input.y) / 16);
        return "Hovering " + x + ", " + y;
    };
    GameText.playerText = function (player) {
        return "Currently in " + player.map + " (" + player.mapRegion + ") @ " + player.x + ", " + player.y;
    };
    GameText.otherPlayerText = function (otherPlayer) {
        var base = [
            "Player: " + (otherPlayer.nameEdit || otherPlayer.name),
            "Level " + (otherPlayer.level || otherPlayer._level.__current) + " " + otherPlayer.professionName
        ];
        if (otherPlayer.guildName) {
            base.push("Guild: " + otherPlayer.guildName + " [" + otherPlayer.guildTag + "]");
        }
        return base.join('<br>');
    };
    GameText.itemText = function (item, collectibleHash, bossTimers) {
        if (collectibleHash === void 0) { collectibleHash = {}; }
        if (bossTimers === void 0) { bossTimers = {}; }
        var string = '';
        var nameKey = item.teleportMap ? 'teleportMap' : 'name';
        if (item.realtype) {
            var nameValue = item[nameKey];
            string += "" + item.realtype + (nameValue ? ': ' + nameValue : '');
            if (item.realtype === 'Collectible' && collectibleHash[item[nameKey]]) {
                string = string + " (Owned)";
            }
            if (item.realtype === 'Boss' && bossTimers[item[nameKey]]) {
                var aliveOrDead = Date.now() > bossTimers[item[nameKey]] ? '(Alive)' : "(Dead; respawns " + __WEBPACK_IMPORTED_MODULE_2_moment__(bossTimers[item[nameKey]]).fromNow() + ")";
                string = string + " " + aliveOrDead;
            }
            string += '<br>';
        }
        if (item.flavorText) {
            string += "\"" + item.flavorText + "\"";
            string += '<br>';
        }
        var baseRequirements = [
            { key: 'Achievement' },
            { key: 'Boss', display: 'Boss Kill' },
            { key: 'Class' },
            { key: 'Collectible' },
            { key: 'Holiday' },
            { key: 'Region', display: 'Region Visited' },
            { key: 'Map', display: 'Map Visited' },
            { key: 'Ascension', display: 'Ascension Level' }
        ];
        var requirements = __WEBPACK_IMPORTED_MODULE_0_lodash__["compact"](__WEBPACK_IMPORTED_MODULE_0_lodash__["map"](baseRequirements, function (_a) {
            var key = _a.key, display = _a.display;
            var req = item["require" + key];
            if (!req)
                return null;
            return (display || key) + ": " + req;
        }));
        if (requirements.length > 0) {
            requirements.unshift('------------------------');
            requirements.unshift('Requirements');
            string += requirements.join('<br>');
        }
        return string;
    };
    return GameText;
}());
var Game = (function () {
    function Game(player, updateText) {
        this.otherPlayerHash = {};
        this.afterText = '';
        this.setPlayer(player);
        this.updateText = updateText;
        this.needsMapUpdate = false;
    }
    Object.defineProperty(Game.prototype, "baseUrl", {
        get: function () {
            return __WEBPACK_IMPORTED_MODULE_1__services_primus_service__["b" /* settings */].protocol + "://" + __WEBPACK_IMPORTED_MODULE_1__services_primus_service__["b" /* settings */].hostname + ":" + __WEBPACK_IMPORTED_MODULE_1__services_primus_service__["b" /* settings */].port;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.setPlayer = function (player) {
        this.player = player;
        if (this.player.map !== this.map) {
            var restart = false;
            if (!this.map)
                restart = true;
            this.setMap(this.player.map, this.player.mapPath);
            if (restart && this.phaser) {
                this.phaser.state.restart();
            }
        }
    };
    Game.prototype.setCollectibleHash = function (hash) {
        this.collectibleHash = hash;
    };
    Game.prototype.setMap = function (map, mapPath) {
        this.map = map;
        this.mapPath = mapPath;
        this.needsMapUpdate = true;
    };
    Game.prototype.setOtherPlayers = function (otherPlayers) {
        var _this = this;
        var drawPlayers = __WEBPACK_IMPORTED_MODULE_0_lodash__["filter"](otherPlayers, function (player) { return player.map === _this.map || player.name === _this.player.name; });
        this.otherPlayers = drawPlayers;
    };
    Game.prototype.setBossTimers = function (bossTimers) {
        this.bossTimers = bossTimers;
    };
    Game.prototype.updateOtherPlayers = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.otherPlayers, function (otherPlayer) {
            var prevSprite = _this.otherPlayerHash[otherPlayer.name];
            if (!prevSprite) {
                if (_this.map !== otherPlayer.map)
                    return;
                var newSprite = _this.createSpritePlayer(otherPlayer);
                _this.otherPlayerHash[otherPlayer.name] = newSprite;
            }
            else {
                if (otherPlayer.map !== _this.map) {
                    prevSprite.destroy();
                    delete _this.otherPlayerHash[otherPlayer.name];
                    return;
                }
                prevSprite.x = otherPlayer.x * 16;
                prevSprite.y = otherPlayer.y * 16;
                if (prevSprite.gender !== otherPlayer.gender) {
                    prevSprite.gender = otherPlayer.gender;
                    prevSprite.frame = _this.getGenderById(otherPlayer.gender);
                }
            }
        });
    };
    Game.prototype.getGenderById = function (gender) {
        switch (gender) {
            case 'male': return 12;
            case 'female': return 13;
            case 'not a bear': return 72;
            case 'glowcloud': return 62;
            case 'astronomical entity': return 73;
            case 'boss monster': return 25;
            case 'blue': return 11;
            default: return 14;
        }
    };
    Game.prototype.createSpritePlayer = function (player) {
        var _this = this;
        var spriteGender = this.getGenderById(player.gender);
        var sprite = this.phaser.add.sprite(player.x * 16, player.y * 16, 'interactables', spriteGender);
        sprite.gender = player.gender;
        sprite.inputEnabled = true;
        sprite.events.onInputOver.add(function () {
            _this.setAfterText(GameText.otherPlayerText(player));
        });
        sprite.events.onInputOut.add(function () {
            _this.setAfterText('');
        });
        return sprite;
    };
    Game.prototype.createPropertiesForObject = function (object) {
        if (!object.properties)
            object.properties = {};
        if (!object.type)
            return;
        object.properties = {
            realtype: object.type,
            teleportX: parseInt(object.properties.destx || 0),
            teleportY: parseInt(object.properties.desty || 0),
            teleportMap: object.properties.map,
            teleportLocation: object.properties.toLoc,
            flavorText: object.properties.flavorText,
            requireBoss: object.properties.requireBoss,
            requireCollectible: object.properties.requireCollectible,
            requireAchievement: object.properties.requireAchievement,
            requireClass: object.properties.requireClass,
            requireRegion: object.properties.requireRegion,
            requireMap: object.properties.requireMap,
            requireHoliday: object.properties.requireHoliday,
            requireAscension: object.properties.requireAscension
        };
    };
    Game.prototype.createObjectDataForMap = function (map) {
        var _this = this;
        if (!map || !map.data.layers[2])
            return;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](map.data.layers[2].objects, function (object) {
            _this.createPropertiesForObject(object);
        });
    };
    Game.prototype.setAfterText = function (text) {
        if (text === void 0) { text = ''; }
        this.afterText = text;
    };
    Game.prototype.displayText = function () {
        var hoverText = GameText.hoverText(this.phaser);
        var playerText = GameText.playerText(this.player);
        this.updateText(playerText + "<br><br>" + hoverText + "<br><br>" + this.afterText);
    };
    Game.prototype.attachEventsToObjects = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.objectGroup.children, function (object) {
            object.inputEnabled = true;
            object.events.onInputOver.add(function () {
                _this.setAfterText(GameText.itemText(object, _this.collectibleHash, _this.bossTimers));
            });
            object.events.onInputOut.add(function () {
                _this.setAfterText('');
            });
        });
    };
    Game.prototype.createPhaserMap = function () {
        var cacheMap = this.phaser.cache.getTilemapData(this.map);
        this.createObjectDataForMap(cacheMap);
        this.phaser.cache.removeTilemap(this.map);
        this.phaser.load.tilemap(this.map, null, cacheMap.data, window.Phaser.Tilemap.TILED_JSON);
        var map = this.phaser.add.tilemap(this.map);
        if (!map)
            return;
        map.addTilesetImage('tiles', 'tiles');
        var terrain = map.createLayer('Terrain');
        terrain.resizeWorld();
        map.createLayer('Blocking');
        this.objectGroup = this.phaser.add.group();
        for (var i = 1; i <= 100; i++) {
            map.createFromObjects('Interactables', i, 'interactables', i - 1, true, false, this.objectGroup);
        }
        this.attachEventsToObjects();
        this.spritePlayer = this.createSpritePlayer(this.player);
        this.phaser.camera.follow(this.spritePlayer);
    };
    Game.prototype.preload = function () {
        if (!this.map || !this.mapPath)
            return;
        this.phaser.stage.disableVisibilityChange = true;
        this.phaser.load.image('tiles', this.baseUrl + "/maps/img/tiles.png", 16, 16);
        this.phaser.load.spritesheet('interactables', this.baseUrl + "/maps/img/tiles.png", 16, 16);
        this.phaser.load.tilemap(this.map, this.baseUrl + "/maps/world-maps/" + this.mapPath, null, window.Phaser.Tilemap.TILED_JSON);
    };
    Game.prototype.create = function () {
        if (!this.map || !this.mapPath)
            return;
        this.createPhaserMap();
    };
    Game.prototype.render = function () {
        if (!this.spritePlayer)
            return;
        this.phaser.debug.spriteBounds(this.spritePlayer, '#000', false);
    };
    Game.prototype.update = function () {
        if (this.needsMapUpdate) {
            this.needsMapUpdate = false;
            this.setAfterText('');
            this.phaser.state.restart();
        }
        if (!this.spritePlayer)
            return;
        this.spritePlayer.x = this.player.x * 16;
        this.spritePlayer.y = this.player.y * 16;
        if (this.spritePlayer.gender !== this.player.gender) {
            this.spritePlayer.gender = this.player.gender;
            this.spritePlayer.frame = this.getGenderById(this.player.gender);
        }
        this.displayText();
        this.updateOtherPlayers();
    };
    return Game;
}());

//# sourceMappingURL=game.js.map

/***/ }),

/***/ 1349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(1348);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapRendererComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapRendererComponent = (function () {
    function MapRendererComponent() {
        this.player = new __WEBPACK_IMPORTED_MODULE_1__models__["c" /* Player */]();
        this.collectibleHash = {};
        this.otherPlayers = [];
        this.bossTimers = {};
        this.textUpdate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    MapRendererComponent.prototype.initGame = function () {
        var _this = this;
        var element = document.getElementById('map');
        this.game = new __WEBPACK_IMPORTED_MODULE_2__game__["a" /* Game */](this.player, function (t) { return _this.textUpdate.emit(t); });
        this.phaser = new window.Phaser.Game(element.clientWidth, window.innerHeight - 56, window.Phaser.CANVAS, 'map', this.game);
        this.game.phaser = this.phaser;
    };
    MapRendererComponent.prototype.ngOnDestroy = function () {
        if (this.phaser) {
            this.phaser.destroy();
        }
        var elements = document.getElementsByTagName('canvas');
        while (elements[0])
            elements[0].parentNode.removeChild(elements[0]);
    };
    MapRendererComponent.prototype.ngOnChanges = function () {
        if (!this.player || !this.player.mapPath)
            return;
        if (!this.game) {
            this.initGame();
            return;
        }
        this.game.setPlayer(this.player);
        this.game.setCollectibleHash(this.collectibleHash);
        this.game.setOtherPlayers(this.otherPlayers);
        this.game.setBossTimers(this.bossTimers);
    };
    return MapRendererComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models__["c" /* Player */])
], MapRendererComponent.prototype, "player", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], MapRendererComponent.prototype, "collectibleHash", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], MapRendererComponent.prototype, "otherPlayers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], MapRendererComponent.prototype, "bossTimers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], MapRendererComponent.prototype, "textUpdate", void 0);
MapRendererComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'map-renderer',
        styles: ["\n    :host img {\n      display: none;\n    }\n  "],
        template: "\n    <div id=\"map\"></div>\n  "
    })
], MapRendererComponent);

//# sourceMappingURL=map-renderer.component.js.map

/***/ }),

/***/ 1350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_play_component__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* unused harmony export PersonalityPopover */
// import * as _ from 'lodash';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapPage = (function (_super) {
    __extends(MapPage, _super);
    function MapPage(appState, primus, navCtrl, popCtrl, theme) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.popCtrl = popCtrl;
        _this.theme = theme;
        _this.collectibleHash = {};
        return _this;
    }
    MapPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.collectibles$ = this.appState.collectibles.subscribe(function (data) { return _this.collectibleHash = data.orig.current; });
        this.otherPlayers$ = this.appState.chatUsers.subscribe(function (data) { return _this.otherPlayers = data; });
        this.bosstimers$ = this.appState.bosstimers.subscribe(function (data) { return _this.bosstimers = data; });
        this.primus.requestCollectibles();
        this.primus.requestBossTimers();
    };
    MapPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.collectibles$.unsubscribe();
        this.otherPlayers$.unsubscribe();
        this.bosstimers$.unsubscribe();
        if (this.popover) {
            this.popover.dismiss();
        }
    };
    MapPage.prototype.updateText = function (text) {
        this.mapText = text;
    };
    MapPage.prototype.loadPersonalities = function ($event) {
        if (this.popover) {
            this.popover.dismiss();
        }
        this.popover = this.popCtrl
            .create(PersonalityPopover, {}, { cssClass: this.theme.currentTheme + " transparent-menu", showBackdrop: false, enableBackdropDismiss: false });
        this.popover.present({ ev: $event });
    };
    return MapPage;
}(__WEBPACK_IMPORTED_MODULE_3__components_play_component__["a" /* PlayComponent */]));
MapPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        segment: 'map'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-map',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/map/map.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-buttons left>\n      <button ion-button icon-only (click)="loadPersonalities($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      IdleLands Map - {{ player.nameEdit || player.name }}\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="loadPersonalities($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="no-scroll">\n  <div class="map-text" [innerHTML]="mapText"></div>\n  <map-renderer [player]="player"\n                [collectibleHash]="collectibleHash"\n                [otherPlayers]="otherPlayers"\n                [bossTimers]="bosstimers"\n                (textUpdate)="updateText($event)"></map-renderer>\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/map/map.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_2__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_2__services__["e" /* Theme */]])
], MapPage);

var PersonalityPopover = (function () {
    function PersonalityPopover(viewCtrl, primus, appState) {
        this.viewCtrl = viewCtrl;
        this.primus = primus;
        this.appState = appState;
    }
    PersonalityPopover.prototype.ngOnInit = function () {
        var _this = this;
        this.personalities$ = this.appState.personalities.subscribe(function (data) { return _this.personalities = data; });
        this.primus.requestPersonalities();
    };
    PersonalityPopover.prototype.ngOnDestroy = function () {
        this.personalities$.unsubscribe();
    };
    PersonalityPopover.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PersonalityPopover.prototype.togglePersonality = function (personality) {
        this.primus.togglePersonality(personality);
    };
    return PersonalityPopover;
}());
PersonalityPopover = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n    <ion-list>\n      <button ion-item icon-left (click)=\"dismiss()\">\n        <ion-icon name=\"close\"></ion-icon> Close\n      </button>\n      <ion-item *ngFor=\"let personality of personalities.earned\">\n        <ion-label>{{ personality.name }}</ion-label>\n        <ion-checkbox [checked]=\"personalities.active[personality.name]\" (ionChange)=\"togglePersonality(personality.name)\"></ion-checkbox>\n      </ion-item>\n    </ion-list>\n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2__services__["a" /* AppState */]])
], PersonalityPopover);

//# sourceMappingURL=map.js.map

/***/ })

});
//# sourceMappingURL=1.main.js.map