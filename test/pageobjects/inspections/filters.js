import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import common from '../../utils/common.js';

class InspectionFilters extends BasePage {

    async openCreateNewInspection(action) {
        try {
            const inspectionButton = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${action}"]`);
            await inspectionButton.click();
            logger.info(`Opened inspection action: ${action}`);
        } catch (err) {
            logger.error(`Failed to open inspection action "${action}": ${err.message}`);
            throw err;
        }
    }

    async click_on_inspection(name) {
        try {
            const inspection = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${name}"]/../..`);
            await inspection.click();
            logger.info(`Selected inspection: ${name}`);
        } catch (err) {
            logger.error(`Failed to select inspection "${name}": ${err.message}`);
            throw err;
        }
    }

    async clickonfilters() {
        try {
            const filterbutton = await common.waitUntilDisplayed('//android.widget.TextView[@text="󰘮"]');
            await filterbutton.click();
            logger.info('Clicked on filters');
        } catch (err) {
            logger.error(`Failed to click on filters: ${err.message}`);
            throw err;
        }
    }

    async clickOnDateField_and_selectDateRange(selected_daterange) {
        const dateField = await common.waitUntilDisplayed('//android.widget.TextView[@text="Date"]/following-sibling::android.widget.TextView/../..');
        await dateField.click();

        const range = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${selected_daterange}"]/../../..`);
        await range.click()

        const clickonDateClose = await common.waitUntilDisplayed('(//android.widget.TextView[@text="Date"])[2]/..');
        await clickonDateClose.click();
    }

    async clickonInspectionType_and_select_Inspection(inspection_name) {
        try {
            const type = await common.waitUntilDisplayed('(//android.widget.TextView[@text="Inspection Type"]/following-sibling::android.view.ViewGroup)[1]');
            await type.click();
            logger.info('Clicked on Inspection type');
            const inspection = await $(`//android.widget.TextView[@text="${inspection_name}"]/..`);
            await this.swipe_till_element(inspection);
            await inspection.click();
            logger.info(`Selected inspection type: ${inspection_name}`);

        } catch (err) {
            logger.error(
                `Failed to select inspection type "${inspection_name}": ${err.message}`
            );
            throw err;
        }
    }

    async clickonIssues_and_selectvalue(value) {
        try {
            const issueSelect = await common.waitUntilDisplayed('(//android.view.ViewGroup[@content-desc="Select, "])[1]');
            await issueSelect.click();

            const selectall = await common.waitUntilDisplayed(`//android.widget.TextView[@text="${value}"]/..`);
            await selectall.click();

        } catch (err) {
            logger.error(`Failed to select option  ${value} : ${err.message}`);
            throw err;
        }

    }

    async clickOnApply() {
        try {
            const apply = await common.waitUntilDisplayed('//android.widget.Button[@content-desc="Apply"]');
            await apply.click()
            logger.info('Clicked on Apply Button')

        }
        catch (err) {
            logger.error(`Failed to click on Apply Button : ${err.message}`);
            throw err;
        }
    }

    async filters() {
        try {
            await this.openCreateNewInspection('View Inspections');
            await common.waitUntilDisplayed('//android.view.ViewGroup[@content-desc=""]/android.widget.ImageView', 100000);
            await browser.pause(5000);
            await this.clickonfilters();

            await common.waitUntilDisplayed('//android.widget.TextView[@text="Clear All"]', 5000);
            await this.clickOnDateField_and_selectDateRange('This Month');

            await this.clickonInspectionType_and_select_Inspection('Supplementary Inspection');

            await driver.back();

            await this.clickonIssues_and_selectvalue('Select All');
            await driver.back();

            await this.clickOnApply();

            await browser.pause(5000);

            logger.info('Inspection filters applied successfully');
        } catch (err) {
            logger.error(`Inspection filters flow failed: ${err.message}`);
            throw err;
        }
    }
}

export default new InspectionFilters();
