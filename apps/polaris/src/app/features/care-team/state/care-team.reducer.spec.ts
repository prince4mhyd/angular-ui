import { defaultState, careTeamReducer as reducer } from './care-team.reducer';
import * as careTeamActions from './care-team.actions';
import { cloneDeep } from 'lodash';
import { MockCareTeam } from '../mock-data/care-team-mock-data';

const DEFAULT_STATE = defaultState;

describe('CareTeam Reducer', () => {
    it('should return INITIAL_STATE', () => {
        let state;
        state = reducer(DEFAULT_STATE, new careTeamActions.CareTeamsLoadAction());
        expect(state).toEqual(DEFAULT_STATE)
    });
    it('should set care team on load success', () => {
        let state;
        state = reducer(DEFAULT_STATE, new careTeamActions.CareTeamsLoadSuccessAction(cloneDeep(MockCareTeam)));
        expect(state).toEqual({
            ...DEFAULT_STATE,
            patientNotes: cloneDeep(MockCareTeam.patientNotes),
            patientCareTeams: cloneDeep(MockCareTeam.patientCareTeams)
        });
    });
    it('should reset on reset action', () => {
        let state;
        state = reducer(DEFAULT_STATE, new careTeamActions.ResetAction());
        expect(state).toEqual({
            defaultState
        });
    });
});
