import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AddEventComponent } from '../../components/add-event/add-event';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
  })
  export class HomePage {
  	events: [any];
  	constructor(public navCtrl: NavController, public modalCtrl: ModalController)
  	{
  		this.events = [
      {
        gg: 1,
        title: "Mom Day", 
        startDate: "12/08/2559",
        endDate: "13/08/2559",
        stricted: false,
        strictedParticipants: [],
        participants: [
        "5610110655",
        "5610110654",
        "5610110651",
        ],

      },
      {
        gg: 2,
        title: "Dad Day", 
        startDate: "05/12/2559",
        endDate: "06/12/2559",
        stricted: true,
        strictedParticipants: [
        "5610110655",
        "5610110654",
        ],
        participants: [
        "5610110655",
        "5610110654",
        "5610110651",
        "5610110651",
        "5710343344"
        ],

      },
      ];
    }

    ionViewDidLoad() {
      console.log('Hello HomePage Page');
    }

    showAddEventModal(){
      let modal = this.modalCtrl.create(AddEventComponent);
      modal.present();
    }
  }
