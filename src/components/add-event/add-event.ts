import { Component, ViewChild, Input} from '@angular/core';
import { ViewController, ToastController, NavParams} from 'ionic-angular';
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
    inputStudent: string;
    editEvent: any;
    constructor(public viewCtrl: ViewController, public toastCtrl: ToastController, params: NavParams) {
      
      this.editEvent = params.get('event');
      if(!this.editEvent){

        this.event = {
          title: "",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          isStricted: false,
          strictedParticipants:[
          {code:"5610110655", status:"wait"},
          {code:"5610110444", status:"wait"},
          {code:"5610110334", status:"wait"},
          {code:"5610110235", status:"wait"},
          ],
          participants:[]
        }

      }else{
        this.event = this.editEvent;
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

    addStudent(){
      if(this.inputStudent.length == 10 ){
        let student = {code: this.inputStudent, status:"wait"};
        this.event.strictedParticipants.push(student);
        this.inputStudent = "";
      }else{
        this.presentToast("Student Code must has 10 Number");
      }
    }
    removeStudent(student){ 
      let index = this.event.strictedParticipants.indexOf(student);
      if(index > -1){
        this.event.strictedParticipants.splice(index, 1);
      }
    }
  }
