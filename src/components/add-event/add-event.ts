import { Component, ViewChild, Input} from '@angular/core';
import { ViewController, ToastController, NavParams} from 'ionic-angular';
// import {FilePath} from 'ionic-native';
import {FileChooser, File} from 'ionic-native';
/*
  Generated class for the AddEvent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
  declare var window:any;
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

    importStudentWithCsv(){
      FileChooser.open()
      .then((uri)=>{
        window.FilePath.resolveNativePath(uri,
          url =>{
            console.log("I GOT FILE PATH !! : " + url);
            let fileName = url.split("/").pop();
            console.log("fileName " + fileName);
            let path = url.replace(fileName, "");
            console.log("path " + path);
            File.readAsText(path, fileName)
                .then((data)=>{
                  let dd = "" + data;
                  // dd = dd.replace(",", "");
                  let studentCodes = dd.split("\n");
                  let students = [];
                 studentCodes.forEach((code)=>{
                   code = code.split(",")[0];
                   students.push({code: code, status: "wait"});
                 })
                  this.event.strictedParticipants = this.event.strictedParticipants.concat(students);
                  this.presentToast("Import Student Code from csv file completed");
                  console.log(this.event.strictedParticipants);
                  // console.log(students);
                })
                .catch((err)=>{
                  console.log("ERROR: " + err);
                });
          },
          err =>{
            this.presentToast("ERROR: " + err);
            console.log("FUCKING ERROR: " + err);
          }
          );
      })
    }

  }
