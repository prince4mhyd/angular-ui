import { element , by} from 'protractor';

export class CareTeamPage  {
    public elements = {
        aliceAron: element(by.cssContainingText('.title', 'Aaron, Alice B')),
        abner: element(by.cssContainingText('.title', 'Abner, Darlene E')),
        careTeamTitle: element(by.css('.title-section .title')),
        careTeamMember: element(by.css('.title-section .subtitle')),
        careTeamIcon: element(by.className('ion-md-people')),
        providerNamesAll: element.all(by.className('providerName')),
        practicesAll: element.all(by.className('practice')),
        phoneNosAll: element.all(by.className('phoneNo')),
        noActiveCareTeam: element(by.className('team-message')),
    };
}
