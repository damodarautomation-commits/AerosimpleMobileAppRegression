import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Utils from '../../utils/common.js';
import Locators from '../../utils/selfHealing.js';

class ToleranceInspection extends BasePage {

    /* ---------------- COMMON NAVIGATION ---------------- */

    async openCreateNewInspection(action) {
        const inspectionButton = await $(`//android.widget.TextView[@text="${action}"]`);
        await inspectionButton.waitForDisplayed({ timeout: 5000 });
        await inspectionButton.click();
        logger.info(`Opened inspection action: ${action}`);
    }

    async click_on_inspection(name) {
        const inspection = await $(`//android.widget.TextView[@text="${name}"]`);
        await inspection.waitForDisplayed({ timeout: 5000 });
        const movetoinspection = await Utils.swipeTillElement(inspection, 3);
        await inspection.click();
        logger.info(`Selected inspection: ${name}`);
    }

    async click_on_shift(shift_name) {
        const shiftDropdown = await $("//android.view.ViewGroup[contains(@content-desc,'')]");
        await shiftDropdown.waitForDisplayed({ timeout: 5000 });
        await shiftDropdown.click();

        // FIXED (was using resource-id wrongly)
        const selectShift = await $(`//android.widget.TextView[@text="${shift_name}"]`);
        await selectShift.waitForDisplayed({ timeout: 5000 });
        await selectShift.click();

        logger.info(`Shift selected: ${shift_name}`);
    }

    async click_on_start_inspection() {
        const startBtn = await $("//android.widget.Button[@resource-id='fab']");
        await startBtn.waitForDisplayed({ timeout: 5000 });
        await startBtn.click();
        logger.info("Clicked Start Inspection");
    }

    /* ---------------- VALUE ENTRY (DYNAMIC INDEX SAFE) ---------------- */

    async clickOnEnterValue(index, value) {
        try {
            // Always fetch fresh element to avoid stale UI refresh issue
            const locator = `(//android.widget.EditText)[${index}]`;
            const field = await $(locator);

            await field.waitForDisplayed({ timeout: 5000 });
            await field.click();

            await field.clearValue();
            await browser.pause(300); // UI stabilization
            await field.setValue(value.toString());
            await browser.hideKeyboard();

            logger.info(`Entered value ${value} in field ${index}`);

        } catch (err) {
            throw new Error(`Unable to enter value in field ${index}: ${err.message}`);
        }
    }

    /* ---------------- COMPLETE ACTION ---------------- */

    async click_on_complete_inspection() {
        try {
            const completeInspection = await $('//android.widget.TextView[@resource-id="fab-text"]/..');
            await completeInspection.waitForDisplayed({ timeout: 5000 });
            try {
                await browser.hideKeyboard();
            } catch (e) {
                await driver.back();
            }
            await completeInspection.click();
            logger.info("Clicked Complete Inspection button");
        } catch (err) {
            logger.error(`Error in complete inspection flow: ${err.message}`);
            throw err;
        }
    }


    /* ---------------- VALIDATION POPUP ---------------- */

    async validateUnsatisfactoryWarning() {
        const msg = await $('//android.view.View[@text=" Please make sure you have answered all of the inspection checklists."]');
        await msg.waitForDisplayed({ timeout: 5000 });

        const text = await msg.getText();
        logger.info(`Validation message: ${text}`);
    }

    async clickOnOkButton() {
        const okBtn = await $('//android.widget.Button[@content-desc="Ok"]');
        await okBtn.waitForDisplayed({ timeout: 5000 });
        await okBtn.waitForEnabled({ timeout: 3000 });
        await okBtn.click();

        logger.info("Clicked OK button on warning popup");
    }

    async clickonchecklistAction() {
        const action = await $('(//android.widget.TextView[@text=""])[1]');
        await action.waitForDisplayed({ timeout: 5000 });
        await action.waitForEnabled({ timeout: 3000 });
        await action.click();
        logger.info('Clicked action button')

    }

    async clickonNewRemark() {
        const remark = await $('//android.widget.TextView[@text="New Remark"]/..');
        await remark.waitForDisplayed({ timeout: 5000 });
        await remark.waitForEnabled({ timeout: 3000 });
        await remark.click();
        logger.info('Clicked new remark action button ')
    }

