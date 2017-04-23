webpackJsonp([13],{

/***/ 1324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collectibles__ = __webpack_require__(1343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectiblesPageModule", function() { return CollectiblesPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CollectiblesPageModule = (function () {
    function CollectiblesPageModule() {
    }
    return CollectiblesPageModule;
}());
CollectiblesPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__collectibles__["a" /* CollectiblesPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__collectibles__["a" /* CollectiblesPage */])],
    })
], CollectiblesPageModule);

//# sourceMappingURL=collectibles.module.js.map

/***/ }),

/***/ 1343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_play_component__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectiblesPage; });
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





var CollectiblesPage = (function (_super) {
    __extends(CollectiblesPage, _super);
    function CollectiblesPage(appState, primus, navCtrl) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.collectibles = [];
        return _this;
    }
    CollectiblesPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.collectibles$ = this.appState.collectibles.subscribe(function (data) {
            _this.parseCollectibleData(data);
        });
        this.primus.requestCollectibles();
    };
    CollectiblesPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.collectibles$.unsubscribe();
    };
    CollectiblesPage.prototype.parseCollectibleData = function (data) {
        var _this = this;
        var current = data.current, prior = data.prior;
        this.collectibles = __WEBPACK_IMPORTED_MODULE_0_lodash__(current)
            .sortBy('name')
            .each(function (coll) { return coll.count = 1; });
        __WEBPACK_IMPORTED_MODULE_0_lodash__(prior)
            .values()
            .sortBy('name')
            .each(function (coll) {
            var prev = __WEBPACK_IMPORTED_MODULE_0_lodash__["find"](_this.collectibles, { name: coll.name });
            if (prev) {
                prev.count += coll.count;
            }
            else {
                _this.collectibles.push(coll);
                coll._faded = true;
            }
        });
        var sum = __WEBPACK_IMPORTED_MODULE_0_lodash__["sumBy"](this.collectibles, 'count');
        var string = "Current Collectibles: " + current.length;
        if (current.length !== this.collectibles.length) {
            string += "<br>Total Collectibles: " + this.collectibles.length + "<br>Collectible Sum: " + sum;
        }
        this.updatePageData(string);
    };
    return CollectiblesPage;
}(__WEBPACK_IMPORTED_MODULE_4__components_play_component__["a" /* PlayComponent */]));
CollectiblesPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'collectibles'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-collectibles',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/collectibles/collectibles.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      IdleLands Collectibles - {{ player.nameEdit || player.name }}\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <div class="true-center max-space background-text" *ngIf="collectibles.length === 0">\n    You don\'t have any collectibles... yet!\n  </div>\n\n  <ion-list [virtualScroll]="collectibles" approxItemHeight="150px" approxItemWidth="33%" bufferRatio="12">\n    <div col-12 col-md-4 *virtualItem="let collectible">\n      <ion-card [class.faded]="collectible._faded" class="collectible-card">\n        <ion-card-header>\n          <div class="expand-header class-{{ collectible.rarity }}">{{ collectible.name }} (x{{ collectible.count }})</div>\n        </ion-card-header>\n        <ion-card-content>\n          <ion-list>\n            <ion-item no-padding><p>{{ collectible.storyline }}</p></ion-item>\n            <ion-item no-padding><p>{{ collectible.map }}: {{ collectible.region }}</p></ion-item>\n            <ion-item no-padding text-wrap class="collectible-description">{{ collectible.description }}</ion-item>\n          </ion-list>\n        </ion-card-content>\n      </ion-card>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/collectibles/collectibles.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
], CollectiblesPage);

//# sourceMappingURL=collectibles.js.map

/***/ })

});
//# sourceMappingURL=13.main.js.map