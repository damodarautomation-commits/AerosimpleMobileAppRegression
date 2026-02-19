import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import Locators from '../../utils/selfHealing.js';
import {
    creatnew,
    selectwildlifemodules,
    submoduleoptions,
    filter,
    dateFilter,
    choseDateRange,
    updateButton
} from '../../locators/Fodlog.js';
import { FODLog } from '../../testdata/fod.json';
import Utils from '../../utils/common.js';
import Search_Module from '../module.page.js';

class FODLogFilters extends BasePage {

    async clickOnNew() {
        try {
            const addButton = await Locators.getFirstLocator(creatnew(), 10000);
            await addButton.waitForDisplayed({ timeout: 50000 });
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
            await subModule.waitForDisplayed({ timeout: 50000 });
            await Utils.safeClick(subModule);
            logger.info(`Clicked on submodule: ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModule failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSubModuleOptions(option) {
        try {
            const subModuleOption = await Locators.getFirstLocator(submoduleoptions(option), 10000);
            await subModuleOption.waitForDisplayed({ timeout: 50000 });
            await Utils.safeClick(subModuleOption);
            logger.info(`Clicked on submodule option: ${option}`);
        } catch (error) {
            logger.error(`clickOnSubModuleOptions failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnFilters() {
        try {
            await Utils.swipeTillElement(filter());

            const filterButton = await Locators.getFirstLocator(filter(), 10000);
            await filterButton.waitForDisplayed({ timeout: 50000 });
            await filterButton.waitForEnabled({ timeout: 50000 });

            await Utils.safeClick(filterButton);
            logger.info('Clicked on Filters button');
        } catch (error) {
            logger.error(`clickOnFilters failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnDateFilter() {
        try {
            const date = await Locators.getFirstLocator(dateFilter(), 10000);
            await date.waitForDisplayed({ timeout: 50000 });
            await Utils.safeClick(date);
            logger.info('Clicked on Date Filter');
        } catch (error) {
            logger.error(`clickOnDateFilter failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnSelectDateFilter(option) {
        try {
            const selectDateRangeFilter = await Locators.getFirstLocator(choseDateRange(option), 10000);
            await selectDateRangeFilter.waitForDisplayed({ timeout: 50000 });
            await Utils.safeClick(selectDateRangeFilter);
            logger.info(`Selected Date Range: ${option}`);
        } catch (error) {
            logger.error(`clickOnSelectDateFilter failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickOnFilterUpdate() {
        try {
            const filterUpdate = await Locators.getFirstLocator(updateButton(), 10000);
            await filterUpdate.waitForDisplayed({ timeout: 50000 });
            await Utils.safeClick(filterUpdate);
            logger.info('Clicked on Update button');
        } catch (error) {
            logger.error(`clickOnFilterUpdate failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async FODFiltersSubmission() {
        try {
            logger.info('Starting FOD Filters flow');
            await this.clickOnSubModuleOptions(FODLog.SubModuleOption[0]);
            await Search_Module.waitForLoaderToDisappear();
            await this.clickOnFilters();
            logger.info('FOD Filters flow completed successfully');
        } catch (error) {
            logger.error(`FODFiltersSubmission failed: ${error.stack || error.message}`);
            throw error;
        }
    }
}

export default new FODLogFilters();
