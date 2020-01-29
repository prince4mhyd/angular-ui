import 'jasmine';
import { LoginPage, StickyNotePage } from '../../src/pages';
import { Helpers } from '../../src/utils/Helpers';
import { browser, ExpectedConditions } from 'protractor';
import { DbParams } from '../../config/params/db';
import { StickyNoteAPI } from '../../api-services/clinical';
let randomText;
let response;
let pgClient;
let value;
let result;
const sNotesApi = new StickyNoteAPI();
const dbparams = new DbParams();
const username = dbparams.parameters.postgreUserName;
const password = dbparams.parameters.postgrePassword;
const server = dbparams.parameters.postgreServer;
const port = dbparams.parameters.postgrePort;
const dbname = dbparams.parameters.postgreDatabaseName;
const stickyNotes = new StickyNotePage();
const loginPage = new LoginPage();
describe('Verify sticky note funcionality from UI -> API -> DB', async () => {
  it('Validate if user is able to Login to polaris', async () => {
    await loginPage.login();
    expect(await stickyNotes.elements.patientHeader.getText()).toBe('Patients');
  });
  it('Verify if the user is able to create a sticky note from UI', async () => {
    randomText = 'Test Sticky' + Helpers.randomString(3, 'numerals');
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.selectPatient), 20000);
    await stickyNotes.elements.selectPatient.click();
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.patientsAll.get(0)), 20000);
    await stickyNotes.elements.patientsAll.get(0).click();
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.add.plusButton), 45000);
    await stickyNotes.elements.add.plusButton.click();
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.add.addTextArea), 45000);
    await stickyNotes.elements.add.addTextArea.clear();
    await stickyNotes.elements.add.addTextArea.sendKeys(randomText);
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.add.saveButton), 45000);
    await stickyNotes.elements.add.saveButton.click();
    await browser.sleep(5000);
    await browser.wait(ExpectedConditions.invisibilityOf(stickyNotes.elements.add.addTextArea), 45000);
    await browser.wait(ExpectedConditions.visibilityOf(stickyNotes.elements.stickyBodyAll.get(0)), 20000);
    expect(await stickyNotes.elements.stickyBodyAll.get(0).getText()).toBe(randomText);
  });
  it('Validate the sticky Note created from UI is retrieved from API response', async () => {
    response = await sNotesApi.getSticky('98');
    expect(response.body[0].body).toBe(randomText);
  });
  it('Validate the sticky Note created from UI is retrieved from DB Query', async () => {
    const pg = require('pg');
    const connectionString = 'postgres://' + username + ':' + password + '@' + server + ':' + port + '/' + dbname;
    pgClient = new pg.Client(connectionString);
    await pgClient.connect();
    result = await pgClient.query('select * from patientnote order by note_sid desc');
    value = result.rows[0].body;
    value = value.toString().trim();
    expect(value).toBe(randomText);
  });
});

