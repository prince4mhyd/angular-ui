import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICareTeamState, CareTeamsLinksQuery } from './care-team.reducer';
import * as searchActions from './care-team.actions';

@Injectable()
export class CareTeamFacade {
    constructor(private store: Store<ICareTeamState>) {}

    public readonly careTeams = this.store.select(CareTeamsLinksQuery.getCareTeam);
    public readonly patientCareTeams = this.store.select(CareTeamsLinksQuery.getCareTeams);
    public readonly stickynotes = this.store.select(CareTeamsLinksQuery.getStickNotes); 
    public getPatientCareTeams() {
        this.store.dispatch(new searchActions.CareTeamsLoadAction());
        return this.careTeams;
    }
    public getCareTeams(){
        this.store.dispatch(new searchActions.CareTeamsLoadAction());
        return this.patientCareTeams;
    }
    public getstickynotes(){
        this.store.dispatch(new searchActions.CareTeamsLoadAction());
        return this.stickynotes;
    }
}