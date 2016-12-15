import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import {  AddEventComponent } from '../components/add-event/add-event';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import {  SearchEventComponent } from '../components/search-event/search-event';
import {  SearchStudentComponent } from '../components/search-student/search-student';
import {  HowToComponent } from '../components/how-to/how-to';

@NgModule({
  declarations: [
  MyApp,
  HomePage,
  AddEventComponent,
  EventDetailPage,
  SearchEventComponent,
  SearchStudentComponent,
  HowToComponent,
  ],
  imports: [
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  HomePage,
  AddEventComponent,
  EventDetailPage,
  SearchEventComponent,
  SearchStudentComponent,
  HowToComponent,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
