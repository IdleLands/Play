webpackJsonp([7],{

/***/ 1288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pets__ = __webpack_require__(1308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_components_module__ = __webpack_require__(699);
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

/***/ 1308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_play_component__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pets_items__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pets_overview__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_webstorage__ = __webpack_require__(62);
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
    function PetsPage(appState, primus, navCtrl, menuCtrl, alertCtrl, theme, storage) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.menuCtrl = menuCtrl;
        _this.alertCtrl = alertCtrl;
        _this.theme = theme;
        _this.storage = storage;
        _this.overviewRoot = __WEBPACK_IMPORTED_MODULE_6__pets_overview__["a" /* PetsOverviewPage */];
        _this.itemsRoot = __WEBPACK_IMPORTED_MODULE_5__pets_items__["a" /* PetsItemsPage */];
        _this.inventoryBadge = '';
        _this.petbasic = [];
        _this.petactive = new __WEBPACK_IMPORTED_MODULE_7__models__["c" /* PetActive */]();
        _this.petbuy = {};
        _this.premium = new __WEBPACK_IMPORTED_MODULE_7__models__["a" /* Premium */]();
        _this.defaultTab = 0;
        return _this;
    }
    PetsPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.petbasic$ = this.appState.petbasic.subscribe(function (data) { return _this.petbasic = data; });
        this.petactive$ = this.appState.petactive.subscribe(function (data) { return _this.setPetActive(data); });
        this.petbuy$ = this.appState.petbuy.subscribe(function (data) { return _this.petbuy = data; });
        this.premium$ = this.appState.premium.subscribe(function (data) { return _this.premium = data; });
        var tab = this.storage.retrieve('currentPetTab');
        this.defaultTab = tab;
        this.menuCtrl.enable(false, 'chat');
        this.menuCtrl.enable(true, 'pets');
    };
    PetsPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.petbasic$.unsubscribe();
        this.petactive$.unsubscribe();
        this.petbuy$.unsubscribe();
        this.premium$.unsubscribe();
    };
    PetsPage.prototype.togglePetMenu = function () {
        this.menuCtrl.toggle('right');
    };
    Object.defineProperty(PetsPage.prototype, "shouldShowPetMenu", {
        get: function () {
            return this.petPageContent._elementRef.nativeElement.offsetWidth > 768;
        },
        enumerable: true,
        configurable: true
    });
    PetsPage.prototype.setPetActive = function (petactive) {
        this.hasPet = !!petactive.name;
        this.petactive = petactive;
        this.petEquipment = __WEBPACK_IMPORTED_MODULE_0_lodash__["flatten"](__WEBPACK_IMPORTED_MODULE_0_lodash__["values"](petactive.equipment));
        this.inventoryBadge = this.setBadge(petactive);
    };
    PetsPage.prototype.makeActive = function (petType) {
        this.primus.makePetActive(petType);
    };
    PetsPage.prototype.buyPet = function (petType) {
        var _this = this;
        this.alertCtrl.create({
            cssClass: this.theme.currentTheme,
            title: 'Adopt Pet',
            message: "What would you like to call your pet " + petType + "?",
            inputs: [{
                    name: 'name',
                    placeholder: 'Pet Name'
                }],
            buttons: [
                { text: 'Cancel' },
                { text: 'Buy', handler: function (data) {
                        _this.primus.buyPet(petType, data.name);
                    } }
            ]
        }).present();
    };
    PetsPage.prototype.renamePet = function (petType, currentName) {
        var _this = this;
        this.alertCtrl.create({
            cssClass: this.theme.currentTheme,
            title: 'Rename Pet',
            message: "What would you like to call your pet " + petType + "?",
            inputs: [{
                    name: 'name',
                    placeholder: 'Pet Name',
                    value: currentName
                }],
            buttons: [
                { text: 'Cancel' },
                { text: 'Rename', handler: function (data) {
                        _this.primus.renamePet(petType, data.name);
                    } }
            ]
        }).present();
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
}(__WEBPACK_IMPORTED_MODULE_4__components_play_component__["a" /* PlayComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('petPageContent'),
    __metadata("design:type", Object)
], PetsPage.prototype, "petPageContent", void 0);
PetsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'pets'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-pets',template:/*ion-inline-start:"c:\IdleLandsREAL\Play\src\pages\pets\pets.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      <button ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      IdleLands Pets - {{ player.nameEdit || player.name }}\n\n    </ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="togglePetMenu()" class="pet-toggle">\n\n        <ion-icon name="paw"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content class="no-scroll" #petPageContent>\n\n  <ion-split-pane [when]="shouldShowPetMenu" side="right">\n\n\n\n    <ion-content #petPage class="no-scroll">\n\n      <ion-toolbar *ngIf="hasPet" color="primary">\n\n        <ion-title class="pet-title">\n\n          {{ petactive.name }}, Level {{ petactive._level.__current }} {{ petactive.professionName }}\n\n        </ion-title>\n\n      </ion-toolbar>\n\n\n\n      <ion-tabs #tabs tabsLayout="icon-left" (ionChange)="changeTab($event)" [selectedIndex]="defaultTab">\n\n        <ion-tab tabTitle="Overview" tabUrlPath=\'overview\' tabIcon="leaf" [root]="overviewRoot"></ion-tab>\n\n        <ion-tab tabTitle="Items" tabUrlPath=\'items\' tabIcon="color-wand" [tabBadge]="inventoryBadge" [enabled]="hasPet" [root]="itemsRoot"></ion-tab>\n\n      </ion-tabs>\n\n    </ion-content>\n\n\n\n    <ion-menu [content]="petPage" side="right" id="pets" type="overlay">\n\n      <ion-header>\n\n        <ion-toolbar color="primary">\n\n          <ion-title>Pets</ion-title>\n\n        </ion-toolbar>\n\n      </ion-header>\n\n\n\n      <ion-content>\n\n        <ion-list no-margin>\n\n\n\n          <ion-card class="pet-card" *ngIf="petbasic.length < 1">\n\n            <ion-card-content>\n\n              <h1>You don\'t have any pets right now. Check back later!</h1>\n\n            </ion-card-content>\n\n          </ion-card>\n\n\n\n          <ion-card class="pet-card" *ngFor="let petOption of petbasic">\n\n\n\n            <ion-card-header>\n\n              {{ petOption.bought ? petOption.petName : petOption.name }}\n\n            </ion-card-header>\n\n\n\n            <ion-card-content *ngIf="!petOption.bought">\n\n              <div>Cost: {{ petbuy[petOption.name].cost | number }} Gold</div>\n\n              <p>{{ petbuy[petOption.name].description }}</p>\n\n            </ion-card-content>\n\n\n\n            <ion-card-content *ngIf="petOption.bought">\n\n              <div>{{ petOption.name }}</div>\n\n              <p>Level {{ petOption.level }} {{ petOption.profession }}</p>\n\n            </ion-card-content>\n\n\n\n            <ion-row>\n\n              <ion-col *ngIf="petOption.bought">\n\n                <button ion-button clear small color="primary" (click)="makeActive(petOption.name)" [disabled]="petactive.$petId === petOption.name">\n\n                  {{ petactive.$petId === petOption.name ? \'Active\' : \'Make Active\' }}\n\n                </button>\n\n              </ion-col>\n\n              <ion-col *ngIf="petOption.bought && premium.consumables.renameTagPet > 0">\n\n                <button ion-button clear small color="primary" (click)="renamePet(petOption.name, petOption.petName)">\n\n                  Rename\n\n                </button>\n\n              </ion-col>\n\n              <ion-col *ngIf="!petOption.bought">\n\n                <button ion-button clear small color="primary" (click)="buyPet(petOption.name)" [disabled]="player.gold < petbuy[petOption.name].cost">\n\n                  Buy Pet\n\n                </button>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-card>\n\n        </ion-list>\n\n      </ion-content>\n\n    </ion-menu>\n\n\n\n  </ion-split-pane>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\IdleLandsREAL\Play\src\pages\pets\pets.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__services__["e" /* Theme */],
        __WEBPACK_IMPORTED_MODULE_8_ng2_webstorage__["c" /* LocalStorageService */]])
], PetsPage);

//# sourceMappingURL=pets.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map