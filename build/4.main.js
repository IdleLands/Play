webpackJsonp([4],{

/***/ 1335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings__ = __webpack_require__(1355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    return SettingsPageModule;
}());
SettingsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__settings__["a" /* SettingsPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__settings__["a" /* SettingsPage */])],
    })
], SettingsPageModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 1355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_webstorage__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_play_component__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
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






var SettingsPage = (function (_super) {
    __extends(SettingsPage, _super);
    function SettingsPage(appState, primus, navCtrl) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.genders = [];
        _this.titles = [];
        _this.themes = [
            { name: 'Default', val: 'default' },
            { name: 'AMOLED Black', val: 'amoled' },
            { name: 'Black & White', val: 'blackwhite' },
            { name: 'Dark', val: 'dark' },
            { name: 'Dim Ocean', val: 'dimocean' },
            { name: 'Green Machine', val: 'greenmachine' },
            { name: 'l33t h4x0r', val: 'hacker' },
            { name: 'Majestic', val: 'majestic' },
            { name: 'Orangina', val: 'orangina' }
        ];
        return _this;
    }
    Object.defineProperty(SettingsPage.prototype, "version", {
        get: function () {
            return "v0.11.0-34-g2d3c772";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsPage.prototype, "thanks", {
        get: function () {
            return [
                { name: 'Darkblizer', reason: 'Art' },
                { name: 'Sedgwick', reason: 'Donation, Maps' },
                { name: 'Yngvildr', reason: 'Development' },
                { name: 'Therealtahu', reason: 'Support, Development, Stability' },
                { name: 'Anexes', reason: 'Development' },
                { name: 'Ascended', reason: 'Content, Development, Donation' }
            ];
        },
        enumerable: true,
        configurable: true
    });
    SettingsPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        if (!this.theme)
            this.theme = 'default';
        this.personalities$ = this.appState.personalities.subscribe(function (data) { return _this.personalities = data; });
        this.genders$ = this.appState.genders.subscribe(function (data) { return _this.genders = data; });
        this.achievements$ = this.appState.achievements.subscribe(function (data) { return _this.parseTitles(data); });
        this.primus.requestPersonalities();
        this.primus.requestAchievements();
    };
    SettingsPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.personalities$.unsubscribe();
        this.genders$.unsubscribe();
        this.achievements$.unsubscribe();
    };
    SettingsPage.prototype.parseTitles = function (achievements) {
        this.titles = __WEBPACK_IMPORTED_MODULE_0_lodash__(achievements)
            .map('rewards')
            .flattenDeep()
            .filter(function (reward) { return reward.type === 'title'; })
            .map('title')
            .value();
    };
    SettingsPage.prototype.changeGender = function (gender) {
        this.primus.changeGender(gender);
    };
    SettingsPage.prototype.changeTitle = function (title) {
        this.primus.changeTitle(title);
    };
    SettingsPage.prototype.togglePersonality = function (personality) {
        this.primus.togglePersonality(personality);
    };
    return SettingsPage;
}(__WEBPACK_IMPORTED_MODULE_5__components_play_component__["a" /* PlayComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ng2_webstorage__["b" /* LocalStorage */])(),
    __metadata("design:type", String)
], SettingsPage.prototype, "theme", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ng2_webstorage__["b" /* LocalStorage */])(),
    __metadata("design:type", Boolean)
], SettingsPage.prototype, "faviconNotifications", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ng2_webstorage__["b" /* LocalStorage */])(),
    __metadata("design:type", Boolean)
], SettingsPage.prototype, "compressChat", void 0);
SettingsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'settings'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-settings',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/settings/settings.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      IdleLands Settings - {{ player.nameEdit || player.name }}\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-row wrap>\n\n    <ion-col col-md col-12>\n      <ion-card>\n        <ion-card-header>Adventurer Settings</ion-card-header>\n        <ion-card-content>\n          <ion-list>\n            <ion-item>\n              <ion-label stacked>Gender</ion-label>\n              <ion-select [(ngModel)]="player.gender" [selectOptions]="{ cssClass: \'theme-\' + theme }" (ionChange)="changeGender($event)">\n                <ion-option *ngFor="let gender of genders">{{ gender }}</ion-option>\n              </ion-select>\n            </ion-item>\n\n            <ion-item>\n              <ion-label stacked>Title</ion-label>\n              <ion-select [(ngModel)]="player.title" [selectOptions]="{ cssClass: \'theme-\' + theme }" (ionChange)="changeTitle($event)">\n                <ion-option value="">None</ion-option>\n                <ion-option *ngFor="let title of titles">{{ title }}</ion-option>\n              </ion-select>\n            </ion-item>\n\n            <ion-item-divider>Personalities</ion-item-divider>\n\n            <ion-item text-wrap *ngFor="let personality of personalities.earned">\n              <ion-label>\n                <h2>{{ personality.name }}</h2>\n                <p>{{ personality.description }}</p>\n              </ion-label>\n\n              <ion-checkbox [checked]="personalities.active[personality.name]" (ionChange)="togglePersonality(personality.name)"></ion-checkbox>\n            </ion-item>\n          </ion-list>\n        </ion-card-content>\n      </ion-card>\n    </ion-col>\n\n    <ion-col col-md col-12>\n      <ion-row wrap>\n\n        <ion-col col-12>\n          <ion-card>\n            <ion-card-header>Interface Settings</ion-card-header>\n            <ion-card-content>\n              <ion-list>\n                <ion-item>\n                  <ion-label stacked>Theme</ion-label>\n                  <ion-select [(ngModel)]="theme" [selectOptions]="{ cssClass: \'theme-\' + theme }">\n                    <ion-option *ngFor="let theme of themes" [value]="theme.val">{{ theme.name }}</ion-option>\n                  </ion-select>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label>Show Favicon Notifications</ion-label>\n                  <ion-checkbox [(ngModel)]="faviconNotifications"></ion-checkbox>\n                </ion-item>\n\n                <ion-item>\n                  <ion-label>Compress Chat Messages</ion-label>\n                  <ion-checkbox [(ngModel)]="compressChat"></ion-checkbox>\n                </ion-item>\n              </ion-list>\n            </ion-card-content>\n          </ion-card>\n        </ion-col>\n\n        <ion-col col-12>\n          <ion-card>\n            <ion-card-header>Helpful Information</ion-card-header>\n            <ion-card-content>\n              <ion-list>\n                <ion-item>\n                  <ion-avatar item-left>\n                    <ion-icon name="bug"></ion-icon>\n                  </ion-avatar>\n                  <h2>Version {{ version }}</h2>\n                </ion-item>\n\n                <ion-item text-wrap>\n                  <ion-avatar item-left>\n                    <ion-icon name="information-circle"></ion-icon>\n                  </ion-avatar>\n                  <h2><a target="_blank" href="https://github.com/IdleLands/IdleLands/wiki">Wiki</a></h2>\n                  <p>Includes New Player Information, FAQ, Guides, and more!</p>\n                </ion-item>\n\n                <ion-item text-wrap>\n                  <ion-avatar item-left>\n                    <ion-icon name="compass"></ion-icon>\n                  </ion-avatar>\n                  <h2><a target="_blank" href="http://global.idle.land">Global IdleLands</a></h2>\n                  <p>Features player/pet/map lookup, global leaderboards, and statistics!</p>\n                </ion-item>\n\n                <ion-item text-wrap>\n                  <ion-avatar item-left>\n                    <ion-icon name="logo-rss"></ion-icon>\n                  </ion-avatar>\n                  <h2><a target="_blank" href="http://blog.idle.land">Blog</a></h2>\n                  <p>Check out the latest blog posts to keep up with the news!</p>\n                </ion-item>\n\n                <ion-item text-wrap>\n                  <ion-avatar item-left>\n                    <ion-icon name="logo-facebook"></ion-icon>\n                  </ion-avatar>\n                  <h2><a target="_blank" href="https://facebook.com/IdleLands">Facebook</a></h2>\n                  <p>Like the Facebook page for updates and pictures about the game!</p>\n                </ion-item>\n\n                <ion-item text-wrap>\n                  <ion-avatar item-left>\n                    <ion-icon name="logo-twitter"></ion-icon>\n                  </ion-avatar>\n                  <h2><a target="_blank" href="https://twitter.com/IdleLands">Twitter</a></h2>\n                  <p>Follow IdleLands on Twitter!</p>\n                </ion-item>\n\n                <ion-item text-wrap>\n                  <ion-avatar item-left>\n                    <ion-icon name="logo-reddit"></ion-icon>\n                  </ion-avatar>\n                  <h2><a target="_blank" href="http://reddit.com/r/idle_lands">Reddit</a></h2>\n                  <p>Discuss the game on reddit!</p>\n                </ion-item>\n\n                <ion-item text-wrap>\n                  <ion-avatar item-left>\n                    <ion-icon name="logo-github"></ion-icon>\n                  </ion-avatar>\n                  <h2><a target="_blank" href="https://github.com/IdleLands/IdleLands/issues">GitHub</a></h2>\n                  <p>File bugs or request features on GitHub!</p>\n                </ion-item>\n\n              </ion-list>\n            </ion-card-content>\n          </ion-card>\n\n          <ion-card>\n            <ion-card-header>Donations</ion-card-header>\n            <ion-card-content text-center>\n              <p><strong>Contributions:</strong></p>\n              <div *ngFor="let cont of thanks">\n                {{ cont.name }} - {{ cont.reason }}\n              </div>\n\n              <br>\n\n              <p><strong>Want to help?</strong></p>\n              <p>All support goes directly to the game and servers! Thanks in advance!</p>\n              <p>Please visit <a href="https://github.com/IdleLands/IdleLands/wiki/Contributor-and-Donator-Perks" target="_blank">this wiki page</a> to see the perks of donating! Additionally, <strong>please include your chosen sprite and message in your donation notes</strong>, it makes it easier and faster to get you in the Hall of Heroes!</p>\n\n              <br>\n\n              <form target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post" #paypal>\n                <input type="hidden" name="cmd" value="_s-xclick">\n                <input type="hidden" name="custom" value="{{player.name}}">\n                <input type="hidden" name="invoice" value="{{player.name}}">\n                <input type="hidden" name="item_name" value="{{player.name}}">\n                <input type="hidden" name="item_number" value="{{player.name}}">\n                <input type="hidden" name="hosted_button_id" value="TF5HJJLVYWMQU">\n                <input (click)="paypal.submit()" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\n                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\n              </form>\n            </ion-card-content>\n          </ion-card>\n        </ion-col>\n\n      </ion-row>\n    </ion-col>\n\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/settings/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_4__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map