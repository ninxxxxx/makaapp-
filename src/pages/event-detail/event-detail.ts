import { Component } from '@angular/core';
import { NavController, App, ViewController, ModalController, NavParams,Modal,Platform,Toast,ToastController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import {PaticipantsPage} from '../paticipants/paticipants';
import {ApiServices} from '../../providers/api-services';




/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  event;
  stdNumber;
  paticipants = PaticipantsPage;
  amount;
  event2;
  value;
  hide = true;
  characterNum;
  packet = null; //คนที่มา
  absence;  //คนที่ขาด
  e;
  toDayDate;
  toDayMonth;
  toDayYear;
  teee;
  Day;
  Month;
  Year;
  value_std_sta =0;
  value_std=0;
  hidebtn = 0;


  constructor(public modalCtrl: ModalController,public params: NavParams,private platform: Platform,private toastCtrl: ToastController) {
    this.initializeEvent();
     this.checkAmount();
     this.checkMaka();
     // this.checkDate(this.event.eventDate);

     this.e = new Date().getDate();
     
     //this.checkDate(this.e);
       
     this.teee = this.event.eventDay;
    this.showAbsense();

  }

  
  initializeEvent() {
  
    this.event = 
		    	{
			    title: 'วันปีใหม่', 
			    eventDay: new Date(),
          id : [ 

                    {student: '5610110731',status:'miss'},
                    {student: '5610110732',status:'miss'},
                    {student: '5610110733',status:'miss'},
                    {student: '5610110734',status:'miss'},
                    {student: '5610110735',status:'miss'},
                    {student: '5610110736',status:'miss'},
                    {student: '5610110737',status:'miss'},
                    {student: '5610110738',status:'miss'}  
                  ]
			  	};  
    this.packet = this.params.get('patiList');
     if(this.packet != null){
      console.log('Back to eventDetail -> enclose list of paticipants :',this.packet);
 
     }
       
       
     

  }


  ionViewDidLoad() {
    console.log('Hello EventDetailPage Page');
  }

  // addStudent() {
  //       console.log('addStudent: '+this.stdNumber);
        
  //       //this.event.items.push({student:this.num});
  //       this.event.items.push({student:this.stdNumber});
  //       this.checkAmount();
        
  //   }
    pushPage() {
      // let modal = this.modalCtrl.create(PaticipantsPage, [ this.event.items ]);
     if(this.hidebtn == 0){
         this.presentToast("this event is not start yet.");
         return;

     }else{
        let profileModal = this.modalCtrl.create(PaticipantsPage, {items: this.event.id.student});
         profileModal.present();
     }
      
    }
    showList(){
		   
        this.onChange(this.hide);
        
        
    }

    checkAmount(){
    	 this.amount = this.event.id.length;
      //this.amount = 10;
      this.Day = this.event.eventDay.getDate();
      this.Month = this.event.eventDay.getMonth();
      this.Year = this.event.eventDay.getFullYear();
      // this.Day = this.e.getDate();
      // this.Month = this.e.getMonth();
      // this.Year = this.e.getFullYear();



    }

	onChange(hide){
	    if (this.hide == true) {
            this.value = 1;
            this.hide = false;
            return; 
          } else if (this.hide == false){
            this.value = 0; 
            this.hide = true;
            return;
          }

   }

  

   checkMaka(){
     console.log("in check2");
     console.log("packet: "+this.packet);
     console.log("event: "+this.event.id);
     
       if(this.packet != null){
          this.event.id.forEach((key: any) => {
                      // console.log(key.status);
                      this.packet.forEach((key2:any)=>{
                        console.log(key2.student +" : "+ key.student);
                        if(key2.student == key.student){
                          key.status = "participated";
                          console.log(key.student+" : "+key.status);
                        }

                      });

        });

       }else{
         return;
       }
    
   }

   checkDate(eventDay){

     let eventYear = eventDay.getFullYear();
     let eventMonth = eventDay.getMonth();
     let eventDate = eventDay.getDate();
     this.toDayDate = new Date().getDate();
     this.toDayMonth = new Date().getMonth();
     this.toDayYear = new Date().getFullYear();

     if(this.toDayYear > eventYear){
          // ผ่านไปแล้ว ไม่ให้กดเช็ค ให้เห็นว่าใครไม่เข้าก็พ
            this.showAbsense();
     }else if(this.toDayYear < eventYear){
         //ยังไม่ถึงแน่นอน 
         this.hideButtonAndShowPaticiples();
     }else if(this.toDayYear == eventYear){
         if(this.toDayMonth < eventMonth){
             //ยังไม่ถึง
             this.hideButtonAndShowPaticiples();

         }else if(this.toDayMonth > eventMonth){
             // ผ่านไปแล้ว
             this.showAbsense();

         }else if(this.toDayMonth == eventMonth){
             if(this.toDayDate < eventDate){
               //ังไม่ถึง
               this.hideButtonAndShowPaticiples();
             }else if(this.toDayDate > eventDate){
               //ผ่านไปแล้ว
               this.showAbsense();
             }else if(this.toDayDate == eventDate){
                // this.hideButtonAndShowPaticiples();
               this.showButton();
               // this.showAbsense();

              
             }


         }

     }

   }

 showButton(){
//พร้อมที่จะเช็ค
  this.hidebtn = 1;
  this.value_std_sta = 1;
  this.value_std = 0;

 }

 hideButtonAndShowPaticiples(){
//ยังไม่ถึง
//แล้วแสดงผลคนที่ต้องเข้าร่วม
  this.value_std_sta = 1;
  this.value_std = 0;
  this.hidebtn = 0;
   
 }

showAbsense(){
//่านไปแล้ว โชว์คนที่ขาด
  this.value_std_sta = 0;
  this.value_std = 1;
  this.hidebtn = 0;



   }
presentToast(messege) {
  let toast = this.toastCtrl.create({
    message: messege,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
   
  
 }

  


