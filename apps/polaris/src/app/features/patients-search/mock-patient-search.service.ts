import { of as observableOf, BehaviorSubject, of } from 'rxjs';
import { cloneDeep } from 'lodash';
import { mockPatientViewModel } from './mock-data/patients-mock-viewmodel';
import { PatientViewModel } from '../select-patient/models/patientviewmodel';
import { PatientSearchModel } from '../select-patient/models/patient-model';


export class ChangeDetectorRefMock {
    public detectChanges() { }
}

export class MockPatientSearchFacade {
    public getAllPatient() {
        return observableOf(cloneDeep(mockPatientViewModel));
    }
    public resetPatient() { }
}

export class MockPatientsService {
    public selectedpatient = new BehaviorSubject<PatientViewModel>(undefined);
}

export class MockPatientViewService {
    public getAllPatient(searchData: PatientSearchModel) {
        return observableOf(cloneDeep(mockPatientViewModel))
    }
}
export class MockRouter {
    public url = '';
    public navigate() { }
}

export class MockStore {
    public data: any;

    public select() {
        return observableOf(this.data);
    }
  public dispatch() {
  }
}
