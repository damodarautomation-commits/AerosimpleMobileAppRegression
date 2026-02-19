import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';

class EditInspection extends BasePage {
    async inspection_action_items(action) {
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

    async click_inspection_entry() {
        try {
            const inspection_entry = await $('(//android.view.ViewGroup[contains(@content-desc,"Airport safety self-inspection checklist") and contains(@content-desc,"Completed")])[1]');

            const isExisting = await inspection_entry.isExisting();

            if (isExisting) {
                await inspection_entry.waitForDisplayed({ timeout: 5000 });
                await inspection_entry.click();
                logger.info("Inspection entry clicked successfully");
            } else {
                logger.info("No inspection entries available in the list page");
            }

        } catch (err) {
            logger.error(`Error while clicking inspection entry: ${err.message}`);
            throw err;
        }
    }

    async click_on_inspection_actions() {
        try {
            logger.info(" attampting to click on Inspection action button");
            const inspact = await $('//android.widget.TextView[@text=""]');
            await inspact.waitForDisplayed({ timeout: 2000 });
            await inspact.click();
            logger.info("Inspection action clicked successfully");

        }
        catch (err) {
            logger.error(`Error while clicking inspection action: ${err.message}`);
            throw err;

        }


    }

    async click_on_inspection_actionItems(action) {
        try {
            logger.info(`attempted to click on inspection ${action} buttton`);
            const actionItem = await $(`//android.widget.TextView[@text="${action}"]/..`);
            await actionItem.waitForDisplayed({ timeout: 2000 });
            await actionItem.click();
            logger.info(`clicked on inspection ${action} buttton successfully`);

        }
        catch (err) {
            logger.error(`Error while clicking inspection ${action}: ${err.message}`);
            throw err;

        }
    }

    async click_on_edit_inspection() {
        try {
            logger.info('attempted to click on edit inspection button');
            const edit_inspection = await $('//android.widget.Button[@resource-id="fab" and @content-desc="Edit Inspection"]');
            await edit_inspection.waitForDisplayed({ timeout: 2000 });
            await edit_inspection.click();
            logger.info('clicked on edit inspection button successfully');

        }
        catch (err) {
            logger.error(`Error while clicking edit inspection button: ${err.message}`)
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
                    await failBtn.waitForDisplayed({ timeout: 10000 });
                    await failBtn.click();

                    logger.info(`Marked '${targetText}' as FAIL `);
                } else {
                    logger.info(`'${targetText}' not visible yet, swiping...`);
                    await this.swipeUp();
                    await browser.pause(1000);
                }
            } catch (err) {
                logger.warn(`Error while searching for '${targetText}': ${err.message}`);
                await this.swipeUp();
                await browser.pause(1000);
            }
        }
    }

    async clickandenterComment(targetText) {
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
        logger.info('enter comment is entered')
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
    }

    async click_on_Attach_NOTAM() {
        try {
            logger.info(' attampting to click on attach notam ');
            const notam = await $('//android.view.ViewGroup[@content-desc="󰈙, Attach NOTAMS"]');
            await notam.waitForDisplayed({ timeout: 70000 });
            await notam.click();
            logger.info('clicked on attach notam button');

            const firstNotam = await $('(//android.view.ViewGroup[starts-with(@content-desc,"ID :")])[1]');
            await firstNotam.waitForDisplayed({ timeout: 10000 });
            await firstNotam.click();
            logger.info('selected first notam in the notam list');

            const Done = await $('//android.widget.TextView[@text="Done"]');
            await Done.waitForDisplayed({ timeout: 1000 });
            await Done.click();
            logger.info('click on Done button');
            logger.info("First NOTAM clicked successfully");

        } catch (err) {
            logger.error(`Failed to click first NOTAM: ${err.message}`);
            throw err;
        }
    }

    async click_on_updateInspection() {
        try {
            logger.info('attempt to click on update inspection button')
            const update = await $('//android.widget.TextView[@resource-id="fab-text"]/..');
            await update.waitForDisplayed({ timeout: 2000 });
            await update.click();
            logger.info('clicked on update button');

        }
        catch (err) {
            logger.info(`Failed to click on update inspection buttton: ${err.message}`);
            throw err;
        }


    }

    async click_on_update() {
        try {
            logger.info('attempt to click on update button');
            const update = await $('//android.widget.Button[@content-desc="Update"]');
            await update.waitForDisplayed({ timeout: 2000 });
            await update.click();
            logger.info('clicked on update button');
        }
        catch (err) {
            logger.info(`Failed to click on update buttton: ${err.message}`);
            throw err;
        }
    }


    //-------------------------------------------------------------------------------

    async edit_inspection_submission() {
        try {
            logger.info('Starting inspection edit submission flow');
            await this.inspection_action_items('View Inspections');
            await this.waituntilLoaderToDisappear();
            await this.click_inspection_entry();
            await this.waituntilLoaderToDisappear();
            await this.click_on_inspection_actions();
            await browser.pause(5000);
            await this.click_on_inspection_actionItems('Edit');
            await this.waituntilLoaderToDisappear();
            await this.click_on_edit_inspection();
            await browser.pause(5000);
            await this.click_on_unsatisfactory('Wind indicators');
            await this.clickandenterComment('Wind indicators');
            await this.click_location_on_map();
            await browser.pause(8000);
            await this.addAttachment();
            await browser.pause(5000);
            await this.click_on_addRemark();
            await browser.pause(5000);
            await this.click_on_unsatisfactory('Wind indicators');
            await this.click_on_Attach_NOTAM();
            await browser.pause(8000);
            await this.click_on_updateInspection();
            //await browser.pause(8000);
           // await this.click_on_update();
            //await browser.pause(5000);
            logger.info('Inspection edit submission flow completed successfully');

        }
        catch (err) {
            logger.error(`Failed in edit Inspection submission: ${err.message}`);
            throw err;
        }
    }

}
export default new EditInspection();