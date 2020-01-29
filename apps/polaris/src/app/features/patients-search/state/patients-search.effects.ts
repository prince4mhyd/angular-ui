import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PatientViewService } from '@polaris/api/services';
import { PatientSearchLoadAction, PatientSearchActionTypes, PatientSearchLoadSuccessAction } from './patients-search.actions';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class PatientSearchEffects {
    constructor(
        protected actions: Actions,
        private service: PatientViewService
    ) { }

    @Effect() public getPatientSearch = this.actions
        .pipe(
            ofType<PatientSearchLoadAction>(PatientSearchActionTypes.PATIENTS_SEARCH),
            switchMap(data => {
                return this.service.getAllPatients()
            }),
            map((value) => {
                return new PatientSearchLoadSuccessAction(value)
            }),
        );
}