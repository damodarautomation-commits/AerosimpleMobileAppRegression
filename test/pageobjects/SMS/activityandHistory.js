import { SMS } from '../../testdata/sms.json';
import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';
import * as sms from '../../locators/sms.js';

class safetyHazard_activityandHistory extends BasePage {

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

    async clickOnActivity() {

        const activityTab = await Locators.getFirstLocator(sms.activity(), 10000);

        await activityTab.waitForDisplayed({ timeout: 10000 });
        await activityTab.click();
        const commentsSection = await $(sms.comments());
        await commentsSection.waitForDisplayed({ timeout: 15000 });
    }
    async clickOnComments() {
        const commentsTab = await Locators.getFirstLocator(sms.comments(), 10000);
        await commentsTab.waitForDisplayed({ timeout: 10000 })
        await Utils.safeClick(commentsTab);
    }

    async clickOnAddComment() {
        const addCommentBtn = await Locators.getFirstLocator(sms.addComment(), 10000);
        await addCommentBtn.waitForDisplayed({ timeout: 10000 })
        await Utils.safeClick(addCommentBtn);
    }

    async enterComment() {
        await Utils.enterInputText(sms.entercomment(), SMS.Comment);
    }

    async attachFileFromGallery() {

        const attachBtn = await Locators.getFirstLocator(sms.attachfile(), 10000);
        await Utils.safeClick(attachBtn);

        const gallery = await Locators.getFirstLocator(sms.attachmentfromgallery(), 10000);
        await Utils.safeClick(gallery);

        const photo = await Locators.getFirstLocator(sms.phototaken(), 15000);
        await Utils.safeClick(photo);

        const doneBtn = await Locators.getFirstLocator(sms.done(), 10000);
        await Utils.safeClick(doneBtn);
    }

    async selectCategoryAndSave() {

        const categoryDropdown = await Locators.getFirstLocator(sms.selectCategory(), 10000);
        await Utils.safeClick(categoryDropdown);

        const category = await Locators.getFirstLocator(sms.chosecategory(), 10000);
        await Utils.safeClick(category);

        const saveBtn = await Locators.getFirstLocator(sms.save(), 10000);
        await Utils.safeClick(saveBtn);
    }

    async clickBackAndHistory() {

        const backBtn = await Locators.getFirstLocator(sms.back(), 60000);
        await Utils.safeClick(backBtn);

        const historyTab = await Locators.getFirstLocator(sms.History(), 15000);
        await Utils.safeClick(historyTab);
    }

    async smsactivityandhistory() {

        await this.clickOnSafetyHazard();

        await this.clickOnActivity();
        await this.clickOnComments();
        await this.clickOnAddComment();

        await this.enterComment();
        await this.attachFileFromGallery();
        await this.selectCategoryAndSave();
        await this.clickBackAndHistory();
        await browser.pause(5000);
    }
}

export default new safetyHazard_activityandHistory();