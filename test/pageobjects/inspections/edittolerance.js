import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import common from '../../utils/common.js';

class TolarenceEditInspection extends BasePage {

    async openCreateNewInspection(action) {
        const inspectionButton = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${action}"]`);
        await inspectionButton.click();
        logger.info(`Opened inspection action: ${action}`);
    }

    async checkInspectionentry(name) {
        const locator = `(//android.widget.TextView[@text="${name}"])`;

        try {
            const inspection = await common.waitUntilDisplayed(locator, 7000);
            await inspection.click();
            console.log(`Inspection entry clicked: ${name}`);
            return true;
        } catch (err) {
            console.log(`Inspection entry NOT found: ${name}`);
            return false;
        }
    }

    async clickonactions() {
        const action = await common.waitUntilDisplayed('//android.widget.TextView[@text=""]');
        await action.click();
        logger.info('Clicked on action');
    }

    async clickonActionType(action_name) {
        const actionItem = await common.waitUntilDisplayed(`//android.view.ViewGroup[@content-desc=", ${action_name}"]`);
        await actionItem.click();
        logger.info(`Clicked on ${action_name} button`);
    }

    async clickonEditInspection() {
        const editInspection = await common.waitUntilDisplayed('//android.view.ViewGroup[@resource-id="fab-content"]');
        await editInspection.click()
        logger.info('Clicked on Edit Inspection button');
    }

    async isCommentPresent() {
        const comments = await $$('//android.view.ViewGroup[contains(@content-desc,"comment entered")]');
        return comments.length > 0;
    }

    async clickonComment() {
        const comment = await common.waitUntilDisplayed('//android.view.ViewGroup[contains(@content-desc,"comment entered in the checklist")]');
        await comment.click();
        logger.info('Clicked on Comment');
    }

    async clicommnetAction() {
        const action = await common.waitUntilDisplayed('//android.widget.TextView[@text=""]');
        await action.click();
        logger.info('Clicked on Action')
    }

    async clickCommentActions(action_name) {
        const actionItem = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${action_name}"]/..`);
        await actionItem.click();
        logger.info(`Clicked on ActionItem:${action_name}`);
    }

    async deleteConfirmationmessage_and_action(actiom_name) {
        const msg = await common.waitUntilDisplayed('//android.widget.TextView[@resource-id="android:id/message"]');
        const text = await msg.getText();
        const confirm = await common.waitUntilDisplayed(`//android.widget.Button[@text="${actiom_name}"]`);
        console.log(text);
        if (text) {
            await confirm.click();
            logger.info(`clicked on :${actiom_name}`)
        }
    }

    async clickonUpdateInspection() {
        const update = await common.waitUntilDisplayed('//android.widget.TextView[@text="Update Inspection"]/..');
        await update.click();
        logger.info('Clicked on Update Inspection');
    }

    async clickOnfilters() {
        const filter = await common.waitUntilDisplayed('//android.widget.TextView[@text="󰘮"]');
        await filter.click();
        logger.info('Clicked on filter');
    }

    async clickOnUnsatisfactory() {
        const fail = await common.waitUntilDisplayed('(//android.widget.Button[@content-desc="Fail"])[1]', 4000);
        await fail.click();
        logger.info("Clicked on unsatisfactory");
    }

    async validateUnsatisfactoryWarning() {
        const msg = await common.waitUntilDisplayed('//android.view.View[@text=" Please add a remark or create a Work Order for all Unsatisfactory items"]');
        logger.info(`Validation message: ${await msg.getText()}`);
    }

    async clickOnOkButton() {
        const okBtn = await common.waitUntilDisplayed('//android.widget.Button[@content-desc="Ok"]');
        await okBtn.click();
        logger.info('Clicked on OK button');
    }

    async clickonchecklistAction() {
        const action = await common.waitUntilDisplayed('(//android.widget.TextView[@text=""])[1]');
        await action.click();
    }

    async clickonNewRemark() {
        const remark = await common.waitUntilDisplayed('//android.widget.TextView[@text="New Remark"]/..');
        await remark.click();
    }

    async enterDescription() {
        const enter_comment = await common.waitUntilDisplayed('//android.widget.EditText[@text="Please enter Description."]');
        await enter_comment.setValue('This is a comment entered in the checklist via mobile.');
    }

    async addAttachment() {
        const addAttachmentButton = await common.waitUntilDisplayed('//android.widget.TextView[@text="Add attachment"]/..');
        await addAttachmentButton.click();

        const galleryOption = await common.waitUntilDisplayed('~, Select From Gallery');
        await galleryOption.click();

        const latestPhoto = await common.waitUntilDisplayed('//android.view.View[contains(@content-desc,"Photo taken")]');
        await latestPhoto.click();

        const doneButton = await common.waitUntilDisplayed('//android.widget.TextView[@text="Done"]/..');
        await doneButton.click();
    }

    async click_on_addRemark() {
        await this.swipeUp();
        const addComment = await common.waitUntilDisplayed('//android.view.ViewGroup[@content-desc="Add remark"]/..');
        await addComment.click();
    }

    async sendEmailUpdate() {
        const emailUpdate = await common.waitUntilDisplayed('//android.widget.TextView[@text="Do you want to send an email once the inspection is updated?"]');
        const text = await emailUpdate.getText();
        console.log(text);
    }

    async clickOnUpdate() {
        const update = await common.waitUntilDisplayed('//android.widget.Button[@content-desc="Update"]');
        await update.click();
        logger.info('Clicked on Update Button');
    }

    // ===== MAIN FLOW =====
    async EditToleranceInspection() {
        await this.openCreateNewInspection('View Inspections');
        await browser.pause('5000');

        const inspection = await $('//android.widget.TextView[@text="Tolerance inspection"]');

        if (!(await inspection.isDisplayed())) {
            await this.swipe_till_element(inspection);
        }

        const entryFound = await this.checkInspectionentry('Tolerance Inspection');

        if (!entryFound) {
            logger.info('Inspection not found → Opening Filters');
            await this.clickOnfilters();
            await common.waitUntilDisplayed('//android.widget.TextView[@text="Clear All"]', 5000);
        } else {
            logger.info('Inspection found');
        }

        await browser.pause('3000');
        await this.clickonactions();
        await this.clickonActionType('Edit');
        await this.clickonEditInspection();
        await browser.pause('3000');

        if (await this.isCommentPresent()) {
            logger.info('Comment found → Deleting');
            await this.clickonComment();
            await this.clicommnetAction();
            await this.clickCommentActions('Delete Remark');
            await this.deleteConfirmationmessage_and_action('YES');
        } else {
            logger.info('No comment present Skipping delete step');
        }

        await browser.pause('6000');
        await this.clickonUpdateInspection();
        await browser.pause('6000');
        await this.validateUnsatisfactoryWarning();
        await this.clickOnOkButton();
        //await this.clickOnUnsatisfactory();
        await this.clickonchecklistAction();
        await this.clickonNewRemark();
        await this.enterDescription();
        await this.addAttachment();
        await browser.pause(5000);
        await this.click_on_addRemark()
        await browser.pause(5000);
        await this.clickonUpdateInspection();
        await this.sendEmailUpdate();
        await this.clickOnUpdate();
    }
}

export default new TolarenceEditInspection();
