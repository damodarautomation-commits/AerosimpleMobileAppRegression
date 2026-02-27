import { SMS } from '../../testdata/sms.json';
import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';
import * as sms from '../../locators/sms.js';

class safetyHazard_stagecompletion extends BasePage {

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
    async clickOnStages() {
        const stages = await Locators.getFirstLocator(sms.stages(), 15000);
        await Utils.safeClick(stages);
    }

    async submitSystemDescription() {
        const systemDesc = await Locators.getFirstLocator(sms.systemDescription(), 15000);
        await Utils.safeClick(systemDesc);
    }

    async enterSystemDescriptionFields() {
        for (let i = 1; i <= 3; i++) {
            const field = await Locators.getFirstLocator(
                sms.describesystemfield(i),
                15000
            );
            await Utils.enterInputText(field, `Root Cause Description ${i}`);
        }
    }

    async enterReviewComment() {
        const reviewLocator = sms.reviewComment();
        const reviewField = await Utils.swipeTillElement(reviewLocator, 5);
        await reviewField.waitForDisplayed({ timeout: 15000 });
        await Utils.enterInputText(reviewField,
            "System description reviewed and submitted."
        );
    }

    async clickOnRoleUserDropdown() {
        const roleDropdown = await Utils.swipeTillElement(sms.roleuser(), 5);
        await roleDropdown.waitForDisplayed({ timeout: 15000 });
        await Utils.safeClick(roleDropdown);
    }

    async assignToSystemAdmin() {
        const assigned = await Locators.getFirstLocator(sms.assignedto(), 15000);
        await Utils.safeClick(assigned);

        const done = await Locators.getFirstLocator(sms.done(), 15000);
        await Utils.safeClick(done);
    }

    async clickOnsave() {
        const savebutton = await Locators.getFirstLocator(sms.save(), 15000);
        await Utils.safeClick(savebutton);
    }

    async submitRiskAssessment() {
        const riskAssessment = await Locators.getFirstLocator(sms.riskassessment(), 15000);
        await Utils.safeClick(riskAssessment);
    }

    async selectRiskAndSave() {
        const riskOption = await Locators.getFirstLocator(
            sms.selectRisk(SMS.Risk),
            15000
        );
        await Utils.safeClick(riskOption);

        const comment = await Locators.getFirstLocator(sms.comment(), 15000);
        await Utils.enterInputText(comment, "Risk assessed and documented.");

        const saveBtn = await Locators.getFirstLocator(sms.Save(), 15000);
        await Utils.safeClick(saveBtn);
    }

    async submitRiskAcceptance() {
        const riskAcceptance = await Locators.getFirstLocator(sms.riskacceptance(), 15000);
        await Utils.safeClick(riskAcceptance);
    }

    async selectMitigationAndSave() {
        const dropdown = await Locators.getFirstLocator(sms.selectoptiondropdown(), 15000);
        await Utils.safeClick(dropdown);
        const option = await driver.$(
            'android=new UiSelector().textContains("Without Mitigation")'
        );
        await option.waitForDisplayed({ timeout: 15000 });
        await option.click();

        const comment = await Locators.getFirstLocator(sms.comment(), 15000);
        await Utils.enterInputText(comment, "Risk accepted without mitigation.");

        const saveBtn = await Locators.getFirstLocator(sms.Save(), 15000);
        await Utils.safeClick(saveBtn);
    }

    async closeSafetyHazard() {
        const close = await Locators.getFirstLocator(sms.closehazard(), 15000);
        await Utils.safeClick(close);
    }

    async clickOnsubmit() {
        const submitButton = await Locators.getFirstLocator(sms.submit(), 15000);
        await Utils.safeClick(submitButton);
    }


    async stagecompletion() {

        await this.clickOnSafetyHazard();
        await this.clickOnStages();
        await this.submitSystemDescription();
        await this.enterSystemDescriptionFields();
        await this.enterReviewComment();
        await this.clickOnRoleUserDropdown()
        await this.assignToSystemAdmin();
        await this.clickOnsubmit();
        //await this.clickOnsave()
        await this.submitRiskAssessment();
        await this.submitRiskAssessment();
        await this.selectRiskAndSave();
        await this.submitRiskAcceptance();
        await this.selectMitigationAndSave();

        await this.closeSafetyHazard();
    }
}

export default new safetyHazard_stagecompletion();