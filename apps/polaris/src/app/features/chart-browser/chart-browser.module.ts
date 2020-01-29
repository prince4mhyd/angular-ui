import { NgModule } from '@angular/core';
import { ChartBrowserComponent } from './chart-browser.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientDemographicsViewComponent } from './patient-demographics-view/patient-demographics-view.component';
import { MaterialModule } from 'app/app-matierial.module';
import { StickyNotesModule } from '../sticky-notes/sticky-notes.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        StickyNotesModule
    ],
    declarations: [
        ChartBrowserComponent,
        PatientDemographicsViewComponent,
    ],
    exports: [
        ChartBrowserComponent,
        PatientDemographicsViewComponent
    ],
})
export class ChartBrowserModule {

}