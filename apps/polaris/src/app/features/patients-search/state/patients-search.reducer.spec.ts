import * as searchActions from './patients-search.actions';
import { patientSearchReducer as reducer, defaultState } from './patients-search.reducer';
import { cloneDeep } from 'lodash';
import { mockPatientViewModel, mockPatientSearchData } from 'app/features/patients-search/mock-data/patients-mock-viewmodel';

const DEFAULT_STATE = defaultState;

describe('Patients Search Reducer', () => {
        it('should set patient search load success', () => {
            let state;
            state = reducer(DEFAULT_STATE, new searchActions.PatientSearchLoadAction(cloneDeep(mockPatientSearchData.items[0])));
            expect(state).toEqual({
                ...DEFAULT_STATE,
            });
        });

        it('should set patient view model load success', () => {
            let state;
            state = reducer(DEFAULT_STATE, new searchActions.PatientSearchLoadSuccessAction(cloneDeep(mockPatientViewModel)));
            expect(state).toEqual({
                ...DEFAULT_STATE,
                batchSize: mockPatientViewModel.batchSize,
                items: mockPatientViewModel.items,
                nextSeed: mockPatientViewModel.nextSeed,
                previousSeed: mockPatientViewModel.previousSeed,
            });
        });

});