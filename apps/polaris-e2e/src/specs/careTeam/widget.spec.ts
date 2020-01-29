import { CareTeamPage, LoginPage, StickyNotePage } from '../../pages';
import { browser, ExpectedConditions } from 'protractor';
import { async } from 'q';


const careTeam = new CareTeamPage();
const loginPage = new LoginPage();
const stickyNotes = new StickyNotePage();

describe('Validate the Care Team widget no Care Team data', async () => {
    beforeAll(async () => {
        await loginPage.login();
        await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.selectPatient), 20000);
        const sampleVar = await stickyNotes.elements.selectPatient.getText();
        await stickyNotes.elements.selectPatient.click();
        await browser.wait(ExpectedConditions.elementToBeClickable(careTeam.elements.abner), 20000);
        await careTeam.elements.abner.click();
    });
    afterAll(async () => {
        await loginPage.logout();
    });
    it('Verify if the message \'No Active Care Team\' is displayed for patient with no care Team data', async () => {
        expect(await careTeam.elements.noActiveCareTeam.getText()).toBe('No Active Care Team');
    });
});
describe('Validate the Care Team widget with valid care Team data', async () => {
    beforeAll(async () => {
        await loginPage.login();
        await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.selectPatient), 20000);
        await stickyNotes.elements.selectPatient.click();
        await browser.wait(ExpectedConditions.elementToBeClickable(careTeam.elements.aliceAron), 20000);
        await careTeam.elements.aliceAron.click();
    });
    afterAll(async () => {
        await loginPage.logout();
    });
    it('Verify if the title \'Care Team\' is displayed', async () => {
        expect(await careTeam.elements.careTeamTitle.getText()).toBe('Care Team');
    });
    it('Verify if the list of the members are  displayed', async () => {
        expect(await careTeam.elements.careTeamMember.isDisplayed()).toBe(true);
    });
    it('Verify if the care Team icon is displayed', async () => {
        expect(await careTeam.elements.careTeamIcon.isDisplayed()).toBe(true);
    });
    it('Verify if the Provider Name is displayed', async () => {
        expect(await careTeam.elements.providerNamesAll.get(0).isDisplayed()).toBe(true);
    });
    it('Verify if the Provider practice  is displayed', async () => {
        expect(await careTeam.elements.practicesAll.get(0).isDisplayed()).toBe(true);
    });
    it('Verify if the Provider phone Number is displayed', async () => {
        expect(await careTeam.elements.phoneNosAll.get(0).isDisplayed()).toBe(true);
    });
});
