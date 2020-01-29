import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as searchActions from './patients-search.actions';
import { IPatientSearchState, PatientSearchLinksQuery } from './patients-search.reducer';
import { PatientSearchModel } from '../../select-patient/models/patient-model';

@Injectable()
export class PatientSearchFacade {
    constructor(private store: Store<IPatientSearchState>) { }

    public readonly patientSearch = this.store.select(PatientSearchLinksQuery.getPatients);

    public getAllPatient() {
        this.store.dispatch(new searchActions.PatientSearchLoadAction());
        return this.patientSearch;
    }

    public resetPatient() {
        this.store.dispatch(new searchActions.ResetPatientFeaturesAction());
    }
}