import { Action } from '@ngrx/store';
import { StickyNotesModel } from '../sticky-notes.model';

export enum StickyNotesActionTypes {
    LOAD_NOTES = '[Sticky Notes] Load',
    LOAD_NOTES_SUCCESS = '[Sticky Notes] Load Success',

    ADD_STICKY_NOTE = '[Sticky Notes] Add Sticky Note',
    ADD_STICKY_NOTE_SUCCESS = '[Sticky Notes] Add Sticky Note Success',
    EDIT_STICKY_NOTE = '[Sticky Notes] Edit Sticky Note',

    DELETE_STICKY_NOTE = '[Sticky Notes] Delete Sticky Note',
    DELETE_STICKY_NOTE_SUCCESS = '[Sticky Notes] Delete Sticky Note success',

    LOAD_PATIENT_DEMOGRAPHICS = '[Patient Demographics] Load',
    LOAD_PATIENT_DEMOGRAPHICS_SUCCESS = '[Patient Demographics] Load Success',

    LOAD_PATIENT_VITALS = '[Patient Vitals] Load',
    LOAD_PATIENT_VITALS_SUCCESS = '[Patient Vitals] Load Success',

    LOAD_PATIENT_MEDICATIONS = '[Patient Medications] Load',
    LOAD_PATIENT_MEDICATIONS_SUCCESS = '[Patient Medications] Load Success',
    
    LOAD_PATIENT_ENCOUNTERS = '[Patient Encounters] Load',
    LOAD_PATIENT_ENCOUNTERS_SUCCESS = '[Patient Encounters] Load Success',
}

export class StickyNotesLoadAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_NOTES;
}

export class StickyNotesLoadSuccessAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_NOTES_SUCCESS;
    constructor(public payload: StickyNotesModel[]) {}
}

export class StickyNotesAddAction implements Action {
    public readonly type = StickyNotesActionTypes.ADD_STICKY_NOTE;
    constructor(public payload: StickyNotesModel ) {}
}
export class StickyNotesAddSuccessAction implements Action {
    public readonly type = StickyNotesActionTypes.ADD_STICKY_NOTE_SUCCESS;
    constructor(public payload: StickyNotesModel) {}
}

export class StickyNotesEditAction implements Action {
    public readonly type = StickyNotesActionTypes.EDIT_STICKY_NOTE;
    constructor(public payload: StickyNotesModel) {}
}

export class StickyNotesDeleteAction implements Action {
    public readonly type = StickyNotesActionTypes.DELETE_STICKY_NOTE;
    constructor(public noteSid: number, public patientId: number) {}
}
export class StickyNotesDeleteSuccessAction implements Action {
    public readonly type = StickyNotesActionTypes.DELETE_STICKY_NOTE_SUCCESS;
    constructor(public noteSid: number) {}
}

export class LoadPatientDemographicsAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_PATIENT_DEMOGRAPHICS;
    constructor(public patientId: string) {}
}
export class LoadPatientDemographicsSuccessAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_PATIENT_DEMOGRAPHICS_SUCCESS;
    constructor(public payload: any[]) {}
}

export class LoadPatientVitalsAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_PATIENT_VITALS;
    constructor(public patientId: string) {}
}
export class LoadPatientVitalsSuccessAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_PATIENT_VITALS_SUCCESS;
    constructor(public payload: any[]) {}
}
export class LoadPatientMedicationsAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_PATIENT_MEDICATIONS;
    constructor(public patientId: string) {}
}
export class LoadPatientMedicationsSuccessAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_PATIENT_MEDICATIONS_SUCCESS;
    constructor(public payload: any[]) {}
}
export class LoadPatientEncountersAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_PATIENT_ENCOUNTERS;
    constructor(public patientId: string) {}
}
export class LoadPatientEncountersSuccessAction implements Action {
    public readonly type = StickyNotesActionTypes.LOAD_PATIENT_ENCOUNTERS_SUCCESS;
    constructor(public payload: any[]) {}
}


export type StickyNotesActions = 
    | StickyNotesLoadAction
    | StickyNotesLoadSuccessAction
    | StickyNotesAddAction
    | StickyNotesAddSuccessAction
    | StickyNotesEditAction
    | StickyNotesDeleteAction
    | StickyNotesDeleteSuccessAction
    | LoadPatientDemographicsAction
    | LoadPatientDemographicsSuccessAction
    | LoadPatientVitalsAction
    | LoadPatientVitalsSuccessAction
    | LoadPatientMedicationsAction
    | LoadPatientMedicationsSuccessAction
    | LoadPatientEncountersAction
    | LoadPatientEncountersSuccessAction;