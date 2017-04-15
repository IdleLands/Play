webpackJsonp([15],{

/***/ 1318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__achievements__ = __webpack_require__(1338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_components_module__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AchievementsPageModule", function() { return AchievementsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AchievementsPageModule = (function () {
    function AchievementsPageModule() {
    }
    return AchievementsPageModule;
}());
AchievementsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__achievements__["a" /* AchievementsPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2__components_components_module__["a" /* GlobalComponentsModule */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__achievements__["a" /* AchievementsPage */])],
    })
], AchievementsPageModule);

//# sourceMappingURL=achievements.module.js.map

/***/ }),

/***/ 1338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_webstorage__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_play_component__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AchievementsPage; });
/* unused harmony export AchievementModal */
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






var AchievementsPage = (function (_super) {
    __extends(AchievementsPage, _super);
    function AchievementsPage(appState, primus, navCtrl, modalCtrl) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.achievements = [];
        return _this;
    }
    AchievementsPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.achievements$ = this.appState.achievements.subscribe(function (data) {
            _this.setAchievements(data);
            var totalTiers = __WEBPACK_IMPORTED_MODULE_0_lodash__["sumBy"](data, 'tier');
            _this.updatePageData("Total Achievements: " + data.length + "<br>Total Tiers: " + totalTiers);
        });
        this.primus.requestAchievements();
    };
    AchievementsPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.achievements$.unsubscribe();
    };
    AchievementsPage.prototype.setAchievements = function (achievements) {
        this.achievements = achievements;
    };
    AchievementsPage.prototype.viewRewards = function (achievement) {
        this.modalCtrl.create(AchievementModal, { achievement: achievement }).present();
    };
    return AchievementsPage;
}(__WEBPACK_IMPORTED_MODULE_5__components_play_component__["a" /* PlayComponent */]));
AchievementsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'achievements'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-achievements',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/achievements/achievements.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      IdleLands Achievements - {{ player.nameEdit || player.name }}\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <div class="true-center max-space background-text" *ngIf="achievements.length === 0">\n    You don\'t have any achievements... yet!\n  </div>\n\n  <ion-list [virtualScroll]="achievements" approxItemHeight="150px" approxItemWidth="33%" bufferRatio="12">\n    <div col-12 col-md-4 *virtualItem="let achievement">\n      <ion-card class="achievement-card">\n        <achievement-icon class="background-icon true-center size-1000" [icon]="achievement.type"></achievement-icon>\n        <ion-card-header>\n          <span>{{ achievement.name }}</span>\n          <span *ngIf="achievement.tier > 1">tier {{ achievement.tier }}</span>\n        </ion-card-header>\n        <ion-card-content>{{ achievement.desc }}</ion-card-content>\n        <ion-row>\n          <ion-col text-center>\n            <button ion-button clear (click)="viewRewards(achievement)">Rewards</button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/achievements/achievements.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_4__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ModalController */]])
], AchievementsPage);

var AchievementModal = (function () {
    function AchievementModal(viewCtrl, navParams, storage, theme) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.theme = theme;
        this.rewards = [];
    }
    AchievementModal.prototype.ngOnInit = function () {
        var _this = this;
        this.achievement = this.navParams.get('achievement');
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.achievement.rewards, function (reward) {
            if (reward.type === 'stats') {
                __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](reward, function (val, key) {
                    if (key === 'type')
                        return;
                    var statType = key.split('Display').join('').toUpperCase();
                    var statValue = val || reward[key + "Display"];
                    var existing = __WEBPACK_IMPORTED_MODULE_0_lodash__["find"](_this.rewards, { type: statType });
                    if (existing) {
                        existing.value += statValue;
                    }
                    else {
                        var newReward = {
                            type: statType,
                            value: statValue
                        };
                        _this.rewards.push(newReward);
                    }
                });
            }
            else if (reward.type === 'pet') {
                _this.rewards.push({ type: 'Pet', value: reward.pet });
            }
            else if (reward.type === 'petclass') {
                _this.rewards.push({ type: 'Pet Class', value: reward.petclass });
            }
            else if (reward.type === 'petattr') {
                _this.rewards.push({ type: 'Pet Descriptor', value: reward.petattr });
            }
            else if (reward.type === 'title') {
                _this.rewards.push({ type: 'Title', value: reward.title });
            }
            else if (reward.type === 'personality') {
                _this.rewards.push({ type: 'Personality', value: reward.personality });
            }
        });
    };
    return AchievementModal;
}());
AchievementModal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: "\n<ion-header class=\"modal {{ theme.currentTheme }}\">\n  <ion-toolbar color=\"primary\">\n    <ion-title>\n      {{ achievement.name }} Rewards\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)=\"viewCtrl.dismiss()\">\n        <ion-icon name=\"close\"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"modal {{ theme.currentTheme }}\">\n  <ion-grid text-center>\n    <ion-row>\n      <ion-col>{{ achievement.desc }}</ion-col>\n    </ion-row>\n    <ion-row *ngFor=\"let reward of rewards\">\n      <ion-col text-right><strong>{{ reward.type }}</strong></ion-col> \n      <ion-col text-left>{{ reward.value }}</ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3_ng2_webstorage__["c" /* LocalStorageService */],
        __WEBPACK_IMPORTED_MODULE_4__services__["e" /* Theme */]])
], AchievementModal);

//# sourceMappingURL=achievements.js.map

/***/ })

});
//# sourceMappingURL=15.main.js.map