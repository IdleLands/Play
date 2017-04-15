webpackJsonp([12],{

/***/ 1323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__create__ = __webpack_require__(1344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePageModule", function() { return CreatePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CreatePageModule = (function () {
    function CreatePageModule() {
    }
    return CreatePageModule;
}());
CreatePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__create__["a" /* CreatePage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__create__["a" /* CreatePage */])],
    })
], CreatePageModule);

//# sourceMappingURL=create.module.js.map

/***/ }),

/***/ 1344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(28);
throw new Error("Cannot find module \"../../pages\"");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreatePage = (function () {
    function CreatePage(primus, theme, alertCtrl, navCtrl) {
        this.primus = primus;
        this.theme = theme;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.baseClasses = [
            { name: 'Generalist', desc: 'You excel at nothing, but generally, you can hold your own.' },
            { name: 'Mage', desc: 'You get a kick out of slinging fireballs at everything.' },
            { name: 'Cleric', desc: 'You like not dying and also keeping your party members alive.' },
            { name: 'Fighter', desc: 'You really like hitting things with a big stick.' }
        ];
        this.baseGenders = [
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' }
        ];
        this.character = { name: '', professionName: '', gender: '' };
    }
    CreatePage.prototype.ngOnInit = function () {
        this.primus.requestNoKill();
    };
    CreatePage.prototype.doRegister = function () {
        var _this = this;
        this.character.name = __WEBPACK_IMPORTED_MODULE_0_lodash__["truncate"](this.character.name, { length: 20 }).trim().replace(/[^\w\dÀ-ÿ ]/gm, '');
        this.alertCtrl.create({
            cssClass: this.theme.currentTheme,
            title: 'Register?',
            message: "Would you like to begin your adventure as " + this.character.name + ", the " + this.character.gender + " " + this.character.professionName + "?",
            buttons: [
                {
                    text: 'No'
                },
                {
                    text: 'Yes, let\'s do it!',
                    handler: function () {
                        _this.primus.register(_this.character)
                            .then(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages__["OverviewPage"]);
                        })
                            .catch(function (e) { return console.error(e); });
                    }
                }
            ]
        }).present();
    };
    return CreatePage;
}());
CreatePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPage */])({
        segment: 'create'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-create',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/create/create.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Create Character</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item-divider>Character Name</ion-item-divider>\n\n    <ion-item>\n      <ion-input [(ngModel)]="character.name" placeholder="Character Name" type="text" maxlength="20" minlength="0"></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list radio-group [(ngModel)]="character.professionName">\n    <ion-item-divider>Character Class</ion-item-divider>\n    <ion-item *ngFor="let class of baseClasses">\n      <ion-label>\n        <h3>{{ class.name }}</h3>\n        <p>{{ class.desc }}</p>\n      </ion-label>\n      <ion-radio [value]="class.name"></ion-radio>\n    </ion-item>\n  </ion-list>\n\n  <ion-list radio-group [(ngModel)]="character.gender">\n    <ion-item-divider>Character Gender</ion-item-divider>\n    <ion-item *ngFor="let gender of baseGenders">\n      <ion-label>\n        <h3>{{ gender.name }}</h3>\n      </ion-label>\n      <ion-radio [value]="gender.value"></ion-radio>\n    </ion-item>\n  </ion-list>\n\n  <ion-list>\n    <button text-center\n            ion-item\n            block\n            color="primary"\n            [disabled]="!character.name || !character.gender || !character.professionName"\n            (click)="doRegister()">\n      Create Character\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/create/create.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_3__services__["e" /* Theme */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
], CreatePage);

//# sourceMappingURL=create.js.map

/***/ })

});
//# sourceMappingURL=12.main.js.map