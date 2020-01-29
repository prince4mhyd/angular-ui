import { PatientDemographicsViewComponent } from "./patient-demographics-view.component";
import { BehaviorSubject } from 'rxjs';
import { PatientViewModel } from 'app/features/select-patient/models/patientviewmodel';


describe('PatientDemographicsViewComponent', () => {
    let comp: PatientDemographicsViewComponent;
    let patientService: MockPatientsService

    class MockPatientsService {
        public selectedpatient = new BehaviorSubject<PatientViewModel>(createCurrentPatient());
    }

    beforeEach(() => {
        patientService = new MockPatientsService();
        comp = new PatientDemographicsViewComponent(
            patientService as any
        );
    });

    describe('when initialized', () => {
        it('should have a defined component', () => {
            expect(comp).toBeDefined();
        });
    });

    describe('ngOnInit', () => {
        it('should set the currentpatient', () => {
            comp.ngOnInit();
            expect(comp.currentPatient).toBeTruthy();
        });
        it('should call patientDobAge', () => {
            const spy = spyOn(comp, 'patientDobAge');
            comp.ngOnInit();
            expect(spy).toHaveBeenCalled();
        })
    })

    describe('patientSex', () => {
        it('should return the value as Female', () => {
            const patientGender = comp.patientSex('F')
            expect(patientGender).toEqual('Female')
        });
        it('should return the value as Male', () => {
            const patientGender = comp.patientSex('M')
            expect(patientGender).toEqual('Male')
        });
    });

    describe('patientDobAge', () => {
        it('should set patientDateOfBirth', () => {
            comp.patientDobAge('2006-04-28T00:00:00')
            expect(comp.patientDateOfBirth).toEqual('04/28/2006')
        });
        it('should set patientAge', () => {
            comp.patientDobAge('2006-04-28T00:00:00')
            expect(comp.patientAge).toEqual(13);
        });
    });

    describe('maskSsn', () => {
        it('should set patientDateOfBirth', () => {
            const value = comp.maskSsn('12345')
            expect(value).toEqual('X2345')
        });
    });

});

function createCurrentPatient(): PatientViewModel {
    const patient = new PatientViewModel();
    patient.patientId = 98;
    patient.dnDOB = '2006-04-28T00:00:00';
    return patient;
}