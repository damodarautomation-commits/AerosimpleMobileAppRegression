import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';

class SubmitInspection extends BasePage {

    async openCreateNewInspection(action) {
        try {
            logger.info(`Attempting to open inspection action: ${action}`);

            const inspectionButton = await $(`//android.widget.TextView[@text="${action}"]`);
            await inspectionButton.waitForDisplayed({ timeout: 3000 });
            await inspectionButton.click();

            logger.info(`Successfully clicked inspection action: ${action}`);
        } catch (err) {
            logger.error(`Failed in openCreateNewInspection: ${err.message}`);
            throw err;
        }
    }

    async click_on_inspection(Inspection_name) {
        try {
            logger.info(`Attempting to select inspection: ${Inspection_name}`);

            const inspection = await $(`//android.widget.TextView[@text="${Inspection_name}"]`);
            await inspection.waitForDisplayed({ timeout: 3000 });
            await inspection.click();

            logger.info(`Successfully selected inspection: ${Inspection_name}`);
        } catch (err) {
            logger.error(`Failed in click_on_inspection: ${err.message}`);
            throw err;
        }
    }

    async click_on_shift(shift_name) {
        try {
            logger.info(`Attempting to select shift: ${shift_name}`);

            const shift = await $("//android.view.ViewGroup[contains(@content-desc,'')]");
            await shift.waitForDisplayed({ timeout: 3000 });
            await shift.click();

            const select_shift = await $(`//android.view.ViewGroup[@resource-id="${shift_name}"]`);
            await select_shift.waitForDisplayed({ timeout: 3000 });
            await select_shift.click();

            logger.info(`Successfully selected shift: ${shift_name}`);
        } catch (err) {
            logger.error(`Failed in click_on_shift: ${err.message}`);
            throw err;
        }
    }

    async click_on_start_inspection() {
        try {
            logger.info('Attempting to click Start Inspection button');

            const button_text = await $("//android.widget.TextView[@resource-id='fab-text']").getText();
            logger.info(`Button text found: ${button_text}`);
            expect(button_text).toEqual("Start Inspection");

            const startBtn = await $("//android.widget.Button[@resource-id='fab']");
            await startBtn.waitForDisplayed({ timeout: 5000 });
            await startBtn.click();

            logger.info('Successfully clicked Start Inspection button');
        } catch (err) {
            logger.error(`Failed in click_on_start_inspection: ${err.message}`);
            throw err;
        }
    }

    async clickAllChecklists() {

        const clicked = new Set();
        let newButtonsFound = true;

        while (newButtonsFound) {
            newButtonsFound = false;

            const passButtons = await $$("//android.widget.Button[@content-desc='Pass']");

            for (let i = 0; i < passButtons.length; i++) {
                try {
                    const btn = passButtons[i];
                    const id = await btn.elementId;

                    if (clicked.has(id)) continue;

                    await btn.waitForDisplayed({ timeout: 2000 });
                    await btn.click();
                    clicked.add(id);

                    logger.info(`Clicked Pass button ${i + 1}`);
                    await browser.pause(500);

                    newButtonsFound = true;
                } catch (innerErr) {
                    logger.warn(`Failed to click Pass button ${i + 1}: ${innerErr.message}`);
                }
            }

            if (newButtonsFound) {
                logger.info("Swiping up to find more Pass buttons...");
                await this.swipeUp();
                await browser.pause(1000);
            } else {
                logger.info("No new Pass buttons found. All completed ");
            }
        }


    }

