webpackJsonp([6],{

/***/ 1330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__premium__ = __webpack_require__(1353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_moment__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PremiumPageModule", function() { return PremiumPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PremiumPageModule = (function () {
    function PremiumPageModule() {
    }
    return PremiumPageModule;
}());
PremiumPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__premium__["a" /* PremiumPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_angular2_moment__["MomentModule"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__premium__["a" /* PremiumPage */])],
    })
], PremiumPageModule);

//# sourceMappingURL=premium.module.js.map

/***/ }),

/***/ 1353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_play_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models__ = __webpack_require__(91);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PremiumPage; });
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






var PremiumPage = (function (_super) {
    __extends(PremiumPage, _super);
    function PremiumPage(appState, primus, navCtrl, alertCtrl, theme) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.alertCtrl = alertCtrl;
        _this.theme = theme;
        _this.ilpGoldMargins = [50, 500, 1000, 2500];
        _this.customMultipliers = {
            salvage: 10
        };
        _this.premium = new __WEBPACK_IMPORTED_MODULE_5__models__["a" /* Premium */]();
        return _this;
    }
    PremiumPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.premium$ = this.appState.premium.subscribe(function (data) { return _this.setPremium(data); });
        this.festivals$ = this.appState.festivals.subscribe(function (data) { return _this.setFestivals(data); });
    };
    PremiumPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.premium$.unsubscribe();
        this.festivals$.unsubscribe();
    };
    PremiumPage.prototype.getTotalFestival = function () {
        var base = {
            name: 'All Festivals',
            endDate: __WEBPACK_IMPORTED_MODULE_0_lodash__["maxBy"](this.festivals, function (fest) { return new Date(fest.endDate).getTime(); }).endDate,
            bonuses: {},
            uncloseable: true
        };
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.festivals, function (fest) {
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](__WEBPACK_IMPORTED_MODULE_0_lodash__["keys"](fest.bonuses), function (bonusKey) {
                if (!base.bonuses[bonusKey])
                    base.bonuses[bonusKey] = 0;
                base.bonuses[bonusKey] += fest.bonuses[bonusKey];
            });
        });
        return base;
    };
    PremiumPage.prototype.setFestivals = function (festivals) {
        this.festivals = __WEBPACK_IMPORTED_MODULE_0_lodash__["cloneDeep"](festivals);
        if (this.festivals.length > 0) {
            this.festivals.unshift(this.getTotalFestival());
        }
    };
    PremiumPage.prototype.festivalBonus = function (festivalBonuses) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_lodash__["map"](__WEBPACK_IMPORTED_MODULE_0_lodash__["keys"](festivalBonuses), function (key) {
            var multiplier = _this.customMultipliers[key];
            if (!multiplier)
                multiplier = 100;
            return key.toUpperCase() + " +" + (festivalBonuses[key] * multiplier).toFixed(0);
        });
    };
    PremiumPage.prototype.setPremium = function (premium) {
        this.premium = premium;
        this.updatePageData("Your ILP: " + premium.ilp.toLocaleString());
    };
    PremiumPage.prototype.buyIlp = function (ilpToBuy) {
        var _this = this;
        this.alertCtrl.create({
            cssClass: this.theme.currentTheme,
            title: "Buy ILP",
            message: "Are you sure you want to buy " + ilpToBuy.toLocaleString() + " ILP?",
            buttons: [
                { text: 'Cancel' },
                { text: 'Yes, Please!', handler: function () {
                        _this.primus.buyIlp(ilpToBuy);
                    } }
            ]
        }).present();
    };
    PremiumPage.prototype.buyIlpItem = function (item) {
        var _this = this;
        this.alertCtrl.create({
            cssClass: this.theme.currentTheme,
            title: "Buy " + item,
            message: "Are you sure you want to buy " + item + "?",
            buttons: [
                { text: 'Cancel' },
                { text: 'Yes, Please!', handler: function () {
                        _this.primus.buyIlpItem(item);
                    } }
            ]
        }).present();
    };
    PremiumPage.prototype.createFestival = function () {
        var _this = this;
        this.alertCtrl.create({
            cssClass: this.theme.currentTheme,
            title: "Create Festival",
            message: 'Enter the festival text here. Don\'t forget the bonuses and the hour duration!',
            inputs: [
                { type: 'text', name: 'festival', placeholder: '"Festival Name" xp=0.15 hours=24' }
            ],
            buttons: [
                { text: 'Cancel' },
                { text: 'Create Festival', handler: function (data) {
                        _this.primus.createFestival(data.festival);
                    } }
            ]
        }).present();
    };
    PremiumPage.prototype.cancelFestival = function (festival) {
        var _this = this;
        this.alertCtrl.create({
            cssClass: this.theme.currentTheme,
            title: 'Cancel Festival',
            message: 'Are you sure you want to do this? The players will be very sad :(',
            buttons: [
                { text: 'No, Keep It' },
                { text: 'Yes, Cancel It', handler: function () {
                        _this.primus.cancelFestival(festival._id);
                    } }
            ]
        }).present();
    };
    return PremiumPage;
}(__WEBPACK_IMPORTED_MODULE_4__components_play_component__["a" /* PlayComponent */]));
PremiumPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'premium'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-premium',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/premium/premium.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      IdleLands Premium - {{ player.nameEdit || player.name }}\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row wrap>\n\n      <ion-col col-12 col-md>\n        <ion-card>\n          <ion-card-header>Gold -> ILP</ion-card-header>\n          <ion-card-content>\n            <ion-list>\n              <ion-item *ngFor="let ilpGoldMargin of ilpGoldMargins">\n                {{ ilpGoldMargin | number }} ILP\n\n                <button item-right ion-button small color="primary"\n                        [disabled]="player.gold < premium.conversionRate * ilpGoldMargin"\n                        (click)="buyIlp(ilpGoldMargin)">\n                  Buy for {{ premium.conversionRate * ilpGoldMargin | number }} gold\n                </button>\n              </ion-item>\n            </ion-list>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-12 col-md>\n        <ion-card>\n          <ion-card-header>$ -> ILP</ion-card-header>\n          <ion-card-content>\n            <ion-list>\n              <ion-item *ngFor="let ilpGoldMargin of ilpGoldMargins">\n                Unimplemented\n              </ion-item>\n            </ion-list>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n\n    <ion-row wrap>\n      <ion-col col-12 col-md>\n        <ion-card>\n          <ion-card-header>Buy ILP Items</ion-card-header>\n          <ion-card-content>\n            <ion-list>\n              <ion-item text-wrap *ngFor="let item of premium.buyable">\n                <h2>{{ item.name }}</h2>\n                <p>{{ item.description }}</p>\n                <p *ngIf="item.consumableKey && premium.consumables[item.consumableKey]"><em>You have {{ premium.consumables[item.consumableKey] }} of these.</em></p>\n                <p *ngIf="premium.bought[item.name]"><em>You already own this.</em></p>\n                <button item-right ion-button small color="primary"\n                        [disabled]="premium.ilp < item.cost || premium.bought[item.name]"\n                        (click)="buyIlpItem(item.name)">\n                  Buy for {{ item.cost | number }} ILP\n                </button>\n              </ion-item>\n            </ion-list>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-12 col-md>\n        <ion-card>\n          <ion-card-header>\n            <ion-row no-padding>\n              <ion-col no-padding class="vertical-center">\n                <span>Festivals ({{ festivals.length }})</span>\n              </ion-col>\n\n              <ion-col no-padding text-right>\n                <button no-margin ion-button small outline (click)="createFestival()" *ngIf="player.isMod">Create</button>\n              </ion-col>\n            </ion-row>\n          </ion-card-header>\n          <ion-card-content>\n            <ion-list>\n              <ion-item *ngIf="festivals.length === 0">\n                No festivals! :(\n              </ion-item>\n              <ion-item text-wrap *ngFor="let festival of festivals">\n                <h2>{{ festival.name }}</h2>\n                <p>Ends {{ festival.endDate | amTimeAgo }}</p>\n                <small *ngFor="let bonus of festivalBonus(festival.bonuses)">{{ bonus }}% </small>\n\n                <button ion-button item-right clear icon-only color="danger" (click)="cancelFestival(festival)" *ngIf="player.isMod && !festival.uncloseable">\n                  <ion-icon name="close"></ion-icon>\n                </button>\n              </ion-item>\n            </ion-list>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/premium/premium.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__services__["e" /* Theme */]])
], PremiumPage);

//# sourceMappingURL=premium.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map