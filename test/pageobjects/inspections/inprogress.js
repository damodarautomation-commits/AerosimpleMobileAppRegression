import BasePage from '../../fixtures/base-page.js';
import { logger } from '../../utils/executionLogger.js';
import common from '../../utils/common.js';

class Inprogress extends BasePage {

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

    async click_on_shift(shift_name) {
        try {
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

    async selectDateByLabel(label, year, day) {
        try {
            const field = await $(`(//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup)[1]`);
            await this.clickWhenVisible(field);

            const yearHeader = await $('//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]');
            await this.clickWhenVisible(yearHeader);

            const yearOption = await $(`//android.widget.TextView[@resource-id="android:id/text1" and @text="${year}"]`);
            await yearOption.waitForDisplayed({ timeout: 10000 });
            await yearOption.click();

            const dayElement = await $(`//android.view.View[starts-with(@content-desc,"${day} ")]`);
            await dayElement.waitForDisplayed({ timeout: 10000 });
            await dayElement.click();

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await this.clickWhenVisible(okButton);

            logger.info(`Successfully selected date -> ${day}-${year}`);

        } catch (err) {
            logger.error(`Error in selectDateByLabel: ${err.stack || err.message}`);
            throw err;
        }
    }

    async select_time_by_label(label, hour, minute, meridian) {
        try {
            logger.info(`Attempting to select time for label: ${label}`);

            const field = await $(`(//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup)[2]`);
            await this.clickWhenVisible(field);

            const hourPicker = await $('(//android.widget.NumberPicker)[1]//android.widget.EditText');
            await hourPicker.click();
            await hourPicker.clearValue();
            await hourPicker.addValue(hour);

            const minutePicker = await $('(//android.widget.NumberPicker)[2]//android.widget.EditText');
            await minutePicker.click();
            await minutePicker.clearValue();
            await minutePicker.addValue(minute);

            const meridianPicker = await $('(//android.widget.NumberPicker)[3]//android.widget.EditText');
            await meridianPicker.click();
            await meridianPicker.clearValue();
            await meridianPicker.addValue(meridian);

            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await this.clickWhenVisible(okButton);

            logger.info(`Successfully selected ${label}:${hour}-${minute}-${meridian}`);
        } catch (err) {
            logger.error(`Error in select_time_by_label: ${err.stack || err.message}`);
            throw err;
        }
    }

    async click_on_start_inspection() {
        try {
            const button_text = await $("//android.widget.TextView[@resource-id='fab-text']").getText();
            logger.info(`Button text found: ${button_text}`);
            expect(button_text).toEqual("Start Inspection");

            const startBtn = await $("//android.widget.Button[@resource-id='fab']");
            await startBtn.waitForDisplayed({ timeout: 500 });
            await startBtn.click();

            logger.info('Successfully clicked Start Inspection button');
        } catch (err) {
            logger.error(`Failed in click_on_start_inspection: ${err.message}`);
            throw err;
        }
    }

    async selectChecklists(checklistitem) {
        const checklist = await common.waitUntilDisplayed(`//android.widget.TextView[contains(normalize-space(@text),"${checklistitem}")]/..`);
        await checklist.click();
        logger.info(`selected checklist : ${checklistitem}`);
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

    async clickOnContinueInspection() {
        const continueinsp = await common.waitUntilDisplayed('//android.widget.Button[@content-desc="Continue Inspection"]');
        await continueinsp.click();
        logger.info('clicked on Continue Inspection button')

    }

    async clickOnEditInspection() {
        const edit = await common.waitUntilDisplayed('//android.widget.Button[@content-desc="Edit Inspection"]');
        await edit.click();
        logger.info('Clicked on Edit Inspection button')
    }

    async clickOnUpdateInspection() {
        const update = await common.waitUntilDisplayed('//android.widget.Button[@content-desc="Update Inspection"]');
        await update.click();
        logger.info('Clicked on Update Inspection');
    }

    async clickOnUpdate() {
        const updateBtn = await common.waitUntilDisplayed('//android.widget.Button[@content-desc="Update"]');
        await updateBtn.click();
        logger.info('Clicked on Update button');
    }

    async InprogressInspection() {
        await this.openCreateNewInspection('Create New Inspection');
        await this.click_on_inspection('Aerosimple Inspection - In-Progress');
        await browser.pause(5000);
        await this.click_on_shift('Day');
        await browser.pause(5000);
        await this.selectDateByLabel('Report Date & Time', '2026', 18);
        await this.select_time_by_label('Report Date & Time', '9', '38', 'AM');
        await this.selectChecklists('Inspection Field 1');
        await this.selectChecklists('Inspection Field 3');
        await this.click_on_start_inspection();
        await browser.pause(5000);
        await this.click_on_complete_inspection();
        await browser.pause(5000);
        await this.selectDateByLabel('Start Date & Time', '2026', '18');
        await this.select_time_by_label("Start Date & Time", "9", "38", "AM");
        await this.selectDateByLabel('End Date & Time', '2026', '18');
        await this.select_time_by_label("End Date & Time", "10", "30", "AM");
        await browser.pause(2000);
        await this.click_on_complete_inspection();
        await browser.pause(6000);
        await this.clickOnContinueInspection();
        await browser.pause(5000);
        await this.swipeUp();
        await browser.pause(5000);
        await this.selectChecklists('Inspection Field 2');
        await this.selectChecklists('Inspection Field 4');
        await browser.pause(5000);
        await this.clickOnEditInspection();
        await browser.pause(5000);
        await this.clickOnUpdateInspection();
        await browser.pause(5000);
        await this.selectDateByLabel('Start Date & Time', '2026', '18');
        await this.select_time_by_label("Start Date & Time", "9", "38", "AM");
        await this.selectDateByLabel('End Date & Time', '2026', '18');
        await this.select_time_by_label("End Date & Time", "10", "30", "AM");
        await this.clickOnUpdate();
        await browser.pause(10000);


    }

}
export default new Inprogress();