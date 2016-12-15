import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello HowTo Component');
    this.text = 'Hello World';
  }

}
