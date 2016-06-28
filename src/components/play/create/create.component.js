
import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/common';
import { PrimusWrapper } from '../../../services/primus';
import { StorageService } from 'ng2-storage';

import { Router } from '@angular/router';
import template from './create.html';
import './create.less';

const classes = [
  { name: 'Generalist', description: 'You do a little bit of everything to a moderate degree of success.' },
  { name: 'Cleric',     description: 'You excel at healing your allies as well as smiting foes.' },
  { name: 'Mage',       description: 'You like throwing big, explosive spells at your foes.' },
  { name: 'Fighter',    description: 'You are very good at fighting foes with physical combat.' }
];

const genders = [
  { name: 'Male',       value: 'male' },
  { name: 'Female',     value: 'female' }
];

@Component({
  directives: [FORM_DIRECTIVES],
  template
})
export class CreateComponent {
  static get parameters() {
    return [[Router], [FormBuilder], [PrimusWrapper], [StorageService]];
  }

  constructor(router, formBuilder, primus, storage) {
    this.router = router;
    this.storage = storage.local;

    const baseModel = {
      name: ''
    };

    this.form = formBuilder.group({
      name: [baseModel.name, Validators.required]
    });

    this.name = this.form.controls.name;
    this.profession = '';
    this.gender = '';

    this.classes = classes;
    this.genders = genders;

    this.primus = primus;
    this.subscription = this.primus.hasRealUser.subscribe(res => {
      if(!res) return;
      this.router.navigate(['/play/overview']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formValid() {
    return this.name.value && this.profession && this.gender;
  }

  createCharacter() {
    this.primus.registerPlayer({
      name: this.name.value,
      professionName: this.profession,
      gender: this.gender,
      userId: this.storage.profile.user_id,
      token: this.storage.idToken
    }, () => {
      this.router.navigate(['/play/overview']);
    });
    return false;
  }
}