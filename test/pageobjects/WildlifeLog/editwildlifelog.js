import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import {
    selectwildlifemodules, wildlifeoptions, add, wildlifeentry, wildlifeLogDetails, wildlifeactionbutton, edit, activityreport, descriptionedit, update, incidentDateAndTime, reportedDate,
    currentMonthAndYear, Done, map, mapOption, save, fullmap, activityDropdown, activityOption, enterDescription
} from '../../locators/Wildlifelog.js';
import { wildLife } from '../../testdata/wildlifelog.json';
import Utils from '../../utils/common.js';
class SubmitEditWildLifeLog extends BasePage {
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

    async clickOnSubModule(option) {
        try {
            const subModule = await Locators.getFirstLocator(selectwildlifemodules(option), 10000);
            await Utils.safeClick(subModule);
            logger.info(`clicked on submodule is ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModule failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSubModuleOptions(option) {
        try {
            const subModuleoption = await Locators.getFirstLocator(wildlifeoptions(option), 10000);
            await Utils.safeClick(subModuleoption);
            logger.info(`clicked on submodule is ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModuleOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async getWildLifeLog() {
        try {
            const detail = await Locators.getFirstLocator(wildlifeLogDetails(), 10000);
            await detail.waitForDisplayed({ timeout: 5000 });
            const text = await detail.getText();
            console.log(text);
            logger.info(`Wildlife Log Details: ${text}`);
            return text;
        } catch (error) {
            logger.error(`getWildLifeLog failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnActionButton() {
        try {
            const wildaction = await Locators.getFirstLocator(wildlifeactionbutton());
            await Utils.safeClick(wildaction);
            logger.info('clicked on action button');
        } catch (error) {
            logger.error(`clickOnActionButton failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnActionButtonEdit() {
        try {
            const wildactionitem = await Locators.getFirstLocator(edit());
            await Utils.safeClick(wildactionitem);
            logger.info('clicked on action button edit');
        } catch (error) {
            logger.error(`clickOnActionButtonEdit failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async description() {
        try {
            const des = await Utils.swipeTillElement(descriptionedit(), 8);
            await Utils.enterInputText(des, wildLife.Description);
            logger.info('Entered input in description field');

        } catch (error) {
            logger.error(`Description edit failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnUpdate() {
        try {
            const updateButton = await Utils.swipeTillElement(update(), 5);
            await Utils.safeClick(updateButton);
            logger.info('Clicked on Update button');
        } catch (error) {
            logger.error(`clickOnUpdate failed: ${error.stack || error.message}`);
            throw error;
        }
    }


    async editwildlifeLogsubmission() {
        await this.clickOnSubModule(wildLife.wildLifeSubModules[0]);
        await this.clickOnSubModuleOptions(wildLife.WildLogOption[0]);
        await this.waitForLoaderToDisappear({ timeout: 6000 });

        const entryLocator = wildlifeentry()[0];
        await browser.waitUntil(async () => {
            const entries = await $$(entryLocator);
            return entries.length > 0;
        }, {
            timeout: 30000,
            timeoutMsg: 'Wildlife entries did not load in time'
        });

        const entries = await $$(entryLocator);

        if (entries.length > 0) {

            await entries[0].waitForDisplayed({ timeout: 10000 });
            await Utils.safeClick(entries[0]);

            const wildaction = await Locators.getFirstLocator(wildlifeactionbutton());
            await wildaction.waitForDisplayed({ timeout: 30000 });
            await this.waitForLoaderToDisappear({ timeout: 30000 });

            logger.info('Clicked on the first wildlife log entry.');

            await this.clickOnActionButton();
            await this.clickOnActionButtonEdit();

            const confirm = await Locators.getFirstLocator(activityreport(), 30000);
            await confirm.waitForDisplayed({ timeout: 10000 });

            await this.swipeUp();
            await this.description();
            await this.clickOnUpdate();

        } else {

            const addButton = await Locators.getFirstLocator(add(), 10000);
            await Utils.safeClick(addButton);

            logger.info('No wildlife log entries available. Clicking Add to create a new entry.');
        }
    }


}
export default new SubmitEditWildLifeLog();