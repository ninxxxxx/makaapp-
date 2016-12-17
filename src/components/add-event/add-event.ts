import { Component, ViewChild, Input} from '@angular/core';
import { ViewController, ToastController} from 'ionic-angular';
import {Validators, FormControl} from '@angular/forms';
/*
  Generated class for the AddEvent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
  @Component({
    selector: 'add-event',
    templateUrl: 'add-event.html'
  })
  export class AddEventComponent {
    @ViewChild('title') titleInput;
    titleControl: any;
    event: any;
    d: Date;
    constructor(public viewCtrl: ViewController, public toastCtrl: ToastController) {
      this.d = new Date();
      this.titleControl = new FormControl('', Validators.compose([Validators.nullValidator, Validators.required]));
      this.event = {
        title: "",
        startDate: this.d,
        endDate: new Date(),
        isStricted: false,
        strictedParticipants:[],
        participants:[]
      }
    }

    ionViewDidLoad() {
      this.titleInput.setFocus();
    }

    dismiss(){
      this.viewCtrl.dismiss();
    }

    saveEvent(event){
      if(!event.title){
        this.presentToast("Require Event's Title");
      }else{
        this.viewCtrl.dismiss(event);
      }
    }

    presentToast(mgs){
      let toast = this.toastCtrl.create({
        message: mgs,
        duration: 3000,
      });
      toast.present();
    }
  }
