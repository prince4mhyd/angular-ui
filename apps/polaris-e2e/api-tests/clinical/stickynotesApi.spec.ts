import { } from 'jasmine';
import { LoginPage, StickyNotePage } from '../../src/pages';
import { Helpers } from '../../src/utils/Helpers';
import { browser, ExpectedConditions } from 'protractor';
import { DbParams } from '../../config/params/db';


let editRandomText;
let value;
let randomText;
let response;


const stickyNotes = new StickyNotePage();
const loginPage = new LoginPage();
describe('Verify if the user is able to add a new sticky note', async () => {
  it('Validate if user is able to Login to polaris', async () => {
    await loginPage.login();
    expect(await stickyNotes.elements.patientHeader.getText()).toBe(browser.params.paramsGlobal.get(stickyNotes.constants.headers.label));
  });
  it('Verify if user is able to see Sticky Notes label', async () => {
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.selectPatient), 20000);
    await stickyNotes.elements.selectPatient.click();
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.patientsAll.get(0)), 20000);
    await stickyNotes.elements.patientsAll.get(0).click();
    expect(await stickyNotes.elements.stickyHeader.getText()).toBe(browser.params.paramsGlobal.get(stickyNotes.constants.headers.text));
  });
  it('Verify if user is able to see + icon', async () => {
    expect(await stickyNotes.elements.add.plusButton.isDisplayed()).toBe(true);
  });
  it('Verify if the user is able to see cancel button', async () => {
    randomText = browser.params.paramsGlobal.get(stickyNotes.constants.headers.add) + Helpers.randomString(3, 'numerals');
    await stickyNotes.elements.add.plusButton.click();
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.add.addTextArea), 45000);
    await stickyNotes.elements.add.addTextArea.clear();
    await stickyNotes.elements.add.addTextArea.sendKeys(randomText);
    expect(await stickyNotes.elements.add.cancelButton.isDisplayed()).toBe(true);
  });
  it('Verify if the user is able to see Save button', async () => {
    expect(await stickyNotes.elements.add.saveButton.isDisplayed()).toBe(true);
  });
  it('Verify user is able to add a sticky note', async () => {
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.add.saveButton), 45000);
    await stickyNotes.elements.add.saveButton.click();
    await browser.wait(ExpectedConditions.invisibilityOf(stickyNotes.elements.add.addTextArea), 45000);
    await browser.wait(ExpectedConditions.elementToBeClickable(stickyNotes.elements.stickyBodyAll.get(0)), 20000);
    expect(await stickyNotes.elements.stickyBodyAll.get(0).getText()).toBe(randomText);
  });
  it('verify the stored sticky note via webservices', async () => {
    // the below lines of code is just workaround until the https issue is fixed in swagger
    // require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    response = require('superagent');
    response = await response.get('https://localhost:1405/patients/98/sticky-notes');
    value = response.body[0].body;
    expect(value).toBe(randomText);
  });
});

