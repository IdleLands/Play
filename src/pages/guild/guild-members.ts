
import * as _ from 'lodash';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AppState, Primus, Theme } from '../../services';

import { PlayComponent } from '../../components/play.component';

import { Guild, GuildMember } from '../../models';

@Component({
  selector: 'page-guild-members',
  templateUrl: 'guild-members.html'
})
export class GuildMembersPage extends PlayComponent implements OnInit, OnDestroy {

  public guild$: any;
  public guild: Guild;

  public sortedMembers: GuildMember[];

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
    this.sortedMembers = _.sortBy(this.guild.members, ['rank', 'lastSeen', 'name']);
  }

  rankToIcon(rank) {
    switch(rank) {
      case 1: return 'md-star';
      case 3: return 'md-star-half';
      case 5: return 'md-star-outline';
    }
  }

  canKick(member) {
    return this.guild.$me.rank <= 3 && (member.unacceptedInvite || this.guild.$me.rank < member.rank);
  }

  kick(member) {
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Kick Member',
      message: `Are you sure you want to kick ${member.name}? They will have to be re-invited to come back. They may also be a sad puppy without a guild :(`,
      buttons: [
        { text: 'No, Nevermind' },
        {
          text: 'Yes, Kick \'em',
          handler: data => {
            this.primus.kickGuildMember(member.name);
          }
        }
      ]
    }).present();
  }

  canPromote(member) {
    return member.rank && this.guild.$me.rank === 1 && this.guild.$me.name !== member.name && member.rank !== 3;
  }

  promote(member) {
    this.primus.guildPromote(member.name);
  }

  canDemote(member) {
    return member.rank && this.guild.$me.rank === 1 && this.guild.$me.name !== member.name && member.rank !== 5;
  }

  demote(member) {
    this.primus.guildDemote(member.name);
  }

}
