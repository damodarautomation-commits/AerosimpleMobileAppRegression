import { NoiseLog } from '../../testdata/noiselog.json';
import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import Utils from '../../utils/common.js';
import {
    submoduleoptions,
    noiseentry,
    creatnew,
    edit,
    update
} from '../../locators/noiselog.js';

class SubmitEditNoiseLog extends BasePage {

    async clickonNoiseLogOptions(option) {
        try {
            const select = await Locators.getFirstLocator(
                submoduleoptions(option),
                10000
            );
            await Utils.safeClick(select);
            logger.info(`Clicked on submodule option: ${option}`);
        } catch (error) {
            logger.error(`clickonNoiseLogOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnNew() {
        try {
            const addButton = await Locators.getFirstLocator(
                creatnew(),
                10000
            );
            await Utils.safeClick(addButton);
            logger.info('Clicked on New (+) button successfully');
        } catch (error) {
            logger.error(`clickOnNew failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnEdit() {
        try {
            const editButton = await Locators.getFirstLocator(edit(), 10000);
            await editButton.waitForDisplayed({ timeout: 5000 });
            await Utils.safeClick(editButton);
            logger.info('clicked on Edit Button');
        } catch (error) {
            logger.error(`clickOnEdit failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnUpdate() {
        try {
            const updateButton = await Utils.swipeTillElement(update(), 5);
            await updateButton.waitForDisplayed({ timeout: 5000 });
            await Utils.safeClick(updateButton);
            logger.info('clicked on Update button')
        } catch (error) {
            logger.error(`clickOnUpdate failed: ${error.stack || error.message}`);
            throw error;
        }
    }


    async EditNoiseLogSubmission() {
        try {
            await this.clickonNoiseLogOptions(NoiseLog.SubModuleOption[0]);
            await this.waitForLoaderToDisappear({ timeout: 10000 });
            await browser.waitUntil(async () => {
                const entries = await $$(noiseentry());
                return entries.length > 0;
            }, {
                timeout: 30000,
                timeoutMsg: 'Noise log entries did not load in time'
            });

            const entries = await $$(noiseentry());

            if (entries.length > 0) {
                await entries[0].waitForDisplayed({ timeout: 10000 });
                await Utils.safeClick(entries[0]);
                await this.clickOnEdit();
                await browser.pause(5000);
                await this.clickOnUpdate();
                logger.info('Existing Noise log entry opened successfully');
            } else {
                logger.info('No Noise log entries available. Creating new entry.');
                await this.clickOnNew();
            }

        } catch (error) {
            logger.error(`EditNoiseLogSubmission failed: ${error.stack || error.message}`);
            throw error;
        }
    }
}

export default new SubmitEditNoiseLog();
