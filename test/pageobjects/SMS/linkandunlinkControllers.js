import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';
import * as sms from '../../locators/sms.js';
import * as nawo from '../../locators/nawo.js'
import { SMS } from '../../testdata/sms.json';
import { NAWO } from '../../testdata/nawo.json';
class safetyHazardControlllers extends BasePage {

    async clickOnApps() {
        const apps = await Locators.getFirstLocator(sms.apps(), 10000);
        await Utils.safeClick(apps);
    }

    async clickOnSafetyHazard() {
        await driver.pause(5000);

        const hazardEntries = await driver.$$(sms.hazardentries());

        if (hazardEntries.length > 0) {
            await hazardEntries[0].waitForDisplayed({ timeout: 10000 });
            logger.info("Existing Safety Hazard found. Clicking it.");
            await Utils.safeClick(hazardEntries[0]);
        } else {
            logger.info("No entry found. Clicking Report Hazard.");
            const report = await Locators.getFirstLocator(sms.reporthazard(), 10000);
            await Utils.safeClick(report);
        }
    }

    async swipeToControllerstab() {
        await Utils.swipeHorizontalInField(sms.horizontalswipe(), 'left');
        await Utils.swipeHorizontalTillElement(
            sms.workordertab(),
            sms.horizontalswipe(),
            'left',
            4
        );
    }

    async clickOnControllers() {
        const cont = await Locators.getFirstLocator(sms.controllers(), 10000);
        await Utils.safeClick(cont);
    }

    async clickOnExistingControllers() {
        const control = await Locators.getFirstLocator(sms.existingcontrollers(), 10000);
        await Utils.safeClick(control);
    }

    async selectControler(option) {
        const selectcont = await Locators.getFirstLocator(sms.controller_name(option), 10000);
        await Utils.safeClick(selectcont)
    }

    async clickOnsave() {
        const saveButton = await Locators.getFirstLocator(sms.Save(), 10000);
        await Utils.safeClick(saveButton);
    }

    async hazardControllers() {
        await this.clickOnSafetyHazard();
        await this.swipeToControllerstab();
        await this.clickOnControllers();
        await this.clickOnExistingControllers();
        await this.selectControler(SMS.Controler1);
        await this.selectControler(SMS.Controler2);
        await this.clickOnsave();

    }

}

export default new safetyHazardControlllers();