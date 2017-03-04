import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Primus, Theme } from '../../services';

import { OverviewPage } from '../../pages';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage implements OnInit {

  baseClasses = [
    { name: 'Generalist', desc: 'You excel at nothing, but generally, you can hold your own.' },
    { name: 'Mage',       desc: 'You get a kick out of slinging fireballs at everything.' },
    { name: 'Cleric',     desc: 'You like not dying and also keeping your party members alive.' },
    { name: 'Fighter',    desc: 'You really like hitting things with a big stick.' }
  ];

  baseGenders = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' }
  ];

  character: { name: string, professionName: string, gender: string } = { name: '', professionName: '', gender: '' };

  constructor(
    public primus: Primus,
    public theme: Theme,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.primus.requestNoKill();
  }

  doRegister() {
    this.character.name = _.truncate(this.character.name, { length: 20 }).trim().replace(/[^\w\dÀ-ÿ ]/gm, '');
    this.alertCtrl.create({
      cssClass: this.theme.currentTheme,
      title: 'Register?',
      message: `Would you like to begin your adventure as ${this.character.name}, the ${this.character.gender} ${this.character.professionName}?`,
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes, let\'s do it!',
          handler: () => {
            this.primus.register(this.character)
              .then(() => {
                this.navCtrl.setRoot(OverviewPage);
              })
              .catch(e => console.error(e));
          }
        }
      ]
    }).present();
  }

}
