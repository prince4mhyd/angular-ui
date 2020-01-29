import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ICareTeamState } from 'app/features/care-team/state/care-team.reducer';

@Injectable({
    providedIn: 'root',
  })
export class CareTeamService {

    public apiPath = '/api/local/clinical/patients';

    constructor(private http: HttpClient) {}

    public getPatientCareTeams(patientId) {
        return this.http.get<ICareTeamState>(`${this.apiPath}/${patientId}/patient-aggregate`);
    }
}