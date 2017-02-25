
import * as _ from 'lodash';
import 'reddit.js';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reddit-news',
  styles: [`
    :host .header {
      display: flex;
      align-items: center;
    }`
  ],
  template: `
    <ion-row>
      <ion-col width-75 padding-left class="header">
        <h2>Latest News</h2>
      </ion-col>
      <ion-col text-right padding-right>
       <button ion-button outline icon-left small (click)="refresh()"><ion-icon name="refresh"></ion-icon> Refresh</button>
      </ion-col>
    </ion-row>
    <ion-row *ngIf="redditPosts.length === 0">
      <ion-col text-center *ngIf="!redditDidFail">
        Loading...
      </ion-col>
      <ion-col text-center *ngIf="redditDidFail">
        Loading from <a href="http://reddit.com/r/idle_lands" target="_blank">/r/idle_lands</a> failed. Why not head on over to check it out?
      </ion-col>
    </ion-row>
    <ion-row *ngFor="let post of redditPosts">
      <ion-col>
        <ion-card>
          <ion-card-content>
            <ion-row>
              <ion-col>
                <a [href]="'http://reddit.com' + post.permalink" target="_blank">{{ post.title }}</a>
              </ion-col>
              <ion-col>
                {{ post.author }} on {{ (post.created*1000) | date:'medium' }}
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
`
})
export class RedditNewsComponent implements OnInit {

  public redditPosts = [];
  public didRedditFail: boolean;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.redditPosts = [];
    this.didRedditFail = false;

    (<any>window).reddit.search('flair:News', 'idle_lands').restrict_sr(true).t('all').limit(3).sort('new').fetch(res => {
      if(!res || !res.data || !res.data.children) {
        this.didRedditFail = true;
        return;
      }
      this.redditPosts = _.map(res.data.children, 'data');
    }, () => this.didRedditFail = true);
  }
}