    async enterDescription() {
        const enter_comment = await $('//android.widget.EditText[@text="Please enter Description."]');
        await enter_comment.waitForDisplayed(({ timeout: 2000 }));
        await enter_comment.click();
        await enter_comment.clearValue();
        await enter_comment.setValue('This is a comment entered in the checklist via mobile.');
        logger.info('enter comment is entered');
    }

    async addAttachment() {
        try {
            logger.info(`Attempting to add attachment from Gallery`);
            const addAttachmentButton = await $('//android.widget.TextView[@text="Add attachment"]/..');
            await addAttachmentButton.waitForDisplayed({ timeout: 10000 });
            await addAttachmentButton.click();
            await addAttachmentButton.click();

            const galleryOption = await $('~, Select From Gallery');
            await galleryOption.waitForDisplayed({ timeout: 10000 });
            await galleryOption.click();

            const latestPhoto = await $('//android.view.View[contains(@content-desc,"Photo taken")]');
            await latestPhoto.waitForDisplayed({ timeout: 10000 });
            await latestPhoto.click();

            const doneButton = await $('//android.widget.TextView[@text="Done"]/..');
            await doneButton.waitForDisplayed({ timeout: 10000 });
            await doneButton.click();

            logger.info(`Successfully attached photo from Gallery`);
        } catch (err) {
            logger.error(`Error in addAttachmentFromGallery: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_location_on_map(xOffset = 0.5, yOffset = 0.5) {
        try {
            const mapView = await $('(//android.widget.TextView[@text="Location"]/..//android.view.ViewGroup)[10]');
            await mapView.waitForDisplayed({ timeout: 15000 });
            await mapView.click();

            const location = await mapView.getLocation();
            const size = await mapView.getSize();

            const x = Math.floor(location.x + size.width * xOffset);
            const y = Math.floor(location.y + size.height * yOffset);

            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 150 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.releaseActions();
            logger.info(`Tapped on map at (${x}, ${y})`);

            const mapMarker = await $('//android.view.ViewGroup[@content-desc=""]');
            await mapMarker.waitForDisplayed({ timeout: 1000 });
            await mapMarker.click();
            logger.info(`Successfully clicked on mapMarker`);

            const newX = Math.floor(location.x + size.width * 0.7);
            const newY = Math.floor(location.y + size.height * 0.7);

            await driver.performActions([{
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: newX, y: newY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 150 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
            await driver.releaseActions();
            logger.info(`Tapped again on map at (${newX}, ${newY})`);

            const doneButton = await $('//android.widget.TextView[@text="Done"]/..');
            await doneButton.waitForDisplayed({ timeout: 5000 });
            await doneButton.click();
            logger.info(`Successfully saved map selection`);

            logger.info(`click on add comment button successfully`);


        } catch (err) {
            logger.error(`Error in placeMarkerAndSave: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_addRemark() {
        await this.swipeUp();
        const addComment = await $('//android.view.ViewGroup[@content-desc="Add remark"]/..');
        await addComment.waitForDisplayed({ timeout: 1000 });
        await addComment.click();
        logger.info('clicked add remark button');
    }

    /* ---------------- MAIN TEST FLOW ---------------- */

    async toleranceInspectionSubmission() {
        try {
            logger.info("Starting Tolerance Inspection submission flow");

            await this.openCreateNewInspection('Create New Inspection');
            await this.waituntilLoaderToDisappear();

            await this.click_on_inspection('Tolerance Inspection');
            await this.waituntilLoaderToDisappear();

            await this.click_on_shift('Day');

            await this.click_on_start_inspection();
            await this.waituntilLoaderToDisappear();
            await this.click_on_complete_inspection();
            await this.validateUnsatisfactoryWarning();
            await this.clickOnOkButton();

            // ENTER OUT-OF-TOLERANCE VALUES
            await this.clickOnEnterValue(1, 4);
            await this.clickOnEnterValue(2, 20);

            await this.clickonchecklistAction();
            await this.clickonNewRemark();

            await this.enterDescription();
            await this.addAttachment();
            await this.click_location_on_map()
            await this.click_on_addRemark();

            await browser.pause(5000);
            await this.waituntilLoaderToDisappear();
            await this.click_on_complete_inspection();
            await this.waituntilLoaderToDisappear();
            await this.click_on_complete_inspection();

            logger.info("Tolerance inspection negative validation completed");

        } catch (err) {
            logger.error(`Failed in toleranceInspectionSubmission: ${err.message}`);
            throw err;
        }
    }
}

export default new ToleranceInspection();
