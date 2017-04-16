webpackJsonp([2],{

/***/ 1330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map_renderer_component__ = __webpack_require__(1350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
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
        declarations: [__WEBPACK_IMPORTED_MODULE_1__map__["b" /* MapPage */], __WEBPACK_IMPORTED_MODULE_2__map_renderer_component__["a" /* MapRendererComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__map__["b" /* MapPage */])],
    })
], MapPageModule);

//# sourceMappingURL=map.module.js.map

/***/ }),

/***/ 1349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_primus_service__ = __webpack_require__(755);
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

/***/ 1350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(1349);
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

/***/ })

});
//# sourceMappingURL=2.main.js.map