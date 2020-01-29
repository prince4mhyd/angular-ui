import { element, by, browser, ExpectedConditions, ElementArrayFinder} from 'protractor';
import { UiParams } from '../../config/params';
const params = new UiParams();

export  class LoginPage {
    public elements = {
        id:  element(by.id('usernameField')),
        password: element(by.id('legacyPassword')),
        siteid: element(by.id('IDField')),
        loginButton: element(by.className('loginButton')),
        practiceID: element(by.className('at-practiceId')),
        practiceNamesAll: element.all(by.css('.practiceList span')),
        logoutButton: element(by.className('logout-text')),
    };
    public async login() {
        await browser.waitForAngularEnabled(false);
        await browser.get(params.parameters.url);
        await browser.wait(ExpectedConditions.visibilityOf(this.elements.id), 50000);
        await this.elements.id.clear();
        await this.elements.id.sendKeys('lk');
        await this.elements.password.clear();
        await this.elements.password.sendKeys('demo');
        await this.elements.siteid.sendKeys('demo-qaautopol1');
        await this.elements.loginButton.click();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.elements.practiceNamesAll.get(0)), 45000);
        await this.elements.practiceNamesAll.get(0).click();
        await browser.waitForAngularEnabled(true);
    }
    public async logout() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.elements.logoutButton), 250000);
        await this.elements.logoutButton.click();
    }
}

