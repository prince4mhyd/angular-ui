import 'jasmine';
import { StickyNoteAPI } from '../../api-services/clinical';
import { Helpers } from '../../src/utils/Helpers';
import { DbParams } from '../../config/params';
import { browser, ExpectedConditions } from 'protractor';
import { LoginPage, StickyNotePage } from '../../src/pages';

let response;
let sampleBody;
let validBody;
let result;
let pgClient;
let value;
const sNotesApi = new StickyNoteAPI();
const stickyNotes = new StickyNotePage();
const loginPage = new LoginPage();
const dbparams = new DbParams();
const username = dbparams.parameters.postgreUserName;
const password = dbparams.parameters.postgrePassword;
const server = dbparams.parameters.postgreServer;
const port = dbparams.parameters.postgrePort;
const dbname = dbparams.parameters.postgreDatabaseName;
describe('Verify sticky note funcionality from  API > UI > DB', async () => {
    const pg = require('pg');
    const connectionString = 'postgres://' + username + ':' + password + '@' + server + ':' + port + '/' + dbname;
    pgClient = new pg.Client(connectionString);
    sampleBody = 'Test Sticky body' + Helpers.randomString(3, 'numerals');
    validBody = {
        practiceId: '1',
        patientId: '98',
        noteSid: '103',
        timeStamp: '20191129190557',
        lastUser: '0',
        createStamp: '20191129190557',
        createUser: 0,
        body: sampleBody,
        classType: 'STICKY',
        isDeleted: '0',
    };
    it('Validate the post status code', async () => {
        response = await sNotesApi.postSticky('98', validBody);
        expect(response.status).toBe(200);
    });
    it('Verify if the created sticky note from MS  is retrieved from UI', async () => {
        await loginPage.login();
        await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.selectPatient), 20000);
        await stickyNotes.elements.selectPatient.click();
        await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.patientsAll.get(0)), 20000);
        await stickyNotes.elements.patientsAll.get(0).click();
        await browser.wait(ExpectedConditions.invisibilityOf(stickyNotes.elements.add.addTextArea), 45000);
        await browser.wait(ExpectedConditions.visibilityOf(stickyNotes.elements.stickyBodyAll.get(0)), 20000);
        expect(await stickyNotes.elements.stickyBodyAll.get(0).getText()).toBe(sampleBody);
    });
    it('Verify if the created sticky note from MS  is retrieved from DB', async () => {
        await pgClient.connect();
        result = await pgClient.query('select * from patientnote order by note_sid desc');
        value = result.rows[0].body;
        value = value.toString().trim();
        expect(value).toBe(sampleBody);
      });
});