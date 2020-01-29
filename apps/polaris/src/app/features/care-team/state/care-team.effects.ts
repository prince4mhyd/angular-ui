import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CareTeamsLoadAction, CareTeamsActionTypes, CareTeamsLoadSuccessAction, ResetAction } from './care-team.actions';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { CareTeamService } from '@polaris/api/services';
import { PatientsService } from 'app/features/select-patient/patients.service';
import { of } from 'rxjs';
import { PatientSearchActionTypes, ResetPatientFeaturesAction } from 'app/features/patients-search/state/patients-search.actions';

@Injectable()
export class CareTeamEffects {
    constructor(
        protected actions: Actions,
        private service: CareTeamService,
        protected patientService: PatientsService,
    ) {}

    @Effect() public getCareTeam = this.actions
        .pipe(
            ofType<CareTeamsLoadAction>(CareTeamsActionTypes.LOAD_CARETEAMS),
            withLatestFrom(this.patientService.selectedpatient),
            switchMap(([data, patient]) => {
                return patient?this.service.getPatientCareTeams(patient.patientId):of([]);
            }),
            map((value:any) => {
                return new CareTeamsLoadSuccessAction(value)
            }),
        );
        @Effect() public patientReset = this.actions
        .pipe(
            ofType<ResetPatientFeaturesAction>(PatientSearchActionTypes.RESET_PATIENT_FEATURES),
            mergeMap(() => [new ResetAction(), new CareTeamsLoadAction()])); 
}