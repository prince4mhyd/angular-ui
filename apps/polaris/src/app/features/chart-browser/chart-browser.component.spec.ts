import { MockFacade } from "../care-team/state/mock-care-team.service";
import { ChartBrowserComponent } from './chart-browser.component';
import { MockCareTeam } from '../care-team/mock-data/care-team-mock-data';
import { cloneDeep } from 'lodash';


describe('ChartBrowserComponent', () => {
    let comp: ChartBrowserComponent;
    let careTeamFacade: MockFacade;

    beforeEach(() => {
        careTeamFacade = new MockFacade();
        comp = new ChartBrowserComponent(
            careTeamFacade as any
        );
    });

    describe('when initialized', () => {
        it('should have a defined component', () => {
            expect(comp).toBeDefined();
        });
    });

    describe('ngOnInit', () => {
        it('should set data to the careteam', () => {
            comp.ngOnInit();
            expect(comp.careTeams).toEqual(cloneDeep(MockCareTeam.patientCareTeams));
        });
        it('should set the length as 2', () => {
            comp.ngOnInit();
            expect(comp.careTeamCount).toEqual(2);
        })
    });

    describe('stickyNotesCount', () => {
        it('should set the notesCount as 4', () => {
            comp.stickyNotesCount(4)
            expect(comp.notesCount).toEqual(4);
        });
    });

    describe('getSpecialty', () => {
        it('should return specialty name', () => {
            const component = comp.getSpecialty('171100000X');
            expect(component).toEqual('Acupuncturist');
        });
    });

    describe('getProviderName', () => {
        it('should return provider name', () => {
            const component = comp.getProviderName(447);
            expect(component).toEqual('Ford, David E. MD');
        });
    });
});
