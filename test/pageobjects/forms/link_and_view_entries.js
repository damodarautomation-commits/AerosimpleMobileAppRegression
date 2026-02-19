import BasePage from "../../fixtures/base-page";
import { logger } from '../../utils/executionLogger.js';

class link_and_view extends BasePage {
    async click_on_new() {
        try {
            logger.info('Attempting to click on button +');
            const addBtn = await $('//android.view.ViewGroup[@resource-id="animated-fab-container"]');
            await addBtn.waitForDisplayed({ timeout: 10000 });
            await addBtn.click();
            logger.info('Successfully clicked on button +');
        } catch (err) {
            logger.error(`Error in click_on_new: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_form(form_name) {
        try {
            logger.info(`Attempting to click on form: ${form_name}`);
            let form = await $(`~${form_name}`);
            if (!(await form.isExisting())) {
                logger.warn(`Form not found by accessibility id, trying XPath...`);
                form = await $(`//android.view.ViewGroup[contains(@content-desc, "${form_name}")]`);
            }
            await form.waitForDisplayed({ timeout: 10000 });
            await form.click();
            logger.info(`Successfully clicked on form: ${form_name}`);
        } catch (err) {
            logger.error(`Error in click_on_form: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_formOptions(option) {
        try {
            logger.info(`Attempting to click on form option: ${option}`);
            let opt = await $(`~${option}`);
            if (!(await opt.isExisting())) {
                logger.warn(`Option not found by accessibility id, trying XPath...`);
                opt = await $(`//android.widget.TextView[@text="${option}"]`);
            }
            await opt.waitForDisplayed({ timeout: 10000 });
            await opt.click();
            logger.info(`Successfully clicked on form option: ${option}`);
        } catch (err) {
            logger.error(`Error in click_on_formOptions: ${err.stack || err.message}`);
            throw err;
        }
    }

    async gotofilters_and_select_dateRange(filter_range) {
        try {
            logger.info("Attempting to open filters");
            const filter_icon = await $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[3]');
            await filter_icon.click();
            await browser.pause(2000);
            logger.info("Clicking default filter 'Yesterday - Today'");
            const filter = await $("//android.widget.TextView[normalize-space(@text)='Yesterday - Today']");
            await filter.waitForDisplayed({ timeout: 5000 });
            await filter.click();

            logger.info(`Selecting custom filter range: ${filter_range}`);
            const select_filter = await $(`//android.widget.TextView[@text="${filter_range}"]`);
            await select_filter.waitForDisplayed({ timeout: 5000 });
            await select_filter.click();

            logger.info("Clicking on Update button");
            const click_on_update = await $('//android.widget.TextView[@text="Update"]');
            await click_on_update.waitForDisplayed({ timeout: 5000 });
            await click_on_update.click();

            logger.info("Waiting for entries to be displayed");
            const entries = await $$('//android.view.ViewGroup[contains(@content-desc, "Aerosimple Mobile")]');
            if (entries.length > 0) {
                await entries[0].waitForDisplayed({ timeout: 5000 });
                logger.info("Entries are visible");
            } else {
                logger.warn("No entries found after applying filter");
            }
            await browser.pause(500);
        } catch (err) {
            logger.error(`Error in gotofilters_and_select_dateRange: ${err.stack || err.message}`);
            throw err;
        }
    }

    async view_form_and_create_from() {
        const entries = await $$('//android.view.ViewGroup[contains(@content-desc, "Aerosimple Mobile")]');
        if (entries.length > 0) {
            await entries[0].waitForDisplayed({ timeout: 5000 });
            logger.info("Entries are visible");
            await entries[0].click();
            logger.info('clicked on form entry');
        } else {
            console.log('No form entries so need to create new form ');
            logger.info('Form entries are empty and need to create new form');

        }
    }

    async click_on_actions() {
        try {
            await browser.pause(2000);
            const actions = await $('//android.widget.TextView[@text=""]');
            await actions.waitForDisplayed({ timeout: 5000 });
            await actions.waitForEnabled({ timeout: 10000 });
            await actions.click();

        }
        catch (err) {
            logger.error(`Error in edit_form_submission: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_action_item(actionName) {
        try {
            logger.info(`Attempting to click action item: ${actionName}`);

            const actionItem = await $(
                `//android.widget.TextView[@text="${actionName}"]/parent::android.view.ViewGroup`
            );

            await actionItem.waitForDisplayed({ timeout: 10000 });
            await actionItem.waitForEnabled({ timeout: 10000 });
            await actionItem.click();

            logger.info(`Successfully clicked action item: ${actionName}`);
        } catch (err) {
            logger.error(
                `Error in click_action_item (${actionName}): ${err.stack || err.message}`
            );
            throw err;
        }
    }

    async click_on_connect() {
        const connectBtn = await $('~Connect');
        await connectBtn.click();

    }

    async clickFormLinking(categoryName) {
        const category = await $(`~${categoryName}`);
        await category.waitForDisplayed({ timeout: 5000 });
        await category.click();
        logger.info(`${categoryName} clicked successfully`);
    }

    async click_on_back() {
        const back = await $('//android.widget.TextView[@text="Back"]');
        await back.waitForDisplayed({ timeout: 5000 });
        await back.click();
    }

    async click_on_unlink() {
        const unlink = await $('//android.widget.TextView[@text=""]');
        await unlink.click();
    }



    async link_and_view_entries(form_name) {
        try {
            await this.click_on_new();
            await browser.pause(5000);
            await this.click_on_form(form_name);
            await browser.pause(5000);
            await this.click_on_formOptions("View Form Data");
            await browser.pause(5000);
            await this.gotofilters_and_select_dateRange('Last 30 Days');
            await browser.pause(2000);
            await this.view_form_and_create_from();
            await this.click_on_actions();
            await this.click_action_item('Link');
            await browser.pause(2000);
            await this.clickFormLinking('Airfield');
            await this.click_on_connect();
            await this.click_on_back();
            await this.click_on_actions();
            await this.click_action_item('View Linked Entries');
            await browser.pause(1000);
            await this.click_on_unlink();
            await browser.pause(1000);



            logger.info(`Completed link and view entries of form: ${form_name}`);
        } catch (err) {
            logger.error(`Error in link and view entries of form: ${err.stack || err.message}`);
            throw err;
        }
    }



}
export default new link_and_view();
