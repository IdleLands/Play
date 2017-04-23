webpackJsonp([7],{

/***/ 1332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pets__ = __webpack_require__(1352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_components_module__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PetsPageModule", function() { return PetsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PetsPageModule = (function () {
    function PetsPageModule() {
    }
    return PetsPageModule;
}());
PetsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__pets__["a" /* PetsPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2__components_components_module__["a" /* GlobalComponentsModule */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__pets__["a" /* PetsPage */])]
    })
], PetsPageModule);

//# sourceMappingURL=pets.module.js.map

/***/ }),

/***/ 1352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_play_component__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pets_items__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pets_overview__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_webstorage__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PetsPage; });
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







var PetsPage = (function (_super) {
    __extends(PetsPage, _super);
    function PetsPage(appState, primus, navCtrl, storage) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.storage = storage;
        _this.overviewRoot = __WEBPACK_IMPORTED_MODULE_5__pets_overview__["a" /* PetsOverviewPage */];
        _this.itemsRoot = __WEBPACK_IMPORTED_MODULE_4__pets_items__["a" /* PetsItemsPage */];
        _this.inventoryBadge = '';
        _this.defaultTab = 0;
        return _this;
    }
    PetsPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.petactive$ = this.appState.petactive.subscribe(function (data) {
            _this.inventoryBadge = _this.setBadge(data);
            _this.hasPet = !!data.name;
        });
        var tab = this.storage.retrieve('currentPetTab');
        this.defaultTab = tab;
    };
    PetsPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.petactive$.unsubscribe();
    };
    PetsPage.prototype.changeTab = function (newTab) {
        this.storage.store('currentPetTab', newTab.index);
    };
    PetsPage.prototype.setBadge = function (data) {
        if (!data.scaleLevel)
            return '';
        return data.inventory.length + "/" + data.$scale.inventory[data.scaleLevel.inventory];
    };
    return PetsPage;
}(__WEBPACK_IMPORTED_MODULE_3__components_play_component__["a" /* PlayComponent */]));
PetsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        segment: 'pets'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-pets',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/pets/pets.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      IdleLands Pets - {{ player.nameEdit || player.name }}\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="no-scroll">\n  <ion-tabs #tabs tabsLayout="icon-left" (ionChange)="changeTab($event)" [selectedIndex]="defaultTab">\n    <ion-tab tabTitle="Overview" tabUrlPath=\'overview\' tabIcon="leaf" [root]="overviewRoot"></ion-tab>\n    <ion-tab tabTitle="Items" tabUrlPath=\'items\' tabIcon="color-wand" [tabBadge]="inventoryBadge" [enabled]="hasPet" [root]="itemsRoot"></ion-tab>\n  </ion-tabs>\n</ion-content>'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/pets/pets.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_2__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_6_ng2_webstorage__["c" /* LocalStorageService */]])
], PetsPage);

//# sourceMappingURL=pets.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map