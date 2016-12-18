import { Component } from '@angular/core';
import { BarcodeScanner, File } from 'ionic-native';
import { NavController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';

import { AddEventComponent } from '../../components/add-event/add-event';

import { SearchEventComponent } from '../../components/search-event/search-event';
import { HowToComponent } from '../../components/how-to/how-to';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  declare var cordova:any;
  @Component({
  	selector: 'page-home',
  	templateUrl: 'home.html',
  })
  export class HomePage {
  	events: [any];
  	constructor(
      public navCtrl: NavController, 
      public modalCtrl: ModalController, 
      public actionCtrl: ActionSheetController,
      public alertCtrl: AlertController
      )
  	{
      console.log(new Date("October 13, 2014 11:13:00"));
      this.events = [
      {
        title: "Mom Day", 
        startDate: new Date("August 8, 2016 8:00:00").toISOString(),
        endDate: new Date("August 8, 2016 15:00:00").toISOString(),
        isStricted: false,
        strictedParticipants: [],
        participants: [
        "5610110655",
        "5610110654",
        "5610110651",
        ],

      },
      {
        title: "Dad Day",
        startDate: new Date("August 8, 2016 8:00:00").toISOString(),
        endDate: new Date("August 8, 2016 15:00:00").toISOString(),
        isStricted: true,
        strictedParticipants: [
        {code: "5610110655", status: "wait"},
        {code: "5610110654", status: "wait"},
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

    showEditEventModal(event){
      let indexEvent = this.events.indexOf(event);
      let modal = this.modalCtrl.create(AddEventComponent, {event: event});
      modal.onDidDismiss(event =>{
        // console.log(event);
        if(event)
          this.events[indexEvent] = event;
      });
      modal.present();
    }

    setDateFormat(date){
      let newDate = new Date(date);
      let newFormat = ""+newDate.getDate()+"/"+(newDate.getMonth() + 1)+"/"+newDate.getFullYear() + " (" + newDate.getHours() + "." + newDate.getMinutes() + ")";
      // console.log(date);
      // console.log("" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " (" + date.getHours() + "." + date.getMinutes() + ")");
      return newFormat;
    }

    sortEvents(){
      this.events.sort();
    }

    presentActionSheet(){

    }

    ss(){
      BarcodeScanner.scan().then((data)=>{
        console.log(data);
      },
      (err)=>{
        console.log("Error: " + err);
      }
      );
    }

    removeEvent(event){
      // console.log(event);
      // let e = this.events.find(x => x == event);
      // console.log(e);
      let confirm = this.alertCtrl.create({
        title: "Remove Event " + event.title + " ?",
        message: "Are you sure to remove event " + event.title + " ?",
        buttons: [
        {
          text: 'OK',
          handler: ()=>{
            let index = this.events.indexOf(event);
            if(index > -1){
              this.events.splice(index, 1);
            }
            console.log();
          }
        },
        {
          text: 'Cancel',
          handler: ()=>{

          }
        }
        ]
      });
      confirm.present();
      
    }



    searchEvent(){
      let modal = this.modalCtrl.create(SearchEventComponent);
      modal.present();
    }

    howToUser(){
      let modal = this.modalCtrl.create(HowToComponent);
      modal.present();
    }
    createFile(){
      // File.createDir()
      // console.log("Date: " + cordova.file.externalDataDirectory);
      let p = [
      {name:"Sally Whittaker", year:2018},
      {name:"Belinda Jameson", year:2017},
      {name:"Jeff Smith", year:2018},
      {name:"Sandy Allen", year:2019}
      ];
      let str = "";

      p.forEach((person)=>{
        str += person.name + "," + person.year + "\n";
      });

      // File.writeFile(cordova.file.externalDataDirectory, "arnon.csv", str, false)
      File.writeFile(cordova.file.externalRootDirectory, "arnon.csv", str, false)
      .then(()=>{console.log("completed")})
      .catch(()=> console.log("failed"));
    }

  }

