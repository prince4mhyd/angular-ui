import { PatientSearchActions, PatientSearchActionTypes } from './patients-search.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientViewModel } from '../../select-patient/models/patientviewmodel';

export interface IPatientSearchState {
    batchSize: number;
    items: any;
    nextSeed: string;
    previousSeed: string;
}

export const defaultState: IPatientSearchState = {
    batchSize: undefined,
    items: [],
    nextSeed: '',
    previousSeed: '',
}

export function patientSearchReducer(state: IPatientSearchState = defaultState, action: PatientSearchActions) {
    switch (action.type) {
        case PatientSearchActionTypes.PATIENTS_SEARCH: {
            return {
                ...state,
            };
        }
        case PatientSearchActionTypes.PATIENTS_SEARCH_SUCCESS: {
            return {
                ...state,
                items: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export const patientSearch = 'patientSearchReducer';
export namespace PatientSearchLinksQuery {
    export const getPatientSearchState = createFeatureSelector<IPatientSearchState>(
        patientSearch,
    );
    export const getPatients = createSelector(
        getPatientSearchState,
        (state: IPatientSearchState) => {
            return state;
        },
    )
}