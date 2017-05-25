webpackJsonp([8],{

/***/ 1331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_moment__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_components_module__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overview__ = __webpack_require__(1351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewPageModule", function() { return OverviewPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var OverviewPageModule = (function () {
    function OverviewPageModule() {
    }
    return OverviewPageModule;
}());
OverviewPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_3__overview__["a" /* OverviewPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2__components_components_module__["a" /* GlobalComponentsModule */], __WEBPACK_IMPORTED_MODULE_1_angular2_moment__["MomentModule"], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__overview__["a" /* OverviewPage */])]
    })
], OverviewPageModule);

//# sourceMappingURL=overview.module.js.map

/***/ }),

/***/ 1351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_play_component__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverviewPage; });
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





var OverviewPage = (function (_super) {
    __extends(OverviewPage, _super);
    function OverviewPage(appState, primus, navCtrl, icomp, alertCtrl, theme, platform) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.icomp = icomp;
        _this.alertCtrl = alertCtrl;
        _this.theme = theme;
        _this.platform = platform;
        _this.stats = [];
        _this.choices = [];
        _this.adventureLog = [];
        _this.shopButtons = [
            { name: 'Buy', callback: function (item) {
                    var equipment = _this.appState.equipment.getValue();
                    var buttons = [
                        { text: "Buy for " + item.price.toLocaleString() + " gold", color: 'primary', callback: function () { return _this.primus.buyShopItem(item.id); } },
                        { text: 'Close', color: 'light', callback: function () { } }
                    ];
                    _this.icomp.compare(equipment[item.type], item, buttons).then(function (button) {
                        if (!button)
                            return;
                        button.callback();
                    });
                } }
        ];
        return _this;
    }
    OverviewPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.stats = __WEBPACK_IMPORTED_MODULE_3__services__["f" /* ItemInfo */].statOrder;
        this.adventureLog$ = this.appState.adventureLog.subscribe(function (data) {
            if (!_this.adventureLog)
                _this.adventureLog = [];
            _this.adventureLog.unshift(data);
            if (_this.adventureLog.length > 50) {
                _this.adventureLog.length = 50;
            }
        });
        this.shop$ = this.appState.shop.subscribe(function (data) { return _this.shop = data; });
        this.party$ = this.appState.party.subscribe(function (data) {
            _this.party = data;
        });
        this.primus.requestEquipment();
        this.primus.requestParty();
        this.primus.requestShop();
    };
    OverviewPage.prototype.ngOnDestroy = function () {
        this.adventureLog$.unsubscribe();
        this.party$.unsubscribe();
        this.shop$.unsubscribe();
    };
    Object.defineProperty(OverviewPage.prototype, "equipment", {
        get: function () {
            return this.appState.equipment.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverviewPage.prototype, "numSlides", {
        get: function () {
            return this.platform.is('ios') || this.platform.is('android') ? 1 : 3;
        },
        enumerable: true,
        configurable: true
    });
    OverviewPage.prototype.setPlayer = function (player) {
        _super.prototype.setPlayer.call(this, player);
        this.setChoices(player.choices);
    };
    OverviewPage.prototype.setChoices = function (choices) {
        var add = __WEBPACK_IMPORTED_MODULE_0_lodash__["differenceBy"](choices, this.choices, 'id');
        var remove = __WEBPACK_IMPORTED_MODULE_0_lodash__["map"](__WEBPACK_IMPORTED_MODULE_0_lodash__["differenceBy"](this.choices, choices, 'id'), 'id');
        (_a = this.choices).push.apply(_a, add);
        this.choices = __WEBPACK_IMPORTED_MODULE_0_lodash__["reject"](this.choices, function (choice) { return __WEBPACK_IMPORTED_MODULE_0_lodash__["includes"](remove, choice.id); });
        if (this.choices.length < 4 && this.choices.length > 0) {
            try {
                this.choiceSlides.slideTo(0);
            }
            catch (e) { }
        }
        var _a;
    };
    OverviewPage.prototype.makeChoice = function (id, choice) {
        this.primus.makeChoice(id, choice);
        if (choice === 'Yes') {
            this.primus.requestEquipment();
        }
    };
    OverviewPage.prototype.moreInfo = function (choice) {
        var _this = this;
        var choiceItem = choice.extraData.item;
        var equipment = this.appState.equipment.getValue();
        var playerItem = equipment[choiceItem.type] || { str: 0, dex: 0, con: 0, int: 0, agi: 0, luk: 0, _baseScore: 1, _calcScore: 1 };
        var buttons = [
            { text: 'Equip', color: 'primary', callback: function () { return _this.makeChoice(choice.id, 'Yes'); } },
            { text: 'Discard', color: 'danger', callback: function () { return _this.makeChoice(choice.id, 'No'); } },
            { text: 'Pet', color: 'secondary', callback: function () { return _this.makeChoice(choice.id, 'Pet'); } },
            { text: 'Close', color: 'light', callback: function () { } }
        ];
        if (choice.choices.indexOf('Pet') < 0)
            buttons.splice(2, 1);
        this.icomp.compare(playerItem, choiceItem, buttons).then(function (button) {
            if (!button)
                return;
            button.callback();
        });
    };
    OverviewPage.prototype.openLink = function (link) {
        window.open(link, '_blank');
    };
    OverviewPage.prototype.viewBattle = function (id) {
        this.navCtrl.push('BattlePage', { battleName: id });
    };
    OverviewPage.prototype.leaveParty = function () {
        this.primus.leaveParty();
    };
    OverviewPage.prototype.ascend = function () {
        var _this = this;
        this.alertCtrl.create({
            cssClass: this.theme.currentTheme,
            title: 'Ascension Confirmation',
            message: "Are you sure you want to ascend? <br><br>You will: go back to level 1, \n                lose all of your items, lose all of your pet items, lose all of your gold, lose all of your pet gold, \n                and lose all of your collectibles. <br><br>In return, you will: increase your maximum level by 50, have a bonus to gold find and xp gain,\n                go up one ascension level, and create an experience and gold festival for all players. Your collectibles will be remembered.",
            buttons: [
                { text: 'No, Nevermind' },
                {
                    text: 'Yes, Ascend',
                    handler: function () {
                        _this.primus.ascend();
                    }
                }
            ]
        }).present();
    };
    return OverviewPage;
}(__WEBPACK_IMPORTED_MODULE_4__components_play_component__["a" /* PlayComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('choiceSlides'),
    __metadata("design:type", Object)
], OverviewPage.prototype, "choiceSlides", void 0);
OverviewPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'overview'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-overview',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/overview/overview.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      IdleLands Overview - {{ player.nameEdit || player.name }}\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row *ngIf="player.lastAscension" text-center>\n      <ion-col>You last ascended on {{ player.lastAscension | date:\'medium\' }} ({{ player.lastAscension | amTimeAgo }})</ion-col>\n    </ion-row>\n\n    <ion-row *ngIf="player._level.__current === player._level.maximum">\n      <ion-col>\n        <button ion-button block color="primary" (click)="ascend()">Are you ready to ascend?</button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row wrap>\n      <ion-col col-12 col-md>\n        <ion-card>\n          <ion-card-header>Vitals</ion-card-header>\n          <ion-card-content>\n            <ion-row>\n              <ion-col class="size-150">\n                <stat stat="hp" [value]="player._hp.__current"></stat>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col class="size-150">\n                <stat stat="mp" [value]="player._mp.__current"></stat>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col class="size-150">\n                <game-icon icon="stat-xp"></game-icon> {{ player._xp.__current | number }}/{{ player._xp.maximum | number }} XP\n              </ion-col>\n            </ion-row>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-12 col-md>\n        <ion-card>\n          <ion-card-header>Attributes</ion-card-header>\n          <ion-card-content>\n            <ion-row wrap>\n              <ion-col col-6 *ngFor="let stat of stats" class="size-150">\n                <stat [stat]="stat" [value]="player.statCache[stat]" [showColor]="true"></stat>\n              </ion-col>\n            </ion-row>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf="equipment && shop.slots.length > 0">\n      <ion-col>\n        <ion-card>\n          <ion-card-header>\n            Shop - {{ shop.region }}\n          </ion-card-header>\n          <ion-card-content>\n            <ion-row *ngFor="let item of shop.slots">\n              <ion-col>\n                <item [item]="item" [buttons]="shopButtons"></item>\n              </ion-col>\n            </ion-row>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf="party.name && party.players.length > 1">\n      <ion-col>\n        <ion-card>\n          <ion-card-header>\n            <ion-row no-padding>\n              <ion-col no-padding class="vertical-center">\n                <span>Party - {{ party.name }}</span>\n              </ion-col>\n\n              <ion-col no-padding text-right>\n                <button no-margin ion-button small color="primary" (click)="leaveParty()">Leave Party</button>\n              </ion-col>\n            </ion-row>\n          </ion-card-header>\n          <ion-card-content>\n            <ion-row wrap>\n              <ion-col col-12 col-md *ngFor="let member of party.players">\n                <ion-card class="party-card">\n                  <ion-card-header>{{ member.name }}</ion-card-header>\n                  <ion-card-content>\n                    Level {{ member.level }} {{ member.profession }}\n                  </ion-card-content>\n                </ion-card>\n              </ion-col>\n            </ion-row>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-card>\n          <ion-card-header>\n            <ion-row no-padding>\n              <ion-col no-padding class="vertical-center">\n                <span>Choice Log</span>\n                <ion-note padding-left>Swipe or use arrow keys to navigate</ion-note>\n              </ion-col>\n\n              <ion-col no-padding text-right *ngIf="choices.length > 3">\n                <button ion-button small icon-only color="primary" (click)="choiceSlides.slidePrev()">\n                  <ion-icon name="arrow-back"></ion-icon>\n                </button>\n                <button ion-button small icon-only color="primary" (click)="choiceSlides.slideNext()">\n                  <ion-icon name="arrow-forward"></ion-icon>\n                </button>\n              </ion-col>\n            </ion-row>\n\n          </ion-card-header>\n          <ion-card-content no-padding>\n\n            <ion-slides [class.hidden]="choices.length > 0">\n              <ion-slide>\n                <ion-card class="choice-card">\n                  <ion-card-content>\n                    <h1>You don\'t have any choices right now. Check back later!</h1>\n                  </ion-card-content>\n                </ion-card>\n              </ion-slide>\n            </ion-slides>\n\n            <ion-slides [class.hidden]="choices.length === 0" [slidesPerView]="numSlides" #choiceSlides>\n              <ion-slide *ngFor="let choice of choices; let i = index">\n                <ion-card class="choice-card">\n                  <ion-card-header>\n                    Choice #{{ i+1 }}/{{ choices.length }} (Max: {{ player._choiceLimit }})\n                  </ion-card-header>\n                  <ion-card-content>\n                    {{ choice.message }}\n                  </ion-card-content>\n                  <ion-row>\n                    <ion-col *ngFor="let option of choice.choices">\n                      <button ion-button clear small (click)="makeChoice(choice.id, option)">\n                        <div>{{ option }}</div>\n                      </button>\n                    </ion-col>\n                    <ion-col *ngIf="choice.event === \'FindItem\' || choice.event === \'Merchant\'">\n                      <button ion-button clear small color="secondary" (click)="moreInfo(choice)">\n                        <div>Compare</div>\n                      </button>\n                    </ion-col>\n                  </ion-row>\n                </ion-card>\n              </ion-slide>\n            </ion-slides>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-card>\n          <ion-card-header>Adventure Log</ion-card-header>\n          <ion-card-content class="adventure-log" no-padding>\n            <ion-list no-padding>\n              <ion-item *ngIf="adventureLog && adventureLog.length === 0">\n                Your adventure log is empty.\n              </ion-item>\n              <ion-item no-padding *ngFor="let item of adventureLog; let i = index" text-wrap [color]="i % 2 === 0 ? \'darkstripe\' : \'lightstripe\'">\n                <ion-grid no-padding>\n                  <ion-row no-padding>\n                    <ion-col col-xs-4 col-md-2 true-center text-center>\n                      <advlog-icon [icon]="item.category" class="size-300"></advlog-icon>\n                    </ion-col>\n                    <ion-col col-xs-8 col-md-10>\n                      <ion-note>\n                        <span>{{ item.timestamp | date:\'medium\' }}</span>\n                      </ion-note>\n                      <div>{{ item.text }}</div>\n                      <button ion-button small color="primary" (click)="viewBattle(item.extraData.battleName)" *ngIf="item.extraData?.battleName">View Battle</button>\n                      <button ion-button small color="primary" (click)="openLink(item.extraData.link)" *ngIf="item.extraData?.link">View Link</button>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n              </ion-item>\n            </ion-list>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/overview/overview.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__services__["d" /* ItemCompare */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__services__["e" /* Theme */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */]])
], OverviewPage);

//# sourceMappingURL=overview.js.map

/***/ })

});
//# sourceMappingURL=8.main.js.map