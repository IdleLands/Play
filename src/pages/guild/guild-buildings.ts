
import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AppState, Primus, Theme } from '../../services';

import { PlayComponent } from '../../components/play.component';

import { Guild, GuildBuildings } from '../../models';

@Component({
  selector: 'page-guild-buildings',
  templateUrl: 'guild-buildings.html'
})
export class GuildBuildingsPage extends PlayComponent implements OnInit, OnDestroy {

  public guild$: any;
  public guild: Guild;

  public guildbuildings$: any;
  public guildbuildings: GuildBuildings;

  public selectOptions = {};

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public theme: Theme
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    this.selectOptions = { cssClass: this.theme.currentTheme };

    this.guild$ = this.appState.guild.subscribe(data => this.guild = data);
    this.guildbuildings$ = this.appState.guildbuildings.subscribe(data => this.setGuildBuildings(data));

    this.primus.requestGuild();
    this.primus.requestGuildBuildings();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.guild$.unsubscribe();
    this.guildbuildings$.unsubscribe();
  }

  setGuildBuildings(data) {
    this.guildbuildings = data;
  }

  isMod() {
    return this.guild.$me && this.guild.$me.rank <= 3;
  }

  isBuilt(buildingName, buildingSize) {
    return _.includes(this.guildbuildings.buildings.currentlyBuilt[buildingSize], buildingName)
  }

  slots(buildingSize) {
    return _.range(0, this.guildbuildings.hallSizes[buildingSize]);
  }

  buildBuilding(buildingName, slot) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Create Building',
      message: `Are you sure you want to make a ${buildingName} there?`,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Build it!',
          handler: () => {
            this.primus.buildBuilding(buildingName, slot);
          }
        }
      ]
    }).present();
  }

  cantUpgrade({ wood, clay, stone, astralium, gold }) {
    if(this.guild.resources.wood < wood) return true;
    if(this.guild.resources.clay < clay) return true;
    if(this.guild.resources.stone < stone) return true;
    if(this.guild.resources.astralium < astralium) return true;
    if(this.guild.gold < gold) return true;
    return false;
  }

  upgradeBuilding(buildingName) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Upgrade Building',
      message: `Are you sure you want to upgrade your ${buildingName}?`,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Upgrade it!',
          handler: () => {
            this.primus.upgradeBuilding(buildingName);
          }
        }
      ]
    }).present();
  }

  moveBase(baseName) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Move Base',
      message: `Are you sure you want to move your base to ${baseName}?`,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Move it!',
          handler: () => {
            this.primus.moveBase(baseName);
          }
        }
      ]
    }).present();
  }

  saveProp(buildingName, propName) {
    const value = this.guildbuildings.buildings.properties[`${buildingName}-${propName}`];
    this.primus.updateGuildProp(buildingName, propName, value);
  }

}
