
import PrimusSocket from '../../primus.gen';

import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { LocalStorageService } from 'ng2-webstorage';

import { AppState, Auth } from './';

const settings = window.location.hostname === 'idle.land' ?
  { port: 80, protocol: 'http', hostname: 'game.idle.land' } :
  { port: 8080, protocol: 'http', hostname: window.location.hostname };

@Injectable()
export class Primus {

  private callbacks = {};
  private socket: any;

  constructor(
    private storage: LocalStorageService,
    private appState: AppState,
    private auth: Auth,
    private toastCtrl: ToastController
  ) {}

  _handleNotification({ message }): void {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    }).present();
  }

  _emit(event: string, data?: any, callback?: Function): void {
    this.callbacks[event] = callback;

    if(!data) data = {};
    data.token = this.storage.retrieve('idToken');

    this.socket.emit(event, data);
  }

  initSocket(): void {
    if(this.socket) return;

    this.socket = PrimusSocket.connect(`${settings.protocol}://${settings.hostname}:${settings.port}`, {
      reconnect: {
        min: 500,
        retries: 100,
        factor: 1.7
      }
    });

    this.socket.on('error', e => { throw e; });

    this.socket.on('close', () => {
      this.appState.onlineStatus.next('offline');
    });

    this.socket.on('reconnect scheduled', () => {
      this.appState.onlineStatus.next('connecting');
    });

    this.socket.on('open', () => {
      this.appState.onlineStatus.next('online');
    });

    this.socket.on('data', data => {
      if(!data.event) {
        console.error('no event specified', data);
        return;
      }

      if(data.notify) {
        this._handleNotification({ message: data.notify });
      }

      if(!this.callbacks[data.event]) return;
      this.callbacks[data.event](data);
      delete this.callbacks[data.event];
    });
  }

  disconnectSocket(): void {
    if(!this.socket) return;

    this._emit('plugin:player:logout');
  }

  requestNoKill(): void {
    this._emit('plugin:player:imregisteringrightnowdontkillme');
  }

  checkIfExists(callback: Function): void {
    const profile = this.storage.retrieve('profile');
    if(!profile) return;

    this._emit('plugin:player:exists', { userId: profile.user_id }, data => {
      callback(data.exists);
    });
  }

  login(callback: Function): void {
    const profile = this.storage.retrieve('profile');
    if(!profile) return;

    this.auth.renew()
      .then(() => {
        this._emit('plugin:player:login', { userId: profile.user_id }, res => {
          if(!res.ok) return;
          callback(res);
        });
      });
  }
}