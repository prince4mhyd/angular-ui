import { } from 'jasmine';
import { LoginPage, StickyNotePage } from '../pages';
import { Helpers } from '../utils/Helpers';
import { browser, ExpectedConditions } from 'protractor';
import { DbParams } from 'apps/polaris-e2e/config/params';

let editRandomText;
let value;
let randomText;
let result;
let pgClient;

const dbparams = new DbParams();
const stickyNotes = new StickyNotePage();
const loginPage = new LoginPage();

const username = dbparams.parameters.postgreUserName;
const password = dbparams.parameters.postgrePassword;
const server = dbparams.parameters.postgreServer;
const port = dbparams.parameters.postgrePort;
const dbname = dbparams.parameters.postgreDatabaseName;

describe('Verify if the user is able to add a new sticky note', async () => {
  const pg = require('pg');
  const connectionString = 'postgres://' + username + ':' + password + '@' + server + ':' + port + '/' + dbname;
  pgClient = new pg.Client(connectionString);
  it('Validate if user is able to Login to polaris', async () => {
    await loginPage.login();
    expect(await stickyNotes.elements.patientHeader.getText()).toBe(stickyNotes.constants.headers.label);
  });
  it('Verify if user is able to see Sticky Notes label', async () => {
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.selectPatient), 20000);
    await stickyNotes.elements.selectPatient.click();
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.patientsAll.get(0)), 20000);
    await stickyNotes.elements.patientsAll.get(0).click();
    expect(await stickyNotes.elements.stickyHeader.getText()).toBe(stickyNotes.constants.headers.text);
  });
  it('Verify if user is able to see + icon', async () => {
    expect(await stickyNotes.elements.add.plusButton.isDisplayed()).toBe(true);
  });
  it('Verify if the user is able to see cancel button', async () => {
    randomText = 'Sticky body' + Helpers.randomString(3, 'numerals');
    await stickyNotes.elements.add.plusButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(stickyNotes.elements.add.addTextArea), 45000);
    await stickyNotes.elements.add.addTextArea.clear();
    await stickyNotes.elements.add.addTextArea.sendKeys(randomText);
    expect(await stickyNotes.elements.add.cancelButton.isDisplayed()).toBe(true);
  });
  it('Verify if the user is able to see Save button', async () => {
    expect(await stickyNotes.elements.add.saveButton.isDisplayed()).toBe(true);
  });
  it('Verify user is able to add a sticky note', async () => {
    await stickyNotes.elements.add.saveButton.click();
    expect(await stickyNotes.elements.stickyBodyAll.get(0).getText()).toBe(randomText);
  });
  it('Verify if user is able to see the created sticky note in the stored data base', async () => {
    await pgClient.connect();
    result = await pgClient.query('select * from patientnote order by note_sid desc');
    value = result.rows[0].body;
    value = value.toString().trim();
    expect(value).toBe(randomText);
  });
});
describe('Validate if the user is able to edit the sticky note', async () => {
  it('Verify if the edit button is displayed', async () => {
    expect(await stickyNotes.elements.edit.editButtonsAll.get(0).isDisplayed()).toBe(true);
  });
  it('verify if user is able to see cancel button while editing ', async () => {
    editRandomText = 'Sticky body Edit' + Helpers.randomString(3, 'numerals');
    await stickyNotes.elements.edit.editButtonsAll.get(0).click();
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.edit.editTextArea), 45000);
    await stickyNotes.elements.edit.editTextArea.clear();
    await stickyNotes.elements.edit.editTextArea.sendKeys(editRandomText);
    expect(await stickyNotes.elements.edit.editCancel.isDisplayed()).toBe(true);
  });
  it('Verify if the user is able to see Save button', async () => {
    expect(await stickyNotes.elements.edit.editSave.isDisplayed()).toBe(true);
  });
  it('Verify user is able to edit sticky note', async () => {
    await stickyNotes.elements.edit.editSave.click();
    expect(await stickyNotes.elements.stickyBodyAll.get(0).getText()).toBe(editRandomText);
  });
  it('Verify if user is able to see the edited sticky note is stored in the data base', async () => {
    result = await pgClient.query('select * from patientnote order by note_sid desc');
    value = result.rows[0].body;
    value = value.toString().trim();
    expect(value).toBe(editRandomText);
  });
});
describe('Validate if user is able to delete the sticky Note', async () => {
  afterAll(async () => {
    await pgClient.end();
    await loginPage.logout();
  });
  it('Verify if the user is able to see delete button', async () => {
    await stickyNotes.elements.edit.editButtonsAll.get(0).click();
    expect(await stickyNotes.elements.edit.deleteButton.isDisplayed()).toBe(true);
  });
  it('Verify if user is able to delete the sticky note', async () => {
    await stickyNotes.elements.edit.deleteButton.click();
    expect(await stickyNotes.elements.stickyBodyAll.get(0).getText()).not.toBe(editRandomText);
  });
  it('Verify if user is not able to see the sticky note  in the data base', async () => {
    result = await pgClient.query('select * from patientnote order by note_sid desc');
    value = result.rows[0].body;
    value = value.toString().trim();
    expect(value).not.toBe(editRandomText);
  });
});
