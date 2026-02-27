import { SMS } from '../../testdata/sms.json';
import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';
import * as sms from '../../locators/sms.js';

class safetyHazard extends BasePage {

    async clickOnSafetyHazard() {
        const safetyhazard = await Locators.getFirstLocator(sms.reporthazard(), 10000);
        await Utils.safeClick(safetyhazard);
    }

    async clickOnApps() {
        const apps = await Locators.getFirstLocator(sms.apps(), 10000);
        await Utils.safeClick(apps);
    }

    async clickOnAnonymous() {
        const selectanonymous = await Locators.getFirstLocator(sms.anonymous(), 10000);
        await Utils.safeClick(selectanonymous);
    }


    async enterphonenumber() {

    }

    async clickOnReportSafetyHazard() {
        const reporthazard = await Locators.getFirstLocator(sms.reportSafetyHazard(), 10000);
        await Utils.safeClick(reporthazard);
    }

    async clickOnNext() {
        const nextButton = await Locators.getFirstLocator(sms.next(), 10000);
        await Utils.safeClick(nextButton);
    }

    async enterTitle() {
        await Utils.enterInputText(sms.title(), SMS.Title);
    }

    async selectCategory() {
        const categoryField = await Utils.swipeTillElement(sms.category(), 3);
        await Utils.safeClick(categoryField);

        const categoryOption = await Locators.getFirstLocator(
            sms.categoryoption(SMS.Category),
            10000
        );
        await Utils.safeClick(categoryOption);
    }

    async selectPriority() {
        const priorityField = await Utils.swipeTillElement(sms.priority(), 3);
        await Utils.safeClick(priorityField);

        const priorityOption = await Locators.getFirstLocator(
            sms.categoryoption(SMS.Priority),
            10000
        );
        await Utils.safeClick(priorityOption);
    }

    async enterDescription() {
        const descriptionField = await Utils.swipeTillElement(sms.description(), 3);
        await Utils.enterInputText(sms.description(), SMS.Description);
    }

    async clickOnSubmit() {
        const submitbutton = await Utils.swipeTillElement(sms.submit(), 3);
        await Utils.safeClick(submitbutton);
    }


    async clickonlocationcompleteMap() {

        const locationField = await Utils.swipeTillElement(sms.locationmap(), 3);
        await Utils.safeClick(locationField);

        const map = await Locators.getFirstLocator(sms.fullmap(), 15000);
        await map.waitForDisplayed({ timeout: 15000 });

        const polygonIcon = await Locators.getFirstLocator(sms.polygon(), 10000);
        await Utils.safeClick(polygonIcon);

        const { width, height } = await driver.getWindowSize();

        const point1 = { x: width * 0.30, y: height * 0.55 };
        const point2 = { x: width * 0.70, y: height * 0.55 };
        const point3 = { x: width * 0.50, y: height * 0.75 };

        await this.tapPoint(point1);
        await this.tapPoint(point2);
        await this.tapPoint(point3);

        await driver.releaseActions();

        const finish = await Locators.getFirstLocator(sms.savepolygon(), 10000);
        await Utils.safeClick(finish);

        const doneBtn = await Locators.getFirstLocator(sms.done(), 10000);
        await Utils.safeClick(doneBtn);
    }

    async tapPoint(point) {
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: Math.floor(point.x), y: Math.floor(point.y) },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    }

    async clickOnPhotos() {

        const photosField = await Utils.swipeTillElement(sms.photos(), 3);
        await Utils.safeClick(photosField);

        const gallery = await Locators.getFirstLocator(sms.attachmentfromgallery(), 10000);
        await Utils.safeClick(gallery);

        const photo = await Locators.getFirstLocator(sms.phototaken(), 15000);
        await Utils.safeClick(photo);

        const donebutton = await Locators.getFirstLocator(sms.done(), 10000);
        await Utils.safeClick(donebutton);
    }

    async createnewsubhazard() {

        logger.info("Creating New Safety Hazard");

        await this.clickOnSafetyHazard();
        await this.clickOnAnonymous();
        await this.clickOnReportSafetyHazard();
        await this.clickOnNext();

        await this.enterTitle();
        await this.selectCategory();
        await this.selectPriority();
        await this.enterDescription();

        await this.clickonlocationcompleteMap();
        await this.clickOnPhotos();

        await this.clickOnSubmit();
        await browser.pause(5000);
    }
}

export default new safetyHazard();