webpackJsonp([3],{

/***/ 1325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connect__ = __webpack_require__(1344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(744);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectPageModule", function() { return ConnectPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ConnectPageModule = (function () {
    function ConnectPageModule() {
    }
    return ConnectPageModule;
}());
ConnectPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__connect__["a" /* ConnectPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_3__components_components_module__["b" /* ComponentsModule */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__connect__["a" /* ConnectPage */])],
    })
], ConnectPageModule);

//# sourceMappingURL=connect.module.js.map

/***/ }),

/***/ 1344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_webstorage__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__messages_json__ = __webpack_require__(1358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__messages_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__messages_json__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ConnectPage = (function () {
    function ConnectPage(navCtrl, navParams, appState, primus, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appState = appState;
        this.primus = primus;
        this.storage = storage;
        this.currentMessage = '';
    }
    ConnectPage.prototype.ngOnInit = function () {
        var _this = this;
        this.appState.loggedIn.next(false);
        this.appState.showSideMenu.next(false);
        this.onlineStatus$ = this.appState.onlineStatus.subscribe(function (onlineStatus) {
            _this.isOnline = onlineStatus === 'online';
            _this.handleLoggedInAndStatus();
        });
        this.loggedIn$ = this.appState.loggedIn.subscribe(function (loggedIn) {
            _this.loggedIn = loggedIn;
            _this.handleLoggedInAndStatus();
        });
        this.hasCharacter$ = this.appState.hasCharacter.subscribe(function (hasCharacter) {
            _this.hasCharacter = hasCharacter;
            _this.handleLoggedInAndStatus();
        });
        this.connectMessage$ = __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].timer(0, 1000).subscribe(function () {
            _this.currentMessage = __WEBPACK_IMPORTED_MODULE_3_lodash__["sample"](__WEBPACK_IMPORTED_MODULE_6__messages_json__);
        });
        this.timeout$ = setTimeout(function () { return _this._isTakingForever = true; }, 5000);
        this.primus.initSocket();
    };
    ConnectPage.prototype.refresh = function () {
        window.location.reload();
    };
    ConnectPage.prototype.handleLoggedInAndStatus = function () {
        if (!this.storage.retrieve('profile')) {
            this.navCtrl.setRoot('HomePage');
            return;
        }
        // can't be defined anywhere else or pages won't be instantiated
        var backrefPages = {
            OverviewPage: 'OverviewPage',
            EquipmentPage: 'EquipmentPage',
            AchievementsPage: 'AchievementsPage',
            CollectiblesPage: 'CollectiblesPage',
            StatisticsPage: 'StatisticsPage',
            ChatPage: 'ChatPage',
            MapPage: 'MapPage',
            PetsPage: 'PetsPage',
            PremiumPage: 'PremiumPage',
            SettingsPage: 'SettingsPage',
            BattlePage: 'BattlePage',
            GuildPage: 'GuildPage'
        };
        if (__WEBPACK_IMPORTED_MODULE_3_lodash__["isUndefined"](this.loggedIn)
            || __WEBPACK_IMPORTED_MODULE_3_lodash__["isUndefined"](this.isOnline)
            || __WEBPACK_IMPORTED_MODULE_3_lodash__["isUndefined"](this.hasCharacter)
            || !this.isOnline)
            return;
        if (!this.hasCharacter) {
            this.navCtrl.push('CreatePage');
        }
        else if (this.loggedIn) {
            var ref = this.navParams.get('fromPage') || 'OverviewPage';
            this.navCtrl.setRoot(backrefPages[ref]);
        }
    };
    ConnectPage.prototype.ngOnDestroy = function () {
        this.onlineStatus$.unsubscribe();
        this.loggedIn$.unsubscribe();
        this.connectMessage$.unsubscribe();
        clearTimeout(this.timeout$);
    };
    return ConnectPage;
}());
ConnectPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])({
        segment: 'connect'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-connect',template:/*ion-inline-start:"/Users/seiyria/GitHub/Play/src/pages/connect/connect.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Connecting to Server...</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-grid>\n\n    <ion-row>\n      <ion-col>\n        <div class="connecting-container">\n          <div>Connecting to Server...</div>\n          <div>{{ currentMessage }}...</div>\n          <br>\n          <div *ngIf="_isTakingForever">\n            <div>Hmmm... this is taking a while.</div>\n            <div><button ion-button outline color="primary" (click)="refresh()">Shall we try this again?</button></div>\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n\n    <ion-row padding>\n      <ion-col col-md-6 col-xs-12 offset-md-3>\n        <reddit-news></reddit-news>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/seiyria/GitHub/Play/src/pages/connect/connect.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__services__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_5__services__["c" /* Primus */],
        __WEBPACK_IMPORTED_MODULE_2_ng2_webstorage__["c" /* LocalStorageService */]])
], ConnectPage);

