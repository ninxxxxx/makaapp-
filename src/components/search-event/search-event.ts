import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController} from 'ionic-angular';


/*
  Generated class for the SearchEvent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'search-event',
  templateUrl: 'search-event.html'
})
export class SearchEventComponent {
  
  items: string[];
  text: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController) 
  {
    console.log('Hello SearchEvent Component');
    this.text = 'Hello World';
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      'วันลอยกระทง',
      'วันมาฆบูชา',
      'วันปีใหม่',
      'รับน้องโคลน',
      'วันปฐมนิเทศน์',
      'วันคริสมาสต์',
      'วันสงกรานต์',
      'วันแม่แห่งชาติ',
      'วันพ่อแห่งชาติ',
      'วันสตรีสากล',
      'รับน้องภาค',
      'เปิดบ้านวิชาการ',
      'วันเด็ก',
      'วันครู',
      'วันโคนมแห่งชาติ',
      'วันตรุษจีน',
      'วันวาเลนไทน์',
      'วันจักรี',
      'วันช้างไทย',
      'วันนักข่าว',
      'วันวิสาขบูชา'
    ];

  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

    // backToHome(){
    //     let modal = this.modalCtrl.create(HomePage);
    //     modal.present();
    // }

    dismiss(){
      this.viewCtrl.dismiss();
    }

}



