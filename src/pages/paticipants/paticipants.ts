import { Component, Input, ViewChild } from '@angular/core';
import {  Control, ControlGroup,  FORM_DIRECTIVES } from '../@angular/common';
import {  Platform,NavController, App, ViewController, ModalController, NavParams } from 'ionic-angular';
import {EventDetailPage} from '../event-detail/event-detail';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';


/*
  Generated class for the Paticipants page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-paticipants',
    templateUrl: 'paticipants.html'

  })

  export class PaticipantsPage {
   @ViewChild('input') myInput ;
    stdNumber;
    student; //รายชื่อคนที่ต้องเข้าร่วม
    paticipants;
    viewCtrl;
    myForm;
    regForm: FormGroup;

    constructor(params: NavParams,public fb: FormBuilder,public modalCtrl: ModalController,public navCtrl: NavController,viewCtrl: ViewController,formBuilder: FormBuilder) {

      
      this.student = params.get('items');
      // this.paticipants = this.student;
      
      this.paticipants = [];

      this.myForm = formBuilder.group({
        
        stdnumber: ['', Validators.compose([Validators.required, Validators.pattern('^[\+0-9]{10,12}$')])]
      });
      this.setFocus();
      
    }

    ngOnInit() {
            this.regForm = this.fb.group({
                client_phone: ['', Validators.compose([Validators.required,Validators.maxLength(10), Validators.pattern('^[\+0-9]{10,12}$')])]  
            });
        }

    ionViewDidLoad() {
      console.log('..................');
    }
    addStudent() {
      console.log('addStudent: '+this.stdNumber);
      
      //this.event.items.push({student:this.num});
      this.paticipants.push({student:this.stdNumber,status:"มาแล้ว"});
      console.log(this.paticipants);
    }

    canclaAdd(stuDelete){
      var i = 0;
      this.paticipants.forEach((key: any) => {
        if(stuDelete == key.student){
          this.paticipants.splice(i, 1);
        }
        i++; 
        console.log(this.paticipants);
      }
      
   )};

   
    checkInFinish(){

    	// let profileModal = this.modalCtrl.create(EventDetailPage, {patiList: this.paticipants});
      // profileModal.present();

      this.navCtrl.push(EventDetailPage,{patiList: this.paticipants});

    }
    cancle(){
    	let navTransition = this.navCtrl.pop();

    }

    setFocus(){
        setTimeout(() => {
        this.myInput.setFocus();
      },150);
    }
    


  }

