import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';

class inspection_comments_and_history extends BasePage {
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

    async enter_comment() {
        try {
            logger.info('Attempt to enter comment');

            const comment = await $('//android.widget.EditText[@text="Write a comment"]');
            await comment.waitForDisplayed({ timeout: 5000 });
            await comment.click();
            await comment.clearValue();
            await comment.setValue('This is a comment entered in the checklist via mobile.');
            logger.info('Comment entered successfully');
            try {
                await browser.hideKeyboard();
            } catch (e) {
                logger.info('Keyboard already hidden');
            }

            const submit = await $('//android.widget.TextView[@text="󰒊"]/..');
            await submit.waitForDisplayed({ timeout: 5000 });
            await submit.click();

        } catch (err) {
            logger.error(`Error while entering comment: ${err.message}`);
            throw err;
        }
    }

    async clickBack() {
        try {
            logger.info('Attempting to navigate back');
            const back = await $('//android.widget.TextView[@text=""]');
            await back.waitForDisplayed({ timeout: 10000 });
            await back.click();
            logger.info('Successfully navigated back');
        } catch (err) {
            logger.error(`Failed to navigate back: ${err.message}`);
            throw err;
        }
    }





    //-------------------------------------------------------------------------------

    async comments_and_history() {
        try {
            logger.info('Starting inspection edit submission flow');
            await this.inspection_action_items('View Inspections');
            await this.waituntilLoaderToDisappear();
            await this.click_inspection_entry();
            await this.waituntilLoaderToDisappear();
            await this.click_on_inspection_actions();
            await browser.pause(5000);
            await this.click_on_inspection_actionItems('Comments');
            await this.waituntilLoaderToDisappear();
            await this.enter_comment();
            await this.clickBack();
            await browser.pause(5000);

            await this.click_on_inspection_actions();
            await browser.pause(5000);
            await this.click_on_inspection_actionItems('History');
            //await this.swipeUp()
            await this.waituntilLoaderToDisappear();
            await this.click_on_inspection_actions();


            //await this.clickBack();

            await browser.pause(5000);

            await this.click_on_inspection_actions();
            await browser.pause(5000);
            await this.click_on_inspection_actionItems('Print');
            await this.waituntilLoaderToDisappear();

            logger.info('Inspection edit submission flow completed successfully');

        }
        catch (err) {
            logger.error(`Failed in edit Inspection submission: ${err.message}`);
            throw err;
        }
    }

}
export default new inspection_comments_and_history();