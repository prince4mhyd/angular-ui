import { CareTeamsActions, CareTeamsActionTypes } from './care-team.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientCareTeam } from '../models/care-team.model';
import { StickyNotesModel } from 'app/features/sticky-notes/sticky-notes.model';

export interface ICareTeamState {
    patientCareTeams: PatientCareTeam[];
    patientNotes: StickyNotesModel[];
}

export const defaultState: ICareTeamState = {
    patientCareTeams: [],
    patientNotes: []
}

export function careTeamReducer(state: ICareTeamState = defaultState, action: CareTeamsActions) {
    switch(action.type) {
        case CareTeamsActionTypes.LOAD_CARETEAMS: {
            return {
                ...state
            }
        }
        case CareTeamsActionTypes.LOAD_CARETEAMS_SUCCESS: {
            return {
                ...state,
                patientCareTeams: action.payload.patientCareTeams,
                patientNotes: action.payload.patientNotes
            }
        }
        case CareTeamsActionTypes.RESET_ACTION: {
            return {
                defaultState,
            }
        }
        default: {
            return state;
        }
    }
}

export const careTeam = 'careTeamReducer';
export namespace CareTeamsLinksQuery {
    export const getCareTeamState = createFeatureSelector<ICareTeamState>(
        careTeam,
    );
    export const getCareTeam = createSelector(
        getCareTeamState,
        (state: ICareTeamState) => {
            return state;
        },
    )
    export const getStickNotes = createSelector(
        getCareTeamState,
        (state: ICareTeamState) => {
            return state.patientNotes;
        },
    )
    export const getCareTeams = createSelector(
        getCareTeamState,
        (state: ICareTeamState) => {
            return state.patientCareTeams;
        },
    )
}