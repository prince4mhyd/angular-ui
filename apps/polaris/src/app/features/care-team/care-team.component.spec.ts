import { CareTeamComponent } from "./care-team.component";
import { cloneDeep } from 'lodash';
import { MockCareTeam } from './mock-data/care-team-mock-data';
import { MockFacade } from './state/mock-care-team.service';

describe('CareTeamComponent', () => {
    let comp: CareTeamComponent;
    let careTeamFacade: MockFacade;

    beforeEach(() => {
        careTeamFacade = new MockFacade();
        comp = new CareTeamComponent(
            careTeamFacade as any
        );
    });

    describe('when initialized', () => {
        it('should have a defined component', () => {
            expect(comp).toBeDefined();
        });
    });

    describe('ngOnInit', () => {
        it('should call loadPatientCareTeams', () => {
            const spy = spyOn(comp, 'loadPatientCareTeams');
            comp.ngOnInit();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('loadPatientCareTeams', () => {
        it('should set the values to the care team', () => {
            comp.loadPatientCareTeams();
            expect(comp.careTeam[1].specialtyCode).toBe("3416A0800X");
        });
        it('should set members count as 1', () => {
            comp.loadPatientCareTeams();
            expect(comp.membersCount).toEqual(2);
        })
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
    describe('getProviderPhone', () => {
        it('should return provider phone number', () => {
            const component = comp.getProviderPhone(447);
            expect(component).toEqual('(916) 555-5653');
        });
    });
});