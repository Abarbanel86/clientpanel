import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingSrvice: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingSrvice.getSettings();
  }

  onSubmit() {
    this.settingSrvice.setSettings(this.settings);
    this.flashMessage.show('Settings changed', {
      cssClass: 'alert-success', timeout: 5000
    });
  }
}
