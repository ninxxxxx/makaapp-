import { Component } from '@angular/core';

/*
  Generated class for the SearchStudent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'search-student',
  templateUrl: 'search-student.html'
})
export class SearchStudentComponent {

  text: string;

  constructor() {
    console.log('Hello SearchStudent Component');
    this.text = 'Hello World';
  }

}