//# sourceMappingURL=connect.js.map

/***/ }),

/***/ 1358:
/***/ (function(module, exports) {

module.exports = [
	"Chlorinating Car Pools",
	"Partitioning Social Network",
	"Prelaminating Drywall Inventory",
	"Blurring Reality Lines",
	"Reticulating 3-Dimensional Splines",
	"Preparing Captive Simulators",
	"Capacitating Genetic Modifiers",
	"Destabilizing Orbital Payloads",
	"Sequencing Cinematic Specifiers",
	"Branching Family Trees",
	"Manipulating Modal Memory",
	"Pressurizing Fruit Punch Barrel Hydraulics",
	"Testing Underworld Telecommunications",
	"Priming Mascot Mischief Coefficients",
	"Caffeinating Student Body",
	"Initializing Secret Societies",
	"Securing Online Grades Database",
	"Reticulating Graduated Splines",
	"Requisitioning Alumni Donations",
	"Pre-Inking Simoleon Plates",
	"Loading School Spirit Algorithm",
	"Shampooing Dirty Rugs",
	"Restocking Sim Inventories",
	"Compositing Vampiric Complexions",
	"Replacing Wheel Bearings",
	"Re-Re-Re-Re-Re-Reticulating Splines",
	"Loading 'Vroom' Sounds",
	"Turning On Turn-Ons",
	"Preparing a Tasty Grilled Cheese Sandwich",
	"Infuriating Furious Bits",
	"Flavorizing Side-Dishes",
	"Disgruntling Employees",
	"Managing Managers', Managers",
	"Configuring Lemony Squeezation",
	"Preparing Bacon for Homeward Transportation",
	"Reticulated Splines for Sale: §2000",
	"Mitigating Time-Stream Discontinuities",
	"Loading 'First Batch' Metrics",
	"Initializing Forth-Rallying Protocol",
	"Neutralizing Shuriken Oxidization",
	"Roof = Roof(1/3*pi*r^2*h)",
	"Rasterizing Rodent Residences",
	"Limiting Litterbox Loads",
	"Scheduling Copious Catnaps",
	"Calibrating Canine Customization",
	"Dumbing Down Doofuses",
	"Scolding Splines for Reticulating",
	"Distilling Doggie Dynamics",
	"Atomizing Atomic Particles",
	"Decrementing Feline Life-Count",
	"Dampening Stray Generators",
	"Gleefully Stacking Inventories",
	"De-chlorophyllizing Leaves",
	"Predicting Puddle Prevalence",
	"Calculating Snowball Trajectories",
	"Unexpectedly Reticulating Splines",
	"Assessing Loam Particle Sizes",
	"Timing Temperature Transference",
	"Individualizing Snowflakes",
	"Hydrating Harvestables",
	"Stocking Ponds",
	"Readying Relaxation Receptors",
	"Predicting Pagoda Peaks",
	"Originating Ocean Currents",
	"Faceting Precious Gems",
	"Preparing Vacation Days",
	"Spawning Sights to See",
	"Reticulating Ninja Splines",
	"Analyzing Axe Trajectories",
	"Training Tour Guides",
	"Initializing Dastardly Schemes",
	"Factoring Hobby Enthusiasm",
	"Calculating Lifetime Aspirations",
	"Predicating Predestined Paths",
	"Populating Yards with Bugs and Birds",
	"Writing Scrolling Startup String Text",
	"Reticulating Splines in the Zone",
	"Recruiting Snooty Food Judges",
	"Breaking Down Restorable Cars",
	"Threading Sewing Needles",
	"Lacing Football Cleats",
	"Going Apartment Hunting",
	"Determining Rent Guidelines",
	"Preparing for Pops and Locks",
	"Generating Compatible Roommates",
	"Twisting Spiral Staircases",
	"Telling Splines to Reticulate More Quietly",
	"Making a Little Bit of Magic",
	"Rasterizing Reputation Algorithms",
	"Cluttering Closets",
	"Perfecting Playground Pieces",
	"Submerging Bedroom Furniture",
	"Desalinizing Snorkels",
	"Enhancing Crown Reflectivity",
	"Crenellating Crenellations",
	"Dragon-proofing Dressers",
	"Reticulating Underwater Splines",
	"Intensifying Hawaiian Prints",
	"Navigating Stormy Waters",
	"Pre-fluffing Pillows",
	"Factoring Fairy Frolicking Frequencies",
	"Modeling Marquetry",
	"Eschewing Everyday Aesthetics",
	"Cultivating Quality and Class",
	"Proscribing Plebeian Palates",
	"Falsifying Faux Finishes",
	"Invigorating Dull Habitations",
	"Abolishing Pedestrian Posturing",
	"Buffing Splines for Reticulation",
	"Appointing Appealing Appurtenances",
	"Simulating Sparkling Surfaces",
	"Reverse-Engineering Party Scores",
	"Unfolding Foldy Chairs",
	"Rehearsing Dinner",
	"Crash-Proofing Parties",
	"Grooming Grooms",
	"Mingling",
	"De-inviting Don Lothario",
	"Borrowing Something Blue",
	"Happy 14th Birthday Reticulated Splines!",
	"Applying Lampshade Headwear",
	"Stocking Clearance Racks",
	"Fiercely Reticulating Splines",
	"Fashioning Late Arrivals",
	"De-wrinkling Worry-Free Clothing",
	"Distressing Jeans",
	"Developing Delicious Designs",
	"Formulating Fitting Rooms",
	"Tailoring Trendy Threads",
	"Constructing Clothes Hangers",
	"Adjusting Acceptable Apparel",
	"Capturing Youthful Exuberance",
	"Analyzing Adolescent Angst",
	"Preparing Personal Spaces",
	"Making a Mess",
	"Like, Totally Reticulating Splines, Dude",
	"Generating Gothic Glamour",
	"Monitoring Moody Minors",
	"Sweetening Sixteens",
	"Teasing Teenage Hair-dos",
	"Building Boring Bedrooms? As If!",
	"Taking Countertops for Granite",
	"Preparing Perfect Plumbing",
	"Baking Bread for Toasters",
	"Igniting Pilot Lights",
	"Putting Down Toilet Seats",
	"Remodeling Spline Reticulator",
	"Assembling Shower Stalls",
	"Examining Tiles from All Zooms and Angles",
	"Cooling Down Refrigerators",
	"Stocking Stylish Sinks",
	"Creating Handmade Lampshades",
	"Making Many Mini Wrenches",
	"Supplying Self-Serve Furniture Area",
	"Simmering Swedish Meatballs",
	"Building Bedroom Displays",
	"Stress-Testing POÄNG Chairs",
	"Some Spline Reticulating Required",
	"Upholstering Sofas and Loveseats",
	"Boxing BILLY Bookcases",
	"Spooling IKEA Awesomenessens",
	"Making Manic Mansions",
	"Storing Solar Energy",
	"Over-Waxing Banisters",
	"Stopping To Smell The Flowers",
	"Extrapolating Empire Eigenvectors",
	"Ceiling Fan Rotation = dL/dT",
	"Increasing Water Plant Population",
	"Redistributing Resources",
	"Reticulating Splines One Last Time",
	"Reticulating Story Splines",
	"Matching Walls and Floors",
	"Partitioning Prose",
	"Canceling Un-cancelable Actions",
	"Filling in the Blanks",
	"Enforcing Storyline",
	"Generating Intrigue",
	"Launching SimSat 9000",
	"Compiling Riley's Wardrobe",
	"Calculating Vincent's Wealth",
	"Activating Story Arc",
	"Re-Activating Story Arc",
	"Leveling Playing Fields",
	"Stooping and Scooping",
	"Making Pets Look Like Owners",
	"Making Owners Look Like Pets",
	"Reticulating Dog Show Object Splines",
	"Delineating Mask Dynamics",
	"Reinforcing Story Lines",
	"Decrementing Alice's Funds",
	"Making Stephen Loyal",
	"Calculating Native Restlessness",
	"Transmitting Message Bottles",
	"Clearing Shipping Lanes",
	"Severing Civilization Connections",
	"Generating Sand Grains",
	"Bribing The Orangutans",
	"Wrangling All Wreckage",
	"Predicting Weather Unpredictability",
	"Estimating Volcanic Activity",
	"Amplifying Sun to '11'",
	"Extruding Mesh Terrain",
	"Balancing Domestic Coefficients",
	"Inverting Career Ladder",
	"Calculating Money Supply",
	"Normalizing Social Network",
	"Reticulating Even More Splines",
	"Adjusting Emotional Weights",
	"Calibrating Personality Matrix",
	"Inserting Chaos Generator",
	"Concatenating Vertex Nodes",
	"Balancing Domestic Coefficients",
	"Inverting Career Ladder",
	"Mapping Influence Attributes",
	"Assigning Mimic Propagation",
	"Busy Reticulating Splines",
	"Iterating Chaos Array",
	"Importing Personality Anchors",
	"Inserting Extension Algorithms",
	"Concatenating Vertex Nodes",
	"Balancing Domestic Coefficients",
	"Re-Inverting Career Ladder",
	"Mapping Influence Attributes",
	"Aggregating Need Agents",
	"Currently Reticulating Splines",
	"Interpreting Family Values",
	"Cabalizing NPC Controls",
	"Maximizing Social Network",
	"Renewing Urban Combinatorics",
	"Redefining Family Values",
	"Calibrating Personality Matrix",
	"Generating Population Model",
	"Homogenizing Interest Anatomy",
	"Reticulating Splines",
	"Establishing Gift Registry",
	"Randomizing Inhabitant Characteristics",
	"Readjusting Emotional Weights",
	"Activating Hotel Staff",
	"Importing Entertainment Talent",
	"Updating Vacancy Request Hotline",
	"Downloading Weather Data",
	"Hyperactivating Children",
	"Still Reticulating Splines",
	"Updating Hotel Registry",
	"Calculating Exchange Rate",
	"Activating Deviance Threshold",
	"Adapting Behavioral Model",
	"Reconfiguring Genetic Algorithms",
	"Hybridizing Plant Material",
	"Reticulating Splines Again",
	"Unfolding Helix Packet",
	"Synthesizing Natural Selection",
	"Enabling Lot Commercialization",
	"Recomputing Mammal Matrix",
	"Augmenting Occupational Conduits",
	"Initializing Operant Construct",
	"Generating Schmoozing Algorithm",
	"Populating Empyreal Entities",
	"Configuring Studio Operations",
	"Reticulating Golden Splines",
	"Composing Melodic Euphony",
	"Spreading Rumors",
	"Polarizing Image Conduits",
	"Calibrating Fame Indicant",
	"Strengthening Award Foundations",
	"Abstracting Loading Procedures",
	"Locating Misplaced Calculations",
	"Eliminating Would-be Chicanery",
	"Tabulating Spell Effectors",
	"Reticulating Unreticulated Splines",
	"Recycling Hex Decimals",
	"Binding Trace Enchantments",
	"Fabricating Imaginary Infrastructure",
	"Optimizing Baking Temperature",
	"Ensuring Transplanar Synergy",
	"Simulating Program Execution",
	"Reticulating More Splines",
	"Interpreting Family Values",
	"Fabricating Imaginary Infrastructure",
	"Recomputing Mammal Matrix",
	"Activating Deviance Threshold",
	"Composing Melodic Euphony",
	"Homogenizing Interest Anatomy",
	"Normalizing Social Network",
	"Compiling Reticulated Splines",
	"Simulating Program Execution",
	"Shooting Stars",
	"Maximizing Fun",
	"Tasting The Rainbow",
	"Downloading Awesomesauce",
	"Being Awesome",
	"Generating Llamas",
	"Herding Goats",
	"Goats Goats Goats",
	"Up To No Good",
	"Calculating Odds",
	"Keeping Calm",
	"Keeping (Mostly) Calm",
	"Stretching The Truth",
	"Going Somewhere"
];

/***/ })

});
//# sourceMappingURL=3.main.js.map