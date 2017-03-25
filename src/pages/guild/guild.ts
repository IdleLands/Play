
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocalStorageService } from 'ng2-webstorage';

import { AppState, Primus } from '../../services';
import { PlayComponent } from '../../components/play.component';

import { GuildOverviewPage } from './guild-overview';
import { GuildBuildingsPage } from './guild-buildings';
import { GuildMembersPage } from './guild-members';
import { GuildManagePage } from './guild-manage';

import { Guild } from '../../models';

@Component({
  selector: 'page-guild',
  templateUrl: 'guild.html'
})
export class GuildPage extends PlayComponent implements OnInit, OnDestroy {

  public guild$: any;
  public guild: Guild;

  public defaultTab = 0;

  public memberBadge = '';

  public overviewRoot = GuildOverviewPage;
  public buildingsRoot = GuildBuildingsPage;
  public membersRoot = GuildMembersPage;
  public manageRoot = GuildManagePage;

  constructor(
    public appState: AppState,
    public primus: Primus,
    public navCtrl: NavController,
    public storage: LocalStorageService
  ) {
    super(appState, primus, navCtrl);
  }

  ngOnInit() {
    super.ngOnInit();

    const tab = this.storage.retrieve('currentGuildTab');
    this.defaultTab = tab;

    this.guild$ = this.appState.guild.subscribe(data => {
      this.guild = data;
      if(this.guild.members) {
        this.memberBadge = `${this.guild.members.length}/${this.guild.maxMembers}`;
      } else {
        this.memberBadge = '';
      }
    });

    this.primus.requestGuild();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  changeTab(newTab) {
    this.storage.store('currentGuildTab', newTab.index);
  }

}
