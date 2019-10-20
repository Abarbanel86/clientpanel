import { Injectable } from '@angular/core';

import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: true
  }

  getSettings(): Settings {
    return this.settings
  }

  setSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  constructor() { 
    if(localStorage.getItem('settings') != null ){
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }
}
