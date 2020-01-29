import { CareTeamFacade } from "./care-team.facade";
import { MockStore } from './mock-care-team.service';

describe('CareTeam Facade', () => {
    let facade: CareTeamFacade;
    let store: MockStore;

    beforeEach(() => {
        store = new MockStore();
        facade = new CareTeamFacade(store as any);
    });

    it('should dispatch patients care team load action for getPatientCareTeam', () => {
        spyOn(store, 'dispatch');
        facade.getPatientCareTeams();
        expect(store.dispatch).toHaveBeenCalled();
    });
    it('should dispatch care team load action for getCareTeam', () => {
        spyOn(store, 'dispatch');
        facade.getCareTeams();
        expect(store.dispatch).toHaveBeenCalled();
    });
    it('should dispatch sticky notes load action for getStickynotes', () => {
        spyOn(store, 'dispatch');
        facade.getstickynotes();
        expect(store.dispatch).toHaveBeenCalled();
    });
});