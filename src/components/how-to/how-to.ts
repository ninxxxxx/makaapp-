import { Component } from '@angular/core';

import { NavController, ModalController, Platform, NavParams, ViewController} from 'ionic-angular';


/*
  Generated class for the HowTo component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'how-to',
  templateUrl: 'how-to.html'
})
export class HowToComponent {

  text: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController) 
   {
    console.log('Hello HowTo Component');
    this.text = 'Hello World';
  }



    dismiss(){
      this.viewCtrl.dismiss();
    }
}
