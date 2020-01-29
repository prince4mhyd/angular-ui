import { Action } from '@ngrx/store';
import { PatientSearchModel } from '../../select-patient/models/patient-model';
import { PatientViewModelList } from '../../select-patient/models/patientviewmodel';

export enum PatientSearchActionTypes {
    PATIENTS_SEARCH = '[Patient Search] Patients Search',
    PATIENTS_SEARCH_SUCCESS = '[Patient Search] Patients Search Success',
    RESET_PATIENT_FEATURES = '[Patient Search] Patients RESET'
}

export class PatientSearchLoadAction implements Action {
    public readonly type = PatientSearchActionTypes.PATIENTS_SEARCH;
    constructor() { }
}

export class PatientSearchLoadSuccessAction implements Action {
    public readonly type = PatientSearchActionTypes.PATIENTS_SEARCH_SUCCESS;
    constructor(public payload: any[]) { }
}

export class ResetPatientFeaturesAction implements Action {
    public readonly type = PatientSearchActionTypes.RESET_PATIENT_FEATURES;
    constructor() { }
}

export type PatientSearchActions =
    | PatientSearchLoadAction
    | PatientSearchLoadSuccessAction
    | ResetPatientFeaturesAction;