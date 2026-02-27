import { SMS } from '../../testdata/sms.json';
import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';
import * as sms from '../../locators/sms.js';

class safetyHazard_relatedhazard extends BasePage {

    async clickOnApps() {
        const apps = await Locators.getFirstLocator(sms.apps(), 10000);
        await Utils.safeClick(apps);
    }

    async clickOnSafetyHazard() {
        try {
            await driver.pause(3000);

            const hazardEntries = await driver.$$(sms.hazardentries());

            if (hazardEntries.length > 0) {
                await hazardEntries[0].waitForDisplayed({ timeout: 10000 });
                logger.info("Existing Safety Hazard entry found. Clicking on it.");
                await Utils.safeClick(hazardEntries[0]);
            } else {
                logger.info("No existing entry found. Clicking on Report Hazard.");
                const safetyhazard = await Locators.getFirstLocator(sms.reporthazard(), 10000);
                await Utils.safeClick(safetyhazard);
            }

        } catch (error) {
            logger.error("Error while clicking Safety Hazard: " + error);
            throw error;
        }
    }

    async relatedhazard() {
        try {

            const related = await Locators.getFirstLocator(sms.relatedHazard(), 10000);
            await Utils.safeClick(related);
            logger.info("Clicked on Related Hazards.");

            const addRelated = await Locators.getFirstLocator(sms.addrelatedhazard(), 10000);
            await Utils.safeClick(addRelated);
            logger.info("Clicked on Add Related Hazard.");

            const hazards = await driver.$$(sms.listofhazards());
            if (hazards.length > 0) {
                await hazards[0].waitForDisplayed({ timeout: 10000 });
                await Utils.safeClick(hazards[0]);
                logger.info("Selected the first related hazard.");
            } else {
                logger.info("No related hazards available. Skipping selection.");
            }
        } catch (error) {
            logger.error("Error in Related Hazard flow: " + error);
            throw error;
        }
    }

}

export default new safetyHazard_relatedhazard();