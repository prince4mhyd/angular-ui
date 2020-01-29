import { StickyNotePage, LoginPage} from '../pages';
import { browser, ExpectedConditions } from 'protractor';
import {MongoDb} from '../pages/mongoDbConnect.page';

describe('Validate the sticky notes from UI to  Mongo DB', async () => {
    const MongoDatabase = new MongoDb();
    const stickyNotes = new StickyNotePage();
    const loginPage = new LoginPage();
    it('Verify DB connection from UI and verify in Mongo DB', async () => {
        await loginPage.login();
        await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.selectPatient), 20000);
        await stickyNotes.elements.selectPatient.click();
        await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.patientsAll.get(0)), 20000);
        await stickyNotes.elements.patientsAll.get(0).click();
        await browser.wait(ExpectedConditions.invisibilityOf(stickyNotes.elements.add.addTextArea), 45000);
        await browser.wait(ExpectedConditions.visibilityOf(stickyNotes.elements.stickyBodyAll.get(0)), 20000);
        const latest_record_from_ui = await stickyNotes.elements.stickyBodyAll.get(0).getText();
        console.log('result from UI is ' + latest_record_from_ui);
        const resultfromMongo = MongoDatabase.connectToDb('http://localhost:1405/patients/98/sticky-notes', 'body', '0');
        console.log('result from Mongo is ' + resultfromMongo);
        expect(resultfromMongo).toBe(latest_record_from_ui);
    });
});
