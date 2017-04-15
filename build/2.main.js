webpackJsonp([2],{

/***/ 1333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__statistics__ = __webpack_require__(1357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__statistics_tree_component__ = __webpack_require__(1356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(38);
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
        declarations: [__WEBPACK_IMPORTED_MODULE_1__statistics__["a" /* StatisticsPage */], __WEBPACK_IMPORTED_MODULE_2__statistics_tree_component__["a" /* StatisticsTreeComponent */]],
        imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__statistics__["a" /* StatisticsPage */])],
    })
], SettingsPageModule);

//# sourceMappingURL=statistics.module.js.map

/***/ }),

/***/ 1356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatisticsTreeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StatisticsTreeComponent = (function () {
    function StatisticsTreeComponent() {
        this.treeData = [];
    }
    return StatisticsTreeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], StatisticsTreeComponent.prototype, "treeData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], StatisticsTreeComponent.prototype, "isFirst", void 0);
StatisticsTreeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'statistics-tree',
        styles: ["\n    :host ul {\n      list-style-type: none;\n    }\n    \n    :host ul:not(.is-first) {\n      margin-left: -20px;\n    }\n    \n    :host ul.is-first {\n      padding-left: 0;\n    }\n  "],
        template: "\n    <ul [class.is-first]=\"isFirst\">\n      <li *ngFor=\"let node of treeData\">\n        <strong>{{ node.name }}</strong> {{ node.val | number }}\n        <statistics-tree [treeData]=\"node.children\"></statistics-tree>\n      </li>\n    </ul>\n  "
    })
], StatisticsTreeComponent);

//# sourceMappingURL=statistics-tree.component.js.map

/***/ }),

/***/ 1357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_play_component__ = __webpack_require__(78);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatisticsPage; });
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





var StatisticsPage = (function (_super) {
    __extends(StatisticsPage, _super);
    function StatisticsPage(appState, primus, navCtrl) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.ignoreRecurseKeys = ['BossKills', 'Maps', 'Regions'];
        return _this;
    }
    StatisticsPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.statistics$ = this.appState.statistics.subscribe(function (data) {
            _this.setStatistics(data);
        });
        this.primus.requestStatistics();
    };
    StatisticsPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.statistics$.unsubscribe();
    };
    StatisticsPage.prototype.setStatistics = function (data) {
        var _this = this;
        var BossKills = __WEBPACK_IMPORTED_MODULE_0_lodash__["get"](data, 'Character.BossKills', {});
        var Maps = __WEBPACK_IMPORTED_MODULE_0_lodash__["get"](data, 'Character.Maps', {});
        var Regions = __WEBPACK_IMPORTED_MODULE_0_lodash__["get"](data, 'Character.Regions', {});
        data.BossKills = BossKills;
        data.Maps = Maps;
        data.Regions = Regions;
        var recurse = function (obj, isRoot) {
            if (isRoot === void 0) { isRoot = false; }
            return __WEBPACK_IMPORTED_MODULE_0_lodash__["map"](obj, function (val, key) {
                var baseObj = {};
                if (!isRoot && __WEBPACK_IMPORTED_MODULE_0_lodash__["includes"](_this.ignoreRecurseKeys, key))
                    return {};
                baseObj.name = key;
                if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isObject"](val)) {
                    baseObj.children = recurse(val);
                }
                else {
                    baseObj.val = val;
                }
                return baseObj;
            });
        };
        var sortAll = function (data) {
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](data, function (obj) {
                if (!obj.children)
                    return;
                obj.children = sortAll(obj.children);
            });
            return __WEBPACK_IMPORTED_MODULE_0_lodash__["sortBy"](data, 'name');
        };
        this.statistics = __WEBPACK_IMPORTED_MODULE_0_lodash__["reduce"](__WEBPACK_IMPORTED_MODULE_0_lodash__["reject"](sortAll(recurse(data, true)), function (item) { return item.val; }), function (prev, item) {
            prev[item.name] = item;
            return prev;
        }, {});
    };
    return StatisticsPage;
}(__WEBPACK_IMPORTED_MODULE_4__components_play_component__["a" /* PlayComponent */]));
StatisticsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'statistics'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-statistics',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/statistics/statistics.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>IdleLands Statistics - {{ player.nameEdit || player.name }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-row>\n\n    <ion-col col-12 col-sm>\n      <ion-card *ngIf="statistics.Game">\n        <ion-card-header>Game</ion-card-header>\n        <ion-card-content>\n          <statistics-tree [treeData]="statistics.Game.children" [isFirst]="true"></statistics-tree>\n        </ion-card-content>\n      </ion-card>\n\n      <ion-card *ngIf="statistics.Character">\n        <ion-card-header>Character</ion-card-header>\n        <ion-card-content>\n          <statistics-tree [treeData]="statistics.Character.children" [isFirst]="true"></statistics-tree>\n        </ion-card-content>\n      </ion-card>\n    </ion-col>\n\n    <ion-col col-12 col-sm>\n      <ion-card *ngIf="statistics.Regions">\n        <ion-card-header>Regions</ion-card-header>\n        <ion-card-content>\n          <statistics-tree [treeData]="statistics.Regions.children" [isFirst]="true"></statistics-tree>\n        </ion-card-content>\n      </ion-card>\n\n      <ion-card *ngIf="statistics.Maps">\n        <ion-card-header>Maps</ion-card-header>\n        <ion-card-content>\n          <statistics-tree [treeData]="statistics.Maps.children" [isFirst]="true"></statistics-tree>\n        </ion-card-content>\n      </ion-card>\n    </ion-col>\n\n    <ion-col col-12 col-sm>\n      <ion-card *ngIf="statistics.BossKills">\n        <ion-card-header>Boss Kills</ion-card-header>\n        <ion-card-content>\n          <statistics-tree [treeData]="statistics.BossKills.children" [isFirst]="true"></statistics-tree>\n        </ion-card-content>\n      </ion-card>\n\n      <ion-card *ngIf="statistics.Combat">\n        <ion-card-header>Combat</ion-card-header>\n        <ion-card-content>\n          <statistics-tree [treeData]="statistics.Combat.children" [isFirst]="true"></statistics-tree>\n        </ion-card-content>\n      </ion-card>\n    </ion-col>\n\n  </ion-row>\n\n</ion-content>'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/statistics/statistics.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
], StatisticsPage);

//# sourceMappingURL=statistics.js.map

/***/ })

});
//# sourceMappingURL=2.main.js.map