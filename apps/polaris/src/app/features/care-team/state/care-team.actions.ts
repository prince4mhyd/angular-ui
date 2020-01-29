import { Action } from '@ngrx/store';
import { PatientCareTeamResponse } from '../models/care-team.model';

export enum CareTeamsActionTypes {
    LOAD_CARETEAMS = '[CareTeams] Load CareTeams',
    LOAD_CARETEAMS_SUCCESS = '[CareTeams] Load CareTeams Success',
    RESET_ACTION = '[CareTeams] RESET DATA'
}

export class CareTeamsLoadAction implements Action {
    public readonly type = CareTeamsActionTypes.LOAD_CARETEAMS;
    constructor() {}
}

export class CareTeamsLoadSuccessAction implements Action {
    public readonly type = CareTeamsActionTypes.LOAD_CARETEAMS_SUCCESS;
    constructor(public payload: PatientCareTeamResponse) {}
}

export class ResetAction implements Action {
    public readonly type = CareTeamsActionTypes.RESET_ACTION;
    constructor() {}
}

export type CareTeamsActions = 
    | CareTeamsLoadAction
    | CareTeamsLoadSuccessAction
    | ResetAction