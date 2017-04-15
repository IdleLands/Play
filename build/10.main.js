webpackJsonp([10],{

/***/ 1325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__guild__ = __webpack_require__(1346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuildPageModule", function() { return GuildPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GuildPageModule = (function () {
    function GuildPageModule() {
    }
    return GuildPageModule;
}());
GuildPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__guild__["a" /* GuildPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__guild__["a" /* GuildPage */])],
    })
], GuildPageModule);

//# sourceMappingURL=guild.module.js.map

/***/ }),

/***/ 1346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_webstorage__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_play_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__guild_overview__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__guild_buildings__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guild_members__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__guild_manage__ = __webpack_require__(747);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuildPage; });
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









var GuildPage = (function (_super) {
    __extends(GuildPage, _super);
    function GuildPage(appState, primus, navCtrl, storage) {
        var _this = _super.call(this, appState, primus, navCtrl) || this;
        _this.appState = appState;
        _this.primus = primus;
        _this.navCtrl = navCtrl;
        _this.storage = storage;
        _this.defaultTab = 0;
        _this.memberBadge = '';
        _this.overviewRoot = __WEBPACK_IMPORTED_MODULE_5__guild_overview__["a" /* GuildOverviewPage */];
        _this.buildingsRoot = __WEBPACK_IMPORTED_MODULE_6__guild_buildings__["a" /* GuildBuildingsPage */];
        _this.membersRoot = __WEBPACK_IMPORTED_MODULE_7__guild_members__["a" /* GuildMembersPage */];
        _this.manageRoot = __WEBPACK_IMPORTED_MODULE_8__guild_manage__["a" /* GuildManagePage */];
        return _this;
    }
    GuildPage.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        var tab = this.storage.retrieve('currentGuildTab');
        this.defaultTab = tab;
        this.guild$ = this.appState.guild.subscribe(function (data) {
            _this.guild = data;
            if (_this.guild.members) {
                _this.memberBadge = _this.guild.members.length + "/" + _this.guild.maxMembers;
            }
            else {
                _this.memberBadge = '';
            }
        });
        this.primus.requestGuild();
    };
    GuildPage.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    GuildPage.prototype.changeTab = function (newTab) {
        this.storage.store('currentGuildTab', newTab.index);
    };
    return GuildPage;
}(__WEBPACK_IMPORTED_MODULE_4__components_play_component__["a" /* PlayComponent */]));
GuildPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        segment: 'guild'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-guild',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/guild/guild.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      IdleLands Guild - {{ guild.name || player.nameEdit || player.name }} <span *ngIf="guild.tag">[{{ guild.tag }}]</span>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="no-scroll">\n  <ion-tabs #tabs tabsLayout="icon-left" (ionChange)="changeTab($event)" [selectedIndex]="defaultTab">\n\n    <ion-tab tabTitle="Overview" tabUrlPath=\'overview\' tabIcon="cube" [root]="overviewRoot"></ion-tab>\n\n    <ion-tab tabTitle="Members"\n             tabUrlPath=\'members\'\n             tabIcon="people"\n             [tabBadge]="memberBadge"\n             [enabled]="!guild.$noGuild && !player.guildInvite"\n             [root]="membersRoot"></ion-tab>\n\n    <ion-tab tabTitle="Buildings"\n             tabUrlPath=\'buildings\'\n             tabIcon="home"\n             [enabled]="!guild.$noGuild && !player.guildInvite"\n             [root]="buildingsRoot"></ion-tab>\n\n    <ion-tab tabTitle="Manage"\n             tabUrlPath=\'manage\'\n             tabIcon="cog"\n             [enabled]="!guild.$noGuild && !player.guildInvite && guild.$me && guild.$me.rank <= 3"\n             [root]="manageRoot"></ion-tab>\n  </ion-tabs>\n</ion-content>'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/guild/guild.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ng2_webstorage__["c" /* LocalStorageService */]])
], GuildPage);

//# sourceMappingURL=guild.js.map

/***/ })

});
//# sourceMappingURL=10.main.js.map