    async click_on_unsatisfactory(targetText) {
        let found = false;

        while (!found) {
            try {
                const targetElement = await $(`//android.widget.TextView[@text="${targetText}"]`);

                if (await targetElement.isDisplayed()) {
                    logger.info(`Found checklist '${targetText}' `);
                    found = true;

                    const failBtn = await $(`//android.widget.TextView[@text="${targetText}"]/../../..//android.widget.Button[@content-desc="Fail"]`);
                    await failBtn.waitForDisplayed({ timeout: 2000 });
                    await failBtn.click();

                    logger.info(`Marked '${targetText}' as FAIL `);
                } else {
                    logger.info(`'${targetText}' not visible yet, swiping...`);
                    await this.swipeDown();
                    await browser.pause(1000);
                }
            } catch (err) {
                logger.warn(`Error while searching for '${targetText}': ${err.message}`);
                await this.swipeDown();
                await browser.pause(1000);
            }
        }
    }
    async clickandenterComment() {
        const checkaction = await $(`(//android.widget.TextView[@text="${targetText}"]/../../..//android.view.ViewGroup)[4]`);
        await checkaction.waitForDisplayed(({ timeout: 2000 }));
        await checkaction.click();
        logger.info('click on new checklistActionButton');

        // click on remark action button
        const newComment = await $('//android.view.ViewGroup[@content-desc=", New Remark"]');
        await newComment.waitForDisplayed(({ timeout: 2000 }));
        await newComment.click()
        logger.info('click on new remark')

        // enter comment on Description field
        const enter_comment = await $('//android.widget.EditText[@text="Please enter Description."]');
        await enter_comment.waitForDisplayed(({ timeout: 2000 }));
        await enter_comment.click();
        await enter_comment.clearValue();
        await enter_comment.setValue('This is a comment entered in the checklist via mobile.');
        await browser.hideKeyboard();
        logger.info('enter comment is entered')
    }

    async addAttachment() {
        try {
            logger.info(`Attempting to add attachment from Gallery`);
            const addAttachmentButton = await $('//android.widget.TextView[@text="Add attachment"]/..');
            await addAttachmentButton.waitForDisplayed({ timeout: 10000 });
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
    //.................................................................................................
    async click_location_on_map(xOffset = 0.5, yOffset = 0.5) {
        try {
            const mapView = await $('(//android.widget.TextView[@text="Location"]/..//android.view.ViewGroup)[4]');
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

            const addComment = await $('//android.view.ViewGroup[@content-desc="Add remark"]/..');
            await addComment.waitForDisplayed({ timeout: 1000 });
            await addComment.click();

            logger.info(`click on add comment button successfully`);


        } catch (err) {
            logger.error(`Error in placeMarkerAndSave: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_complete_inspection() {
        try {
            const completeInspection = await $('//android.widget.TextView[@resource-id="fab-text"]/..');
            await completeInspection.waitForDisplayed({ timeout: 2000 });
            await completeInspection.click();
            logger.info("Clicked Complete Inspection button ");
        } catch (err) {
            logger.error(`Error in complete inspection flow: ${err.message}`);
        }
    }

    async completeInspectionUnsatisfactory() {
        const answeallchecks = await $('//android.view.View[@text=" Please make sure you have answered all of the inspection checklists."]');
        const allChecks_confirmations_message = await answeallchecks.getText();
        logger.info(`Confirmation message: ${allChecks_confirmations_message}`);

        const okButton = await $('(//android.view.ViewGroup[@resource-id="button-container"])[1]');
        await okButton.waitForDisplayed({ timeout: 2000 });
        await okButton.click();
        logger.info("Clicked OK button ");
    }

    async verifyInspectionSubmittedMessage() {
        try {
            const successMsg = await $('//android.widget.TextView[@text="Your inspection was successfully submitted"]');

            await successMsg.waitForDisplayed({ timeout: 10000 });

            const isDisplayed = await successMsg.isDisplayed();

            if (isDisplayed) {
                logger.info("Inspection submission success message is displayed");
            } else {
                throw new Error("Success message not visible");
            }

        } catch (err) {
            logger.error(`Validation failed: ${err.message}`);
            throw err;
        }
    }


    //---------------------------------------------------------------------------------------------------------------
    async submitNewInspection() {
        try {
            logger.info('Starting new inspection submission flow');

            await this.openCreateNewInspection('Create New Inspection');
            await this.waituntilLoaderToDisappear();
            await this.click_on_inspection('AIRPORT SAFETY SELF-INSPECTION CHECKLIST');
            await this.waituntilLoaderToDisappear();
            await this.click_on_shift('Day');
            await this.click_on_start_inspection();
            await this.waituntilLoaderToDisappear();
            await this.clickAllChecklists();
            await this.click_on_complete_inspection();
            await this.waituntilLoaderToDisappear();
            await this.click_on_complete_inspection();
            await browser.pause(5000);
            //await this.verifyInspectionSubmittedMessage();

            logger.info('Inspection submission flow completed successfully');
        } catch (err) {
            logger.error(`Failed in submitNewInspection: ${err.message}`);
            throw err;
        }
    }
}

export default new SubmitInspection();
