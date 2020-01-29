import { PatientsSearchComponent } from "./patients-search.component";
import { mockPatientViewModel } from './mock-data/patients-mock-viewmodel';
import { cloneDeep } from 'lodash';
import { MockPatientSearchFacade, MockPatientsService, ChangeDetectorRefMock, MockRouter } from './mock-patient-search.service';

describe('PatientsSearchComponent', () => {
    let comp: PatientsSearchComponent;
    let router: MockRouter;
    let patientSearchFacade: MockPatientSearchFacade;
    let service: MockPatientsService;

    beforeEach(() => {
        patientSearchFacade = new MockPatientSearchFacade();
        router = new MockRouter();
        service = new MockPatientsService()
        comp = new PatientsSearchComponent(
            service as any,
            router as any,
            patientSearchFacade as any,
            new ChangeDetectorRefMock() as any);
    });

    describe('when initialized', () => {
        it('should have a defined component', () => {
            expect(comp).toBeDefined();
        });
    });

    describe('onInit', () => {
        it('should set values to the patient', () => {
            comp.ngOnInit();
            expect(comp.patients).toEqual(cloneDeep(mockPatientViewModel.items));
        });
    });

    describe('on search patient', () => {
        it('should search on patient', () => {
            comp.searchPatient('');
            expect(comp.patients).toEqual(cloneDeep(mockPatientViewModel.items));
        });
    });

    describe('OnSelect', () => {
        it('should call resetPatient', () => {
            const spy = spyOn(patientSearchFacade, 'resetPatient');
            comp.OnSelect(cloneDeep(mockPatientViewModel.items[0]));
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('getPatientAvatar', () => {
        it('should return ChargeHistoryItem', () => {
            const result = comp.getPatientAvatar(cloneDeep(mockPatientViewModel.items[0]));
            expect(result).toEqual('A');
        });
    });
    describe('onCancel', () => {
        it('should call onemit', () => {
            const spy = spyOn(comp.OnClose, 'emit');
            comp.onCancel();
            expect(spy).toBeTruthy();
        });
    });
    describe('getRandomColor', () => {
        it('should return background color', () => {
            expect(comp.getRandomColor(0)["background-color"]).toBe('#8d90ce')
        });
        it('should return background color', () => {
            expect(comp.getRandomColor(1)["background-color"]).toBe('#8dcea1')
        });
        it('should return background color', () => {
            expect(comp.getRandomColor(3)["background-color"]).toBe('#695229')
        });
        it('should return background color', () => {
            expect(comp.getRandomColor(4)["background-color"]).toBe('#cef0ea')
        });
        it('should return background color', () => {
            expect(comp.getRandomColor(7)["background-color"]).toBe('#edc7cc')
        });
    });
});
