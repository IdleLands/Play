
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AppState, Primus, Theme } from '../../services';

import { PlayComponent } from '../../components/play.component';

import { Guild } from '../../models';

@Component({
  selector: 'page-guild-overview',
  templateUrl: 'guild-overview.html'
})
export class GuildOverviewPage extends PlayComponent implements OnInit, OnDestroy {

  public guild$: any;
  public guild: Guild;

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

    this.guild$ = this.appState.guild.subscribe(data => this.setGuild(data));

    this.primus.requestGuild();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.guild$.unsubscribe();
  }

  setGuild(data) {
    this.guild = data;
  }

  createGuild() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Create Guild',
      inputs: [
        {
          name: 'Guild Name',
          placeholder: 'Guild Name (3-20 chars)'
        },
        {
          name: 'Guild Tag',
          placeholder: 'Guild Tag (2-6 chars)'
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Create Guild',
          handler: data => {
            this.primus.createGuild(data['Guild Name'], data['Guild Tag']);
          }
        }
      ]
    }).present();
  }

  acceptInvite() {
    this.primus.acceptGuildInvite();
  }

  rejectInvite() {
    this.primus.rejectGuildInvite();
  }

  leaveGuild() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Leave Guild',
      message: `Are you sure you want to leave your guild? You will have to be re-invited to come back.`,
      buttons: [
        { text: 'No, Nevermind' },
        {
          text: 'Yes, Leave',
          handler: () => {
            this.primus.leaveGuild();
          }
        }
      ]
    }).present();
  }

  donateToGuild() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Donate Gold',
      message: `Donating to a guild will fill its coffers. You have ${this.player.gold.toLocaleString()} gold you can donate.`,
      inputs: [
        {
          name: 'Donation Amount',
          placeholder: 'Donation Amount',
          type: 'number'
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Donate',
          handler: data => {
            this.primus.donateGuildGold(+data['Donation Amount']);
          }
        }
      ]
    }).present();
  }

  updatePlayerTax(newTaxRate) {
    this.primus.updatePlayerTaxRate(newTaxRate.value);
  }

}
