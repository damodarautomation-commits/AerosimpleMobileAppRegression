import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';
import * as sms from '../../locators/sms.js';
import { SMS } from '../../testdata/sms.json';

class safetyHazardCorrectiveAction extends BasePage {

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

    async swipeToCorrectiveactiontab() {
        await Utils.swipeHorizontalInField(
            sms.horizontalswipe(),
            'left'
        );
    }

    async clickOncorrectiveAction() {
        const corrective = await Locators.getFirstLocator(sms.correctiveaction(), 10000);
        await Utils.safeClick(corrective);
    }

    async clickonnewcorrectiveaction() {
        const newCorrective = await Locators.getFirstLocator(sms.newcorrectiveaction(), 10000);
        await Utils.safeClick(newCorrective);
    }

    async entertitle() {
        const nametitle = await Locators.getFirstLocator(sms.title(), 10000);
        await Utils.enterInputText(nametitle, SMS.CorrectiveActionName);
    }

    async clickonRoleUser() {
        const roleuser = await Locators.getFirstLocator(sms.roleuser(), 10000);
        await Utils.safeClick(roleuser);
    }

    async assignToSystemAdmin() {
        const assigned = await Locators.getFirstLocator(sms.assignedto(), 15000);
        await Utils.safeClick(assigned);

        const done = await Locators.getFirstLocator(sms.done(), 15000);
        await Utils.safeClick(done);
    }

    async clickOnDueDate(day = "15") {
        const due = await Locators.getFirstLocator(sms.duedate(), 10000);
        await Utils.safeClick(due);

        const reportdate = await Locators.getFirstLocator(sms.reportedDate(), 10000);
        const current_text = await reportdate.getText();
        const dateElement = await Locators.getFirstLocator(sms.currentMonthAndYear(day, current_text), 10000);
        await Utils.safeClick(dateElement);
        await dateElement.waitForDisplayed({ timeout: 10000 });
        await Utils.safeClick(dateElement);
        const donebutton = await Locators.getFirstLocator(sms.done(), 10000);
        await Utils.safeClick(donebutton);
    }

    async selectRisk() {

        const matrix = await Locators.getFirstLocator(sms.riskmatrix(), 10000);
        await Utils.safeClick(matrix);
        const riskOption = await Locators.getFirstLocator(
            sms.selectRisk(SMS.Risk),
            15000
        );
        await Utils.safeClick(riskOption);
    }

    async enterComment() {
        const commentinput = await Locators.getFirstLocator(sms.comment(), 10000);
        await Utils.enterInputText(commentinput, "Corrective action created via automation.");
    }

    async clickOnsave() {
        const saveButton = await Utils.swipeTillElement(sms.save(), 10);
        await Utils.safeClick(saveButton);
    }

    async correctiveactions() {
        await this.clickOnSafetyHazard();
        await this.swipeToCorrectiveactiontab();
        await this.clickOncorrectiveAction();
        await this.clickonnewcorrectiveaction();
        await this.entertitle();
        await this.clickonRoleUser();
        await this.assignToSystemAdmin();
        await this.clickOnDueDate();
        await this.selectRisk();
        await this.enterComment();
        await this.clickOnsave();
        await browser.pause(5000);
    }
}

export default new safetyHazardCorrectiveAction();