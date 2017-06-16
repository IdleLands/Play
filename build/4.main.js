webpackJsonp([4],{

/***/ 1291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings__ = __webpack_require__(1311);
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

/***/ 1311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_webstorage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_play_component__ = __webpack_require__(52);
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
            return "c2fbdb2";
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
            .sortBy()
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
        selector: 'page-settings',template:/*ion-inline-start:"c:\IdleLandsREAL\Play\src\pages\settings\settings.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      <button ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      IdleLands Settings - {{ player.nameEdit || player.name }}\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-row wrap>\n\n\n\n    <ion-col col-md col-12>\n\n      <ion-card>\n\n        <ion-card-header>Adventurer Settings</ion-card-header>\n\n        <ion-card-content>\n\n          <ion-list>\n\n            <ion-item>\n\n              <ion-label stacked>Gender</ion-label>\n\n              <ion-select [(ngModel)]="player.gender" [selectOptions]="{ cssClass: \'theme-\' + theme }" (ionChange)="changeGender($event)">\n\n                <ion-option *ngFor="let gender of genders">{{ gender }}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label stacked>Title</ion-label>\n\n              <ion-select [(ngModel)]="player.title" [selectOptions]="{ cssClass: \'theme-\' + theme }" (ionChange)="changeTitle($event)">\n\n                <ion-option value="">None</ion-option>\n\n                <ion-option *ngFor="let title of titles">{{ title }}</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n\n\n            <ion-item-divider>Personalities</ion-item-divider>\n\n\n\n            <ion-item text-wrap *ngFor="let personality of personalities.earned">\n\n              <ion-label>\n\n                <h2>{{ personality.name }}</h2>\n\n                <p>{{ personality.description }}</p>\n\n              </ion-label>\n\n\n\n              <ion-checkbox [checked]="personalities.active[personality.name]" (ionChange)="togglePersonality(personality.name)"></ion-checkbox>\n\n            </ion-item>\n\n          </ion-list>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </ion-col>\n\n\n\n    <ion-col col-md col-12>\n\n      <ion-row wrap>\n\n\n\n        <ion-col col-12>\n\n          <ion-card>\n\n            <ion-card-header>Interface Settings</ion-card-header>\n\n            <ion-card-content>\n\n              <ion-list>\n\n                <ion-item>\n\n                  <ion-label stacked>Theme</ion-label>\n\n                  <ion-select [(ngModel)]="theme" [selectOptions]="{ cssClass: \'theme-\' + theme }">\n\n                    <ion-option *ngFor="let theme of themes" [value]="theme.val">{{ theme.name }}</ion-option>\n\n                  </ion-select>\n\n                </ion-item>\n\n\n\n                <ion-item>\n\n                  <ion-label>Show Favicon Notifications</ion-label>\n\n                  <ion-checkbox [(ngModel)]="faviconNotifications"></ion-checkbox>\n\n                </ion-item>\n\n\n\n                <ion-item>\n\n                  <ion-label>Compress Chat Messages</ion-label>\n\n                  <ion-checkbox [(ngModel)]="compressChat"></ion-checkbox>\n\n                </ion-item>\n\n              </ion-list>\n\n            </ion-card-content>\n\n          </ion-card>\n\n        </ion-col>\n\n\n\n        <ion-col col-12>\n\n          <ion-card>\n\n            <ion-card-header>Helpful Information</ion-card-header>\n\n            <ion-card-content>\n\n              <ion-list>\n\n                <ion-item>\n\n                  <ion-avatar item-left>\n\n                    <ion-icon name="bug"></ion-icon>\n\n                  </ion-avatar>\n\n                  <h2>Version {{ version }}</h2>\n\n                </ion-item>\n\n\n\n                <ion-item text-wrap>\n\n                  <ion-avatar item-left>\n\n                    <ion-icon name="information-circle"></ion-icon>\n\n                  </ion-avatar>\n\n                  <h2><a target="_blank" href="https://github.com/IdleLands/IdleLands/wiki">Wiki</a></h2>\n\n                  <p>Includes New Player Information, FAQ, Guides, and more!</p>\n\n                </ion-item>\n\n\n\n                <ion-item text-wrap>\n\n                  <ion-avatar item-left>\n\n                    <ion-icon name="compass"></ion-icon>\n\n                  </ion-avatar>\n\n                  <h2><a target="_blank" href="http://global.idle.land">Global IdleLands</a></h2>\n\n                  <p>Features player/pet/map lookup, global leaderboards, and statistics!</p>\n\n                </ion-item>\n\n\n\n                <ion-item text-wrap>\n\n                  <ion-avatar item-left>\n\n                    <ion-icon name="logo-rss"></ion-icon>\n\n                  </ion-avatar>\n\n                  <h2><a target="_blank" href="http://blog.idle.land">Blog</a></h2>\n\n                  <p>Check out the latest blog posts to keep up with the news!</p>\n\n                </ion-item>\n\n\n\n                <ion-item text-wrap>\n\n                  <ion-avatar item-left>\n\n                    <ion-icon name="logo-facebook"></ion-icon>\n\n                  </ion-avatar>\n\n                  <h2><a target="_blank" href="https://facebook.com/IdleLands">Facebook</a></h2>\n\n                  <p>Like the Facebook page for updates and pictures about the game!</p>\n\n                </ion-item>\n\n\n\n                <ion-item text-wrap>\n\n                  <ion-avatar item-left>\n\n                    <ion-icon name="logo-twitter"></ion-icon>\n\n                  </ion-avatar>\n\n                  <h2><a target="_blank" href="https://twitter.com/IdleLands">Twitter</a></h2>\n\n                  <p>Follow IdleLands on Twitter!</p>\n\n                </ion-item>\n\n\n\n                <ion-item text-wrap>\n\n                  <ion-avatar item-left>\n\n                    <ion-icon name="logo-reddit"></ion-icon>\n\n                  </ion-avatar>\n\n                  <h2><a target="_blank" href="http://reddit.com/r/idle_lands">Reddit</a></h2>\n\n                  <p>Discuss the game on reddit!</p>\n\n                </ion-item>\n\n\n\n                <ion-item text-wrap>\n\n                  <ion-avatar item-left>\n\n                    <ion-icon name="logo-github"></ion-icon>\n\n                  </ion-avatar>\n\n                  <h2><a target="_blank" href="https://github.com/IdleLands/IdleLands/issues">GitHub</a></h2>\n\n                  <p>File bugs or request features on GitHub!</p>\n\n                </ion-item>\n\n\n\n              </ion-list>\n\n            </ion-card-content>\n\n          </ion-card>\n\n\n\n          <ion-card>\n\n            <ion-card-header>Donations</ion-card-header>\n\n            <ion-card-content text-center>\n\n              <p><strong>Contributions:</strong></p>\n\n              <div *ngFor="let cont of thanks">\n\n                {{ cont.name }} - {{ cont.reason }}\n\n              </div>\n\n\n\n              <br>\n\n\n\n              <p><strong>Want to help?</strong></p>\n\n              <p>All support goes directly to the game and servers! Thanks in advance!</p>\n\n              <p>Please visit <a href="https://github.com/IdleLands/IdleLands/wiki/Contributor-and-Donator-Perks" target="_blank">this wiki page</a> to see the perks of donating! Additionally, <strong>please include your chosen sprite and message in your donation notes</strong>, it makes it easier and faster to get you in the Hall of Heroes!</p>\n\n\n\n              <br>\n\n\n\n              <form target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post" #paypal>\n\n                <input type="hidden" name="cmd" value="_s-xclick">\n\n                <input type="hidden" name="custom" value="{{player.name}}">\n\n                <input type="hidden" name="invoice" value="{{player.name}}">\n\n                <input type="hidden" name="item_name" value="{{player.name}}">\n\n                <input type="hidden" name="item_number" value="{{player.name}}">\n\n                <input type="hidden" name="hosted_button_id" value="TF5HJJLVYWMQU">\n\n                <input (click)="paypal.submit()" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\n\n                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\n\n              </form>\n\n            </ion-card-content>\n\n          </ion-card>\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n    </ion-col>\n\n\n\n  </ion-row>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\IdleLandsREAL\Play\src\pages\settings\settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_4__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map