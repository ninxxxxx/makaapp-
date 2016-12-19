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
  items: string[];
  text: string;

  constructor() {
    console.log('Hello SearchStudent Component');
    this.text = 'Hello World';
    this.initializeItems();
  }

   initializeItems() {
    this.items = [
      '5610110363',
      '5610110731',
      '5610110630'
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
}

