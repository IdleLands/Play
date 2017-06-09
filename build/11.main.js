webpackJsonp([11],{

/***/ 1283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__equipment__ = __webpack_require__(1302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_components_module__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentPageModule", function() { return EquipmentPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EquipmentPageModule = (function () {
    function EquipmentPageModule() {
    }
    return EquipmentPageModule;
}());
EquipmentPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__equipment__["a" /* EquipmentPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2__components_components_module__["a" /* GlobalComponentsModule */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__equipment__["a" /* EquipmentPage */])],
    })
], EquipmentPageModule);

//# sourceMappingURL=equipment.module.js.map

/***/ }),

/***/ 1302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_play_component__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquipmentPage; });
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





var EquipmentPage = (function (_super) {
    __extends(EquipmentPage, _super);
    function EquipmentPage(appState, primus, navCtrl) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.equippedItemButtons = [
            { name: 'To Pet', callback: function (item) { return _this.primus.giveItemToPet(item.id); } }
        ];
        return _this;
    }
    EquipmentPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.equipment$ = this.appState.equipment.subscribe(function (data) {
            _this.setEquipment(data);
        });
        this.primus.requestEquipment();
    };
    EquipmentPage.prototype.ngOnDestroy = function () {
        this.equipment$.unsubscribe();
    };
    EquipmentPage.prototype.getTotalItem = function () {
        var totalItem = {
            name: 'Equipment Totals',
            type: 'total',
            itemClass: 'newbie'
        };
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.equipment, function (item) {
            var keys = __WEBPACK_IMPORTED_MODULE_0_lodash__["reject"](__WEBPACK_IMPORTED_MODULE_0_lodash__["keys"](item), function (key) {
                return !__WEBPACK_IMPORTED_MODULE_0_lodash__["isNumber"](item[key]) || key === 'foundAt' || key.includes('Req');
            });
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](keys, function (key) {
                if (!totalItem[key])
                    totalItem[key] = 0;
                totalItem[key] += item[key];
                if (totalItem[key] === 0)
                    delete totalItem[key];
            });
        });
        return totalItem;
    };
    EquipmentPage.prototype.setEquipment = function (data) {
        this.equipment = data || {};
        this.iterationOrder = __WEBPACK_IMPORTED_MODULE_0_lodash__["sortBy"](__WEBPACK_IMPORTED_MODULE_0_lodash__["keys"](data));
        this.equipment.total = this.getTotalItem();
    };
    return EquipmentPage;
}(__WEBPACK_IMPORTED_MODULE_4__components_play_component__["a" /* PlayComponent */]));
EquipmentPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'equipment'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-equipment',template:/*ion-inline-start:"c:\IdleLandsREAL\Play\src\pages\equipment\equipment.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      <button ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      IdleLands Equipment - {{ player.nameEdit || player.name }}\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <ion-card>\n\n    <ion-card-header>Adventurer Equipment (Max Item Score: {{ player.statCache.itemFindRange | number }})</ion-card-header>\n\n    <ion-card-content>\n\n      <ion-list>\n\n        <ion-item text-wrap>\n\n          <item [item]="equipment.total"></item>\n\n        </ion-item>\n\n        <ion-item text-wrap *ngFor="let slot of iterationOrder">\n\n          <item [item]="equipment[slot]" [buttons]="equippedItemButtons"></item>\n\n        </ion-item>\n\n      </ion-list>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"c:\IdleLandsREAL\Play\src\pages\equipment\equipment.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
], EquipmentPage);

//# sourceMappingURL=equipment.js.map

/***/ })

});
//# sourceMappingURL=11.main.js.map