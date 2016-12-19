import { Component } from '@angular/core';
import { BarcodeScanner, File, FileOpener } from 'ionic-native';
import { NavController, ModalController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';

import { AddEventComponent } from '../../components/add-event/add-event';


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
    event:any;
    constructor(
      public navCtrl: NavController, 
      public modalCtrl: ModalController, 
      public actionCtrl: ActionSheetController,
      public alertCtrl: AlertController,
      public toastCtrl: ToastController
      )
    {
      console.log(new Date("October 13, 2014 11:13:00"));


      this.event = {
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

      };

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

    presentToast(mgs){
      let toast = this.toastCtrl.create({
        message: mgs,
        duration: 3000,
      });
      toast.present();
    }

    exportEventToCsvFile(event){
      let startDate = new Date(event.startDate);
      let fileName = "" + event.title + "_" + startDate.getDate() + "_" + startDate.getMonth() + "_" + startDate.getFullYear() + ".csv";

      let str = "";

      str += "" + event.title + "," + "From" + event.startDate + "," + "To" + event.endDate + "\n";
      str += "stricted student code" + "," + "status" + "\n";
      event.strictedParticipants.forEach((student)=>{
        str += "" + student.code + "," + student.status + "\n";
      });
      str += "normal student code" + "\n";
      event.participants.forEach((student)=>{
        str += "" + student + "\n";
      });
      
      File.checkDir(cordova.file.externalRootDirectory, 'MakaApp/')
      .then((isExist)=>{
        console.log("isExist: " + isExist);
        // this.presentToast("folder is exist");
        File.writeFile(cordova.file.externalRootDirectory + 'MakaApp/', fileName, str, false)
        .then(()=>{
          console.log("csv file was craeted")
          this.presentOpenFileToast("" + cordova.file.externalRootDirectory + 'MakaApp/'+ fileName);
        })
        .catch(()=> console.log("failed")); 
      })
      .catch(()=>{

        // this.presentToast("folder is not exist");
        File.createDir(cordova.file.externalRootDirectory, 'MakaApp/', false)
        .then((entry)=>{
          console.log("directory was created");
          File.writeFile(cordova.file.externalRootDirectory + 'MakaApp/', fileName, str, false)
          .then(()=>{
            console.log("csv file was craeted")
            this.presentOpenFileToast("" + cordova.file.externalRootDirectory + 'MakaApp/'+ fileName);
          })
          .catch(()=> console.log("failed"));  

        })
        .catch(()=>{

          console.log("can not create directory");

        });
      });

    }

    presentOpenFileToast(fileUrl){
      let toast = this.toastCtrl.create({
        message: "CSV File is in " + fileUrl,
        position: "bottom",
        showCloseButton: true,
        closeButtonText: "OK",
      });
      toast.onDidDismiss(()=>{
        FileOpener.open(fileUrl, 'text/csv');
      });
      toast.present();
    }

  }
