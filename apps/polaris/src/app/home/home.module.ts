import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { HomeComponent }           from './home.component';
import { HomeRoutingModule }       from './home-routing.module';
import { PatientsModule } from './../features/patients.module';
import { MaterialModule } from '../app-matierial.module';
import { PatientSearchModule } from 'app/features/patients-search/patients-search.module';
import { ChartBrowserModule } from 'app/features/chart-browser/chart-browser.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LiveChatDialogComponent } from 'app/features/live-chat/live-chat-dialog-component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    PatientsModule,
    MaterialModule,
    PatientSearchModule,
    //ChartBrowserModule,
    NgbModule
  ],
  declarations: [
    HomeComponent,
    LiveChatDialogComponent
  ], 
  entryComponents: [
    LiveChatDialogComponent
  ]
})
export class HomeModule {}
