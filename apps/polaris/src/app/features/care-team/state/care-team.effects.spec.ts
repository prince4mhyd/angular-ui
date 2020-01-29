import { Observable, of as observableOf } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { CareTeamService } from '@polaris/api/services';
import { CareTeamEffects } from './care-team.effects';
import { CareTeamFacade } from './care-team.facade';
import { ResetPatientFeaturesAction } from 'app/features/patients-search/state/patients-search.actions';
import * as CareTeamActions from './care-team.actions';
import { cloneDeep } from 'lodash';
import { PatientsService } from 'app/features/select-patient/patients.service';
import { MockCareTeam } from '../mock-data/care-team-mock-data';
import { MockCareTeamService, MockPatientsService, MockFacade } from './mock-care-team.service';

describe('Sticky Notes Effect', () => {
    let effects: CareTeamEffects;
    let actions: Observable<any>;
    let service: MockCareTeamService;
    let patientService: MockPatientsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CareTeamEffects,
                provideMockActions(() => actions),
                {
                    provide: CareTeamFacade,
                    useClass: MockFacade,
                },
                {
                    provide: CareTeamService,
                    useClass: MockCareTeamService,
                },
                {
                    provide: PatientsService,
                    useClass: MockPatientsService,
                },
            ],
        });

        effects = TestBed.get(CareTeamEffects);
        service = TestBed.get(CareTeamService);
        patientService = TestBed.get(PatientsService);
    });

    describe('getCareTeam', () => {
        it('should get care team data', () => {
            const action = new CareTeamActions.CareTeamsLoadAction();
            const loadSuccess = new CareTeamActions.CareTeamsLoadSuccessAction(cloneDeep(MockCareTeam));

            actions = hot('a', { a: action });
            const expected = cold('(b)', { b: loadSuccess });

            expect(effects.getCareTeam).toBeObservable(expected);
        });
    })

    describe('patientReset', () => {
        it('should reset then load', () => {
            const action = new ResetPatientFeaturesAction();
            const reset = new CareTeamActions.ResetAction();
            const load = new CareTeamActions.CareTeamsLoadAction();

            actions = hot('a', { a: action });
            const expected = cold('(bc)', { b: reset, c: load });

            expect(effects.patientReset).toBeObservable(expected);
        });
    });

});
