import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
    StickyNotesActionTypes,
    StickyNotesLoadAction,
    StickyNotesLoadSuccessAction,
    StickyNotesAddAction,
    StickyNotesEditAction,
    StickyNotesDeleteAction,
    LoadPatientDemographicsSuccessAction,
    LoadPatientDemographicsAction,
    LoadPatientVitalsAction,
    LoadPatientMedicationsAction,
    LoadPatientVitalsSuccessAction,
    LoadPatientMedicationsSuccessAction,
    LoadPatientEncountersAction,
    LoadPatientEncountersSuccessAction,
} from './sticky-notes.actions';
import { switchMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { StickyNoteService } from '@polaris/api/services';
import { CareTeamsLoadAction } from 'app/features/care-team/state/care-team.actions';
import { PatientsService } from 'app/features/select-patient/patients.service';
import { of } from 'rxjs';

@Injectable()
export class StickyNotesEffects {
    constructor(protected actions: Actions,
        private service: StickyNoteService,
        protected patientService: PatientsService,
    ) { }

    @Effect() public addStickyNote = this.actions
        .pipe(
            ofType<StickyNotesAddAction>(StickyNotesActionTypes.ADD_STICKY_NOTE),
            switchMap(data => {
                return this.service.addStickyNotes(data.payload)
            }),
            map(() => {
                return new CareTeamsLoadAction()
            }),
        );
    @Effect() public editStickyNote = this.actions
        .pipe(
            ofType<StickyNotesEditAction>(StickyNotesActionTypes.EDIT_STICKY_NOTE),
            switchMap(action => {
                return this.service.updateStickyNotes(action.payload)
            }),
            map(() => {
                return new CareTeamsLoadAction()
            }),
        );
    @Effect() public deleteStickyNote = this.actions
        .pipe(
            ofType<StickyNotesDeleteAction>(StickyNotesActionTypes.DELETE_STICKY_NOTE),
            switchMap(action => {
                return this.service.deleteStickyNotes(action.noteSid, action.patientId)
            }),
            map(() => {
                return new CareTeamsLoadAction()
            }),
        );
    @Effect() public getPatientDemoGraphics = this.actions
        .pipe(
            ofType<LoadPatientDemographicsAction>(StickyNotesActionTypes.LOAD_PATIENT_DEMOGRAPHICS),
            switchMap((action) => {
                return action.patientId ? this.service.loadPatientDemographics(action.patientId) : of([]);
            }),
            map((value:any) => {
                return new LoadPatientDemographicsSuccessAction(value)
            }),
    );
    @Effect() public getPatientVitals = this.actions
        .pipe(
            ofType<LoadPatientVitalsAction>(StickyNotesActionTypes.LOAD_PATIENT_VITALS),
            switchMap((action) => {
                return action.patientId ? this.service.loadPatientVitals(action.patientId) : of([]);
            }),
            map((value:any) => {
                return new LoadPatientVitalsSuccessAction(value)
            }),
    );
    @Effect() public getPatientMedications = this.actions
        .pipe(
            ofType<LoadPatientMedicationsAction>(StickyNotesActionTypes.LOAD_PATIENT_MEDICATIONS),
            switchMap((action) => {
                return action.patientId ? this.service.loadPatientMedications(action.patientId) : of([]);
            }),
            map((value:any) => {
                return new LoadPatientMedicationsSuccessAction(value)
            }),
    );
    @Effect() public getPatientEncounters = this.actions
        .pipe(
            ofType<LoadPatientEncountersAction>(StickyNotesActionTypes.LOAD_PATIENT_ENCOUNTERS),
            switchMap((action) => {
                return action.patientId ? this.service.loadPatientEncounters(action.patientId) : of([]);
            }),
            map((value:any) => {
                return new LoadPatientEncountersSuccessAction(value)
            }),
    );
}