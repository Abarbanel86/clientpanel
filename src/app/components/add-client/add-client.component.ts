import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

import { Client } from '../../models/Client'
import { SettingsService } from '../../services/settings.service'


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm', {static: false}) from: any;

  constructor(private flashmessages: FlashMessagesService,
              private clientService: ClientService,
              private router: Router,
              private settings: SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settings.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if(!valid) {
      //show error
      this.flashmessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 5000
      });
    } else {
      //add client
      this.clientService.newClient(value);
      //user added message
      this.flashmessages.show('Client added!', {
        cssClass: 'alert-success', timeout: 5000
      });
      this.router.navigate(['/']);
    }
  }
}
