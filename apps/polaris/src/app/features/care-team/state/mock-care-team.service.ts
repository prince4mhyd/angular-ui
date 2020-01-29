import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { cloneDeep } from 'lodash';
import { MockCareTeam } from '../mock-data/care-team-mock-data';
import { PatientViewModel } from 'app/features/select-patient/models/patientviewmodel';

 export class MockCareTeamService {
    public getPatientCareTeams(patientId: string) {
        return observableOf(cloneDeep(MockCareTeam));
    }
}

 export class MockFacade {
    public getPatientCareTeams() {
        return observableOf(cloneDeep(MockCareTeam));
    }
    public getCareTeams() {
        return observableOf(cloneDeep(MockCareTeam.patientCareTeams));
    }
}
export class MockPatientsService {
    public selectedpatient = new BehaviorSubject<PatientViewModel>(createCurrentPatient());
 }
 export class MockStore {
    public select() {
        return observableOf(undefined);
    }
    public dispatch() {}
}

 function createCurrentPatient(): PatientViewModel {
    const patient = new PatientViewModel();
    patient.patientId = 98;
    return patient;
}