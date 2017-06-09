webpackJsonp([14],{

/***/ 1278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_moment__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__battle__ = __webpack_require__(1297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BattlePageModule", function() { return BattlePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BattlePageModule = (function () {
    function BattlePageModule() {
    }
    return BattlePageModule;
}());
BattlePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__battle__["a" /* BattlePage */], __WEBPACK_IMPORTED_MODULE_2__battle__["b" /* HighlightPipe */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_angular2_moment__["MomentModule"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__battle__["a" /* BattlePage */])]
    })
], BattlePageModule);

//# sourceMappingURL=battle.module.js.map

/***/ }),

/***/ 1297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_play_component__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models__ = __webpack_require__(89);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BattlePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HighlightPipe; });
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





var BattlePage = (function (_super) {
    __extends(BattlePage, _super);
    function BattlePage(appState, primus, navCtrl, navParams) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.battle = new __WEBPACK_IMPORTED_MODULE_4__models__["m" /* Battle */]();
        return _this;
    }
    BattlePage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        var battleName = this.navParams.get('battleName');
        this.battle$ = this.appState.battle.subscribe(function (battle) {
            _this.battle = _this.restructureBattle(battle);
        });
        this.pet$ = this.appState.petactive.subscribe(function (pet) { return _this.petName = pet.name; });
        this.battle.messageData = [{ data: null, message: 'Loading' }];
        this.primus.loadBattle(battleName);
    };
    BattlePage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.appState.battle.next(new __WEBPACK_IMPORTED_MODULE_4__models__["m" /* Battle */]());
        this.battle$.unsubscribe();
        this.pet$.unsubscribe();
    };
    BattlePage.prototype.battleHeader = function (item) {
        if (!item.data)
            return null;
        return item.data;
    };
    BattlePage.prototype.restructureBattle = function (battle) {
        if (!battle || !battle.messageData) {
            return battle;
        }
        battle.rounds = [];
        var round = -1;
        var currentRound;
        battle.messageData.forEach(function (i) {
            if (i.data || !currentRound) {
                round += 1;
                battle.rounds[round] = {
                    data: i.data || battle.initialParties,
                    messages: [],
                    header: i.message
                };
                currentRound = battle.rounds[round].messages;
            }
            else {
                currentRound.push(i.message);
            }
        });
        return battle;
    };
    return BattlePage;
}(__WEBPACK_IMPORTED_MODULE_3__components_play_component__["a" /* PlayComponent */]));
BattlePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        segment: 'battle/:battleName',
        defaultHistory: ['OverviewPage']
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-battle',template:/*ion-inline-start:"c:\IdleLandsREAL\Play\src\pages\battle\battle.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>Battle Log</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding id="battle-report">\n\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col text-center>\n\n        <h1>{{ battle.name || \'Loading...\' }}</h1>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col text-center>\n\n        <ion-note>{{ battle.happenedAt | amTimeAgo }}</ion-note>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n        <ion-list [virtualScroll]="battle.rounds" approxItemHeight="50px" bufferRatio="30">\n\n\n\n          <ion-item *virtualItem="let round" class="round">\n\n            <ion-card>\n\n              <ion-card-header>{{ round.header }}</ion-card-header>\n\n              <ion-card-content no-padding>\n\n                <ion-row>\n\n                  <ion-col col-6>\n\n                    <ion-card>\n\n                      <ion-card-content>\n\n                        <ion-list>\n\n                          <ion-item *ngFor="let message of round.messages">\n\n                            <h3 [innerHTML]="message | highlight:player.name | highlight:petName"></h3>\n\n                          </ion-item>\n\n                        </ion-list>\n\n                        <!-- <h3 *ngFor="let message of round.messages" [innerHTML]="message | highlight:player.name | highlight:petName"></h3> -->\n\n                      </ion-card-content>\n\n                    </ion-card>\n\n                  </ion-col>\n\n                  <ion-col col-6>\n\n                    <ion-row *ngFor="let party of round.data">\n\n                      <ion-card>\n\n                        <ion-card-header>{{ party.name }}</ion-card-header>\n\n                        <ion-card-content no-padding>\n\n                          <ion-row no-padding wrap *ngFor="let member of party.players">\n\n                            <ion-card>\n\n                              <ion-card-header>{{ member.name }} (Level {{ member.level }} {{ member.profession }})</ion-card-header>\n\n                              <ion-card-content>\n\n                                <span>HP: {{ member.hp.__current | number }}/{{ member.hp.maximum | number }}</span>,\n\n                                <span>MP: {{ member.mp.__current | number }}/{{ member.mp.maximum | number }}</span>\n\n                                <span *ngIf="member.special && member.special.name">, {{ member.special.name }}: {{ member.special.__current | number }}/{{ member.special.maximum | number }}</span>\n\n                              </ion-card-content>\n\n                            </ion-card>\n\n                          </ion-row>\n\n                        </ion-card-content>\n\n                      </ion-card>\n\n                    </ion-row>\n\n                  </ion-col>\n\n                </ion-row>\n\n              </ion-card-content>\n\n            </ion-card>\n\n          </ion-item>\n\n        </ion-list>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\IdleLandsREAL\Play\src\pages\battle\battle.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_2__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], BattlePage);

var HighlightPipe = (function () {
    function HighlightPipe() {
    }
    HighlightPipe.prototype.transform = function (message, checkString) {
        message = message.trim();
        if (!checkString)
            return message;
        if (!message)
            return '';
        return message.replace(new RegExp("(" + checkString + ")", 'gi'), '<span class="highlighted-text">$1</span>');
    };
    return HighlightPipe;
}());
HighlightPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'highlight'
    })
], HighlightPipe);

//# sourceMappingURL=battle.js.map

/***/ })

});
//# sourceMappingURL=14.main.js.map