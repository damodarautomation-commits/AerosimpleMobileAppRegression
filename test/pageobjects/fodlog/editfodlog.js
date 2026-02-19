import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import { submoduleoptions, fodentry, creatnew, edit, NextStop, editconform, editcategory, categoryOption, update } from '../../locators/Fodlog.js';
import { FODLog } from '../../testdata/fod.json';
import Utils from '../../utils/common.js';

class EditFODlog extends BasePage {

    async clickOnNew() {
        try {
            const addButton = await Locators.getFirstLocator(creatnew(), 10000);
            await Utils.safeClick(addButton);
            logger.info('Clicked on New (+) button successfully');
        } catch (error) {
            logger.error(`clickOnNew failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSubModuleOptions(option) {
        try {
            const subModuleoption = await Locators.getFirstLocator(submoduleoptions(option), 10000);
            await Utils.safeClick(subModuleoption);
            logger.info(`Clicked on submodule: ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModuleOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnEdit() {
        try {
            const editButton = await Locators.getFirstLocator(edit(), 10000);
            await Utils.safeClick(editButton);
            logger.info('Clicked on Edit');
        } catch (error) {
            logger.error(`clickOnEdit failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnCategory(option) {
        try {
            const categorydropdown = await Locators.getFirstLocator(editcategory(), 10000);
            await Utils.safeClick(categorydropdown);
            logger.info('Click on category dropdown');

            const categoryoption = await Locators.getFirstLocator(categoryOption(option), 10000);
            await Utils.safeClick(categoryoption)
        } catch (error) {
            logger.error(`clickOnCategory failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnUpdate() {
        try {
            const submiteButton = await Utils.swipeTillElement(update(), 5);
            await Utils.safeClick(submiteButton);
            logger.info('Clicked on Submit button');
        } catch (error) {
            logger.error(`clickOnSubmit failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async EditFODLogSubmission() {
        await this.clickOnSubModuleOptions(FODLog.SubModuleOption[0]);
        const entryLocator = fodentry()[0];
        await browser.waitUntil(async () => {
            const elements = await $$(entryLocator);
            return elements.length > 0;
        }, {
            timeout: 30000,
            timeoutMsg: 'FOD entries did not load in time'
        });

        const entries = await $$(entryLocator);

        if (entries.length > 0) {

            await entries[0].waitForDisplayed({ timeout: 10000 });
            await Utils.safeClick(entries[0]);
            logger.info('Clicked on existing FOD entry');
            await this.clickOnEdit();
            const confirmtext = await Locators.getFirstLocator(editconform(), 30000);
            const nextbutton = await Utils.swipeTillElement(NextStop(), 5);
            await Utils.safeClick(nextbutton);
            await this.clickOnCategory(FODLog.EditCategory);
            await this.clickOnUpdate();


        } else {

            const addButton = await Locators.getFirstLocator(creatnew(), 10000);
            await Utils.safeClick(addButton);

            logger.info('No FOD log entries available. Clicking Add to create new entry.');
        }
    }

}

export default new EditFODlog();
