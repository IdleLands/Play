webpackJsonp([9],{

/***/ 1283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home__ = __webpack_require__(1302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(697);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = (function () {
    function HomePageModule() {
    }
    return HomePageModule;
}());
HomePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__home__["a" /* HomePage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_3__components_components_module__["b" /* ComponentsModule */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__home__["a" /* HomePage */])],
    })
], HomePageModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 1302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, auth, primus) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.primus = primus;
    }
    HomePage.prototype.login = function () {
        var _this = this;
        this.auth.login()
            .then(function () {
            _this.play();
        })
            .catch(function (e) {
            __WEBPACK_IMPORTED_MODULE_2__services__["g" /* Logger */].error(e);
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.auth.logout()
            .then(function () {
            _this.primus.disconnectSocket();
        })
            .catch(function (e) {
            __WEBPACK_IMPORTED_MODULE_2__services__["g" /* Logger */].error(e);
        });
    };
    HomePage.prototype.privacy = function () {
        this.navCtrl.push('PrivacyPage');
    };
    HomePage.prototype.play = function () {
        this.navCtrl.push('ConnectPage');
    };
    return HomePage;
}());
HomePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        segment: 'home'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>IdleLands - Home</ion-title>\n\n    <ion-buttons start>\n      <a ion-button icon-left solid color="primary" (click)="privacy()">\n        <ion-icon name="lock"></ion-icon> Privacy Policy\n      </a>\n      <a ion-button icon-left solid color="primary" href="http://blog.idle.land" target="_blank">\n        <ion-icon name="logo-rss"></ion-icon> Blog\n      </a>\n    </ion-buttons>\n\n    <ion-buttons end>\n      <button ion-button icon-left solid color="primary" (click)="play()" *ngIf="auth.authenticated">\n        <ion-icon name="game-controller-b"></ion-icon> Play\n      </button>\n\n      <button ion-button icon-left solid color="primary" (click)="login()" *ngIf="!auth.authenticated">\n        <ion-icon name="log-in"></ion-icon> Login\n      </button>\n\n      <button ion-button icon-left solid color="primary" (click)="logout()" *ngIf="auth.authenticated">\n        <ion-icon name="log-out"></ion-icon> Logout\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center>\n        <h1>Welcome to IdleLands</h1>\n      </ion-col>\n    </ion-row>\n\n    <ion-row padding>\n      <ion-col padding text-center>\n        <h3 class="unbold">\n          IdleLands is a great game about idling, finding cool loot, and laughing at the crazy things that happen.\n        </h3>\n        <h4 class="unbold">\n          IdleLands can run with no player interaction, but there are many ways you can guide your character through the world of Idliathlia.\n        </h4>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col offset-md-3 col-md-6>\n        <button ion-button block icon-left color="primary" (click)="login()">\n          <ion-icon name="log-in"></ion-icon> Sign Up or Login\n        </button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row padding>\n      <ion-col col-md-6 col-xs-12 offset-md-3>\n        <reddit-news></reddit-news>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-sm-12 col-sm-6 col-md-4 padding>\n        <ion-card>\n\n          <ion-card-header>\n            <h1>Online Multiplayer</h1>\n          </ion-card-header>\n\n          <ion-card-content>\n            <p>Don\'t want to play alone? That\'s perfect! Join many other players and play IdleLands in the same world. Explore and slay monsters together!</p>\n          </ion-card-content>\n\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-sm-12 col-sm-6 col-md-4 padding>\n        <ion-card>\n\n          <ion-card-header>\n            <h1>Massive World</h1>\n          </ion-card-header>\n\n          <ion-card-content>\n            <p>Explore a massive, hand-crafted and lore-rich world with over 150 "Collectibles" and 100 unique regions spread across 50 maps!</p>\n          </ion-card-content>\n\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-sm-12 col-sm-6 col-md-4 padding>\n        <ion-card>\n\n          <ion-card-header>\n            <h1>Global Leaderboard</h1>\n          </ion-card-header>\n\n          <ion-card-content>\n            <p>Into competition? Awesome. We have a <a href="http://global.idle.land/leaderboard" target="_blank">leaderboard</a> and many other features (like game-wide <a href="http://global.idle.land/statistics" target="_blank">statistics</a>) that span the whole game. Check it out!</p>\n          </ion-card-content>\n\n        </ion-card>\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-sm-12 col-sm-6 col-md-4 padding>\n        <ion-card>\n\n          <ion-card-header>\n            <h1>In-Depth Help</h1>\n          </ion-card-header>\n\n          <ion-card-content>\n            <p>No matter if you need help getting started, understanding some aspects of the game, or want to find information, our <a href="https://github.com/IdleLands/IdleLands/wiki" target="_blank">wiki</a> has you covered!</p>\n          </ion-card-content>\n\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-sm-12 col-sm-6 col-md-4 padding>\n        <ion-card>\n\n          <ion-card-header>\n            <h1>Sign Up Now</h1>\n          </ion-card-header>\n\n          <ion-card-content>\n            <p>Registration is easy - just a few clicks and you\'re in the game. Plus, it\'s handled by Auth0, so you know it\'s secured with the latest technologies.</p>\n          </ion-card-content>\n\n        </ion-card>\n      </ion-col>\n\n      <ion-col col-sm-12 col-sm-6 col-md-4 padding text-center>\n        <div padding>\n          <button ion-button icon-left color="primary" (click)="login()">\n            <ion-icon name="log-in"></ion-icon> Sign Up\n          </button>\n\n          <a ion-button clear width="150" height="50" href="https://auth0.com/?utm_source=oss&amp;utm_medium=gp&amp;utm_campaign=oss" target="_blank" alt="Single Sign On &amp; Token Based Authentication - Auth0"><img width="150" height="50" alt="JWT Auth for open source projects" src="//cdn.auth0.com/oss/badges/a0-badge-light.png"></a>\n        </div>\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__services__["b" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_2__services__["c" /* Primus */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=9.main.js.map