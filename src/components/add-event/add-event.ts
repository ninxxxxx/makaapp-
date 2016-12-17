import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';
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
    titleControl: any;
    event: any;
    constructor(public viewCtrl: ViewController) {
      this.titleControl = new FormControl('', Validators.compose([Validators.nullValidator, Validators.required]));
      this.event = {
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        isStricted: false,
        strictedParticipants:[],
        participants:[]
      }
    }



    dismiss(){
      this.viewCtrl.dismiss();
    }

    saveEvent(event){
      console.log(event);
    }
  }
