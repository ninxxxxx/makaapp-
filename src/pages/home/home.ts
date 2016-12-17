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
      console.log(new Date("October 13, 2014 11:13:00"));
  		this.events = [
      {
        title: "Mom Day", 
        startDate: new Date("August 8, 2016 8:00:00"),
        endDate: new Date("August 8, 2016 15:00:00"),
        stricted: false,
        strictedParticipants: [],
        participants: [
        "5610110655",
        "5610110654",
        "5610110651",
        ],

      },
      {
        title: "Dad Day", 
        startDate: new Date("August 8, 2016 8:00:00"),
        endDate: new Date("August 8, 2016 15:00:00"),
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
      modal.onDidDismiss(event =>{
        // console.log(event);
        if(event)
          this.events.push(event);
      });
      modal.present();
    }

    setDateFormat(date){
      // console.log("From: " + date);
      // console.log("to: " + ""+date.getDate()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear() + "(" + date.getHours() + ":" + date.getMinutes() + ")");

      return ""+date.getDate()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear() + " (" + date.getHours() + "." + date.getMinutes() + ")";
    }
  }
