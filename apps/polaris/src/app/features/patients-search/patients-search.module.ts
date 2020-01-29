import { NgModule }      from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { patientSearchReducer } from './state/patients-search.reducer';
import { PatientSearchEffects } from './state/patients-search.effects';
import { PatientSearchFacade } from './state/patients-search.facade';
import { PatientsSearchComponent } from './patients-search.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/app-matierial.module';
import { CommonModule } from '@angular/common';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    StoreModule.forFeature('patientSearchReducer',patientSearchReducer),
    EffectsModule.forFeature([PatientSearchEffects]),
    Ng2SearchPipeModule,
   ],
  providers: [ PatientSearchFacade, ],
  declarations: [ PatientsSearchComponent ],
  exports: [
    PatientsSearchComponent,
  ],

})
export class PatientSearchModule { }