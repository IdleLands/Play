
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AppState, Primus, Theme } from '../../services';

import { PlayComponent } from '../../components/play.component';

import { Guild, Premium } from '../../models';

@Component({
  selector: 'page-guild-manage',
  templateUrl: 'guild-manage.html'
})
export class GuildManagePage extends PlayComponent implements OnInit, OnDestroy {

  public guild$: any;
  public guild: Guild;

  public premium$: any;
  public premium: Premium;

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
    this.premium$ = this.appState.premium.subscribe(data => this.premium = data);

    this.primus.requestGuild();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.guild$.unsubscribe();
    this.premium$.unsubscribe();
  }

  setGuild(data) {
    this.guild = data;
  }

  inviteMember() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Invite Member',
      inputs: [
        {
          name: 'Player Name',
          placeholder: 'Player Name'
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Invite',
          handler: data => {
            this.primus.inviteGuildMember(data['Player Name']);
          }
        }
      ]
    }).present();
  }

  disbandGuild() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Disband Guild',
      message: 'Are you sure you want to disband your guild? All members will be removed, gold will be lost, and any other guild-specific things will be lost. Your initial cost will not be refunded. Leaving is probably a better option!',
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Yes, I am sure',
          handler: () => {
            this.primus.disbandGuild();
          }
        }
      ]
    }).present();
  }

  renameGuild() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Rename/Retag Guild',
      inputs: [
        {
          name: 'Guild Name',
          placeholder: 'Guild Name (3-20 chars)',
          value: this.guild.name
        },
        {
          name: 'Guild Tag',
          placeholder: 'Guild Tag (2-6 chars)',
          value: this.guild.tag
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Rename/Retag Guild',
          handler: data => {
            this.primus.renameRetagGuild(data['Guild Name'], data['Guild Tag']);
          }
        }
      ]
    }).present();
  }

  changeMOTD() {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Change MOTD',
      inputs: [
        {
          name: 'Guild MOTD',
          placeholder: 'Guild MOTD',
          type: 'textarea',
          value: this.guild.motd
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Change MOTD',
          handler: data => {
            this.primus.changeMOTD(data['Guild MOTD']);
          }
        }
      ]
    }).present();
  }

  updateGuildTax(newTaxRate) {
    this.primus.updateGuildTaxRate(newTaxRate.value);
  }

}
