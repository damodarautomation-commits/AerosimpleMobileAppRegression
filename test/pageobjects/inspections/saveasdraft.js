import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';

class InspectionSaveasDraft extends BasePage {

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

    async click_on_save_button() {
        try {
            logger.info('Attempting to click Save Button');
            const save = await $('//android.widget.Button[@content-desc="Save"]');
            await save.waitForDisplayed({ timeout: 2000 });
            await save.click();
            logger.info('Successfully clicked Save button');
        }
        catch (err) {
            logger.error(`Failed in click_on_Save button: ${err.message}`);
            throw err;
        }
    }

    async clickonBack() {
        try {
            logger.info('Attempting to click on back');
            const back = await $('//android.widget.TextView[@text=""]');
            await back.waitForDisplayed({ timeout: 2000 });
            await back.click();
            logger.info('Successfully clicked back button');
        }
        catch (err) {
            logger.error(`Failed in click_on_Save button: ${err.message}`);
            throw err;
        }
    }

    async clickonOnCreateTab() {
        try {
            logger.info('Attempting to click on Inspection + tab');
            const createTab = await $('//android.view.ViewGroup[@resource-id="animated-fab-container"]/android.view.ViewGroup[2]');
            await createTab.waitForDisplayed({ timeout: 2000 });
            await createTab.click();
            logger.info('Successfully clicked Inspection + tab button');
        }
        catch (err) {
            logger.error(`Failed in click on Inspection + tab button: ${err.message}`);
            throw err;
        }

    }

    async clickonDraftInspection() {
        try {
            logger.info('Attempting to click on Inspection Draft');

            const draftinsp = await $('//android.view.ViewGroup[@content-desc="Aerosimple Inspection for Draft, Draft"]');

            await draftinsp.waitForDisplayed({ timeout: 2000 });

            const isDisplayed = await draftinsp.isDisplayed();

            if (isDisplayed) {
                await draftinsp.click();
                logger.info('Successfully clicked draft inspection');
            } else {
                logger.warn('Draft inspection is not visible');
            }

        } catch (err) {
            logger.error(`Failed to click drafted Inspection: ${err.message}`);
            throw err;
        }
    }

    async clickonselect() {
        try {
            logger.info('Attempted to click on select');
            const select = await $('//android.widget.TextView[@text="Select"]');
            await select.waitForDisplayed({ timeout: 2000 });
            await select.click()
        } catch (err) {
            logger.error(`Failed to click select on Drafted inspection: ${err.message}`);
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

    async clickonDiscard() {
        try {
            const discard = await $('//android.widget.TextView[@text="Discard"]');
            await discard.waitForDisplayed({ timeout: 2000 });
            await discard.click();
            logger.info("Clicked Discard button ");
        } catch (err) {
            logger.error(`Error in clicking on Discard button : ${err.message}`);
        }

    }

    async validateDiscardMessage() {
        try {
            logger.info("Validating discard confirmation message");
            const message = await $('//android.widget.TextView[@text="Do you really want to Discard this draft."]');
            await message.waitForDisplayed({ timeout: 3000 });
            const text = await message.getText();

            if (text === "Do you really want to Discard this draft.") {
                logger.info("Discard validation message is correct.");
            } else {
                throw new Error(`Unexpected message text: ${text}`);
            }

        } catch (err) {
            logger.error(`Discard message validation failed: ${err.message}`);
            throw err;
        }
    }

    async clickOnDiscardButton() {
        try {
            logger.info('Waiting for Discard button');

            const discardBtn = await $('//android.widget.Button[@content-desc="Discard"]');

            await discardBtn.waitForDisplayed({ timeout: 3000 });

            await discardBtn.click();

            logger.info('Clicked on Discard button successfully');

        } catch (err) {
            logger.error(`Failed to click Discard button: ${err.message}`);
            throw err;
        }
    }

    async clickOnInspectionModule() {
        const module = await $('//android.widget.TextView[@text="Inspections"]');
        await module.waitForDisplayed({ timeout: 3000 });
        await module.click();
    }


    async InspectionDraft() {

        await this.openCreateNewInspection('Create New Inspection');
        await this.waituntilLoaderToDisappear();

        // check draft safely
        const drafts = await $$('//android.view.ViewGroup[@content-desc="Aerosimple Inspection for Draft, Draft"]');

        if (drafts.length > 0) {
            logger.info("Draft already exists → Continuing inspection");

            await drafts[0].click();
            await this.clickonselect();
            await this.waituntilLoaderToDisappear();
            await this.click_on_start_inspection();
            await this.click_on_complete_inspection();
            await this.waituntilLoaderToDisappear();
            await this.click_on_complete_inspection();
            await browser.pause(5000);
            await this.waituntilLoaderToDisappear();

        } else {
            logger.info("No draft found → Creating new inspection");

            await this.click_on_inspection('Aerosimple Inspection for Draft');
            await this.waituntilLoaderToDisappear();
            await browser.pause(1000);
            await this.click_on_shift('Day');
            await this.click_on_start_inspection();
            await this.waituntilLoaderToDisappear();
            await this.click_on_save_button();
            await this.clickonBack();
            await this.clickonBack();
            await this.clickonBack();

            await this.waituntilLoaderToDisappear();
            await this.clickOnInspectionModule();
            await this.openCreateNewInspection('Create New Inspection');
            await this.waituntilLoaderToDisappear();
            await this.clickonDraftInspection();
            await this.clickonselect();
            await this.waituntilLoaderToDisappear();
            await this.click_on_start_inspection();
            await this.click_on_complete_inspection();
            await this.waituntilLoaderToDisappear();
            await this.click_on_complete_inspection();
            await browser.pause(5000);
            await this.waituntilLoaderToDisappear();
        }
    }
}

export default new InspectionSaveasDraft()