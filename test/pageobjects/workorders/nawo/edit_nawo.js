import { NAWO } from '../../../testdata/nawo.json';
import BasePage from '../../../fixtures/base-page.js';
import { logger } from '../../../utils/executionLogger.js';
import Locators from '../../../utils/selfHealing.js';
import Utils from '../../../utils/common.js';
import * as nawo from '../../../locators/nawo.js';

class EditNAWO extends BasePage {

    async clickOnSubModuleOptions(option) {
        const subModuleoption = await Locators.getFirstLocator(
            nawo.submoduleoptions(option),
            10000
        );
        await Utils.safeClick(subModuleoption);
        logger.info(`Clicked on submodule: ${option}`);
    }

    async clickFirstEntryIfExists() {
        try {
            const entries = await $$(nawo.entries());

            if (entries.length > 0) {
                await Utils.safeClick(entries[0]);
                logger.info("Clicked on first available entry");
            } else {
                logger.info("No entries available to edit");
                throw new Error("No Work Orders found");
            }
        } catch (error) {
            logger.error(`clickFirstEntryIfExists failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickMaintenanceReview() {
        try {
            const ms = await Locators.getFirstLocator(
                nawo.maintenancereview(),
                10000
            );
            await Utils.safeClick(ms);
            logger.info("Clicked on Maintenance Review");
        } catch (error) {
            logger.error(`clickMaintenanceReview failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async editMaintenanceDescription() {
        try {
            await Utils.swipeTillElement(nawo.mrdes());

            const descriptionField = await $(nawo.mrdes());
            await descriptionField.clearValue();
            await descriptionField.setValue("Edited description for MS");

            logger.info("Updated Maintenance Review description");
        } catch (error) {
            logger.error(`editMaintenanceDescription failed: ${error.stack || error.message}`);
            throw error;
        }
    }

    async clickUpdateIfAvailable() {
        try {
            const updateBtn = await Locators.getFirstLocator(nawo.resolve(), 10000);

            if (await updateBtn.isDisplayed()) {
                await Utils.safeClick(updateBtn);
                logger.info("Clicked on Update button");
            }
        } catch (error) {
            logger.warn("Update button not available or not required");
        }
    }


    async editNonAirfieldWorkOrder() {
        try {
            // await this.clickOnSubModuleOptions(
            NAWO.SubModuleOptions[0]
            //);
            await browser.pause(5000);
            await this.waitForLoaderToDisappear({ timeout: 8000 });
            await browser.pause(5000);
            await this.clickFirstEntryIfExists();
            await browser.pause(5000);
            await this.clickMaintenanceReview();
            await this.editMaintenanceDescription();
            await this.clickUpdateIfAvailable();
            await browser.pause(5000);
            logger.info("Edit NAWO flow completed successfully");

        } catch (error) {
            logger.error(`editNonAirfieldWorkOrder failed: ${error.stack || error.message}`);
            throw error;
        }
    }
}

export default new EditNAWO();