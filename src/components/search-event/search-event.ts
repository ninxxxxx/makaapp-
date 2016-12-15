import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello SearchEvent Component');
    this.text = 'Hello World';
  }

}
