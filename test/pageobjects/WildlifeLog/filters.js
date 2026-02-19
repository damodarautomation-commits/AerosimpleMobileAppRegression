import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import {
    creatnew, selectwildlifemodules, wildlifeoptions, add, wildlifeentry, wildlifeLogDetails, filter, dateFilter, choseDateRange, updateButton, wildlifeactionbutton, edit, activityreport, descriptionedit, update, incidentDateAndTime, reportedDate,
    currentMonthAndYear, Done, map, mapOption, save, fullmap, activityDropdown, activityOption, enterDescription
} from '../../locators/Wildlifelog.js';
import { wildLife } from '../../testdata/wildlifelog.json';
import Utils from '../../utils/common.js';
class wildLifeFilters extends BasePage {
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

    async clickOnFilters() {
        try {
            const filterButton = await Locators.getFirstLocator(filter(), 10000);
            await Utils.safeClick(filterButton);
            logger.info('clicked on Filters');
        } catch (error) {
            logger.error(`clickOnFilters failed: ${error.stack || error.message}`);
            throw error;
        }

    }

    async clickOnDateFilter() {
        try {
            const date = await Locators.getFirstLocator(dateFilter(), 10000);
            await Utils.safeClick(date);
            logger.info('clicked on Date Filter');
        } catch (error) {
            logger.error(`clickOnFilters failed: ${error.stack || error.message}`);
            throw error;
        }

    }

    async clickOnSelectDateFilter(option) {
        try {
            const selectdaterangefilter = await Locators.getFirstLocator(choseDateRange(option), 10000);
            await Utils.safeClick(selectdaterangefilter);
            logger.info('Clicked on dataRange');

        } catch (error) {
            logger.error(`clickOnSelectDateFilter failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnFilterUpdate() {
        try {
            const filterUpdate = await Locators.getFirstLocator(updateButton(), 10000);
            await Utils.safeClick(filterUpdate);
            logger.info('Clicked on Update Button')
        } catch (error) {
            logger.error(`clickOnFilterUpdate failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async wildLifeFiltersSubmission() {

        await this.clickOnSubModule(wildLife.wildLifeSubModules[0]);
        await this.clickOnSubModuleOptions(wildLife.WildLogOption[0]);
        await this.waitForLoaderToDisappear({ timeout: 6000 });
        await this.clickOnFilters();
        await this.clickOnDateFilter();
        await this.clickOnSelectDateFilter(wildLife.FilterRange);
        await this.clickOnFilterUpdate();

    }

}

export default new wildLifeFilters();