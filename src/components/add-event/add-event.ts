import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello AddEvent Component');
    this.text = 'Hello World';
  }

}
