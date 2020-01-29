import { PatientSearchEffects } from './patients-search.effects';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of as observableOf, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { PatientSearchFacade } from './patients-search.facade';
import { PatientViewService } from '@polaris/api/services';
import * as PatientSearchActions from './patients-search.actions';
import { mockPatientViewModel, mockPatientSearchData } from 'app/features/patients-search/mock-data/patients-mock-viewmodel';
import { cloneDeep } from 'lodash';
import { MockPatientSearchFacade, MockPatientViewService } from '../mock-patient-search.service';

describe('Patient Search Effects', () => {
    let effects: PatientSearchEffects;
    let actions: Observable<any>;
    let service: MockPatientViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PatientSearchEffects,
                provideMockActions(() => actions),
                {
                    provide: PatientSearchFacade,
                    useClass: MockPatientSearchFacade,
                },
                {
                    provide: PatientViewService,
                    useClass: MockPatientViewService,
                },
            ],
        });

        effects = TestBed.get(PatientSearchEffects);
        service = TestBed.get(PatientViewService);
    });

    describe('getPatientSearch', () => {
        it('should return success action', () => {
            const action = new PatientSearchActions.PatientSearchLoadAction(cloneDeep(mockPatientSearchData));
            const SearchSuccess = new PatientSearchActions.PatientSearchLoadSuccessAction(cloneDeep(mockPatientViewModel));
            actions = hot('a', { a: action });
            const expected = cold('(b)', { b: SearchSuccess });
            expect(effects.getPatientSearch).toBeObservable(expected)
        });
    });
});