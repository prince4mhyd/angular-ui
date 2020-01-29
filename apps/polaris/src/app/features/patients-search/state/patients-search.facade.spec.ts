import { PatientSearchFacade } from "./patients-search.facade";
import { of as observableOf } from 'rxjs';
import * as searchActions from './patients-search.actions';
import { PatientSearchModel } from 'app/features/select-patient/models/patient-model';
import { MockStore } from '../mock-patient-search.service';

describe('Patient Portal Facade', () => {
    let facade: PatientSearchFacade;
    let store: any = {
        select: () => observableOf(true),
        dispatch: () => { },
    };

    beforeEach(() => {
        store = new MockStore();
        facade = new PatientSearchFacade(
            store,
        );
    });
    it('should dispatch UpdatePortalPersonsAction for updatePortalPersons', () => {
        const action = new searchActions.PatientSearchLoadAction(new PatientSearchModel);
        spyOn(store, 'dispatch');
        facade.getAllPatient(new PatientSearchModel());
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
    it('should dispatch LoadLookupCodesAction for loadLookupCodes', () => {
        const action = new searchActions.ResetPatientFeaturesAction();
        spyOn(store, 'dispatch');
        facade.resetPatient();
